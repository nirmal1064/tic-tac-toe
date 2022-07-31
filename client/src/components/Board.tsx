import { ThumbDown, ThumbUp } from "@mui/icons-material";
import { Grid, Typography } from "@mui/material";
import {
  GameOverType,
  GAME_OVER,
  MADE_MOVE,
  REMATCH,
  RematchResponseType,
  RematchType,
  REMATCH_FAILURE,
  REMATCH_REQUEST,
  REMATCH_RESPONSE,
  REMATCH_SUCCESS,
  RoomType,
  START_GAME
} from "@tic-tac-toe/utils";
import { useEffect, useState } from "react";
import { useBoard } from "../context/BoardProvider";
import { useSocket } from "../context/SocketProvider";
import { useUser } from "../context/UserProvider";
import { handlingStartGame } from "../helpers";
import { ActionType } from "../reducers/userReducer";
import GridItemButton from "./GridItemButton";
import Square from "./Square";

const Board = () => {
  const socket = useSocket();
  const { state, dispatch } = useUser();
  const { board, setBoard, bgColor } = useBoard();
  const { roomId, symbol, userId, turn, started, userName } = state;
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState(false);
  const [draw, setDraw] = useState(false);
  const [rematchRequest, setRematchRequest] = useState(false);
  const [rematchRequestSent, setRematchRequestSent] = useState(false);

  const handleMoveMade = (room: RoomType) => {
    if (room.currentUser === userId) {
      dispatch({ type: ActionType.UpdateTurn, payload: { turn: true } });
    } else {
      dispatch({ type: ActionType.UpdateTurn, payload: { turn: false } });
    }
    setBoard(room.board);
  };

  const handleGameOver = (data: GameOverType) => {
    setGameOver(true);
    if (data.winner === symbol) {
      setWinner(true);
    }
    if (data.draw) {
      setDraw(true);
    }
  };

  const handleRematchFailure = () => {
    dispatch({ type: ActionType.EndGame });
  };

  const handleRematchSuccess = (data: RoomType) => {
    setDraw(false);
    setGameOver(false);
    setWinner(false);
    setRematchRequest(false);
    setBoard(data.board);
    let payload: { symbol: "X" | "O"; turn: boolean };
    if (data.currentUser === userId) {
      payload = { symbol: "X", turn: true };
    } else {
      payload = { symbol: "O", turn: false };
    }
    dispatch({ type: ActionType.NewGame, payload });
  };

  const handleRematchRequest = () => {
    setRematchRequest(true);
  };

  const requestNewGame = () => {
    if (rematchRequestSent || rematchRequest) return;
    const rematch: RematchType = { roomId };
    socket?.emit(REMATCH, rematch);
    setRematchRequestSent(true);
  };

  const rematchSuccess = () => {
    const response: RematchResponseType = { roomId, rematch: true };
    socket?.emit(REMATCH_RESPONSE, response);
  };

  const rematchFailure = () => {
    const response: RematchResponseType = { roomId, rematch: false };
    socket?.emit(REMATCH_RESPONSE, response);
  };

  useEffect(() => {
    socket?.on(START_GAME, (room: RoomType) =>
      handlingStartGame(room, userId, dispatch)
    );
    socket?.on(MADE_MOVE, handleMoveMade);
    socket?.on(GAME_OVER, handleGameOver);
    socket?.on(REMATCH_REQUEST, handleRematchRequest);
    socket?.on(REMATCH_FAILURE, handleRematchFailure);
    socket?.on(REMATCH_SUCCESS, handleRematchSuccess);

    return () => {
      socket?.off(START_GAME, (room: RoomType) =>
        handlingStartGame(room, userId, dispatch)
      );
      socket?.off(MADE_MOVE, handleMoveMade);
      socket?.off(GAME_OVER, handleGameOver);
      socket?.on(REMATCH_REQUEST, handleRematchRequest);
      socket?.off(REMATCH_FAILURE, handleRematchFailure);
      socket?.off(REMATCH_SUCCESS, handleRematchSuccess);
    };
  }, [socket]);

  let message = "";
  if (started) {
    message = `Your symbol ${symbol}, `;
    if (turn) {
      message += "Your turn";
    } else {
      message += "Opponent's turn";
    }
  } else {
    message = "Waiting for opponent";
  }

  if (gameOver && draw) {
    message = "Game over, Draw";
  } else if (gameOver && winner) {
    message = "Game over, You Win";
  } else if (gameOver && !winner) {
    message = "Game over, You Lose";
  }

  let content;
  if (gameOver) {
    content = <GridItemButton onClick={requestNewGame} value="Rematch" />;
  }

  if (gameOver && rematchRequest) {
    content = (
      <>
        <Typography marginBottom={"10px"}>Opponent wants a rematch</Typography>
        <Grid item style={{ display: "flex", gap: "0.5rem" }}>
          <ThumbUp color="success" fontSize="large" onClick={rematchSuccess} />
          <ThumbDown color="error" fontSize="large" onClick={rematchFailure} />
        </Grid>
      </>
    );
  }

  return (
    <>
      <Typography marginBottom={"10px"}>Welcome {userName}</Typography>
      <Typography marginBottom={"10px"}>Room ID {roomId}</Typography>
      <Typography marginBottom={"10px"}>{message}</Typography>
      <div className="grid" style={{ marginBottom: "10px" }}>
        {board.map((number, idx) => (
          <Square key={idx} value={number} idx={idx} bgColor={bgColor} />
        ))}
      </div>
      {content}
    </>
  );
};

export default Board;
