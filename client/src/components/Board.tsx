import { Typography } from "@mui/material";
import { MADE_MOVE, RoomType, START_GAME } from "@tic-tac-toe/utils";
import { useEffect } from "react";
import { useBoard } from "../context/BoardProvider";
import { useSocket } from "../context/SocketProvider";
import { useUser } from "../context/UserProvider";
import { handlingStartGame } from "../helpers";
import { ActionType } from "../reducers/userReducer";
import Square from "./Square";

const Board = () => {
  const socket = useSocket();
  const { state, dispatch } = useUser();
  const { board, setBoard, bgColor } = useBoard();
  const { roomId, symbol, userId, turn, started } = state;

  const handleMoveMade = (room: RoomType) => {
    if (room.currentUser === userId) {
      dispatch({ type: ActionType.UpdateTurn, payload: { turn: true } });
    } else {
      dispatch({ type: ActionType.UpdateTurn, payload: { turn: false } });
    }
    setBoard(room.board);
  };

  useEffect(() => {
    socket?.on(START_GAME, (room: RoomType) =>
      handlingStartGame(room, userId, dispatch)
    );
    socket?.on(MADE_MOVE, handleMoveMade);

    return () => {
      socket?.off(START_GAME, (room: RoomType) =>
        handlingStartGame(room, userId, dispatch)
      );
      socket?.off(MADE_MOVE, handleMoveMade);
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

  return (
    <>
      <Typography marginBottom={"10px"}>Room ID {roomId}</Typography>
      <Typography marginBottom={"10px"}>{message}</Typography>
      <Typography marginBottom={"10px"}></Typography>
      <div className="grid">
        {board.map((number, idx) => (
          <Square key={idx} value={number} idx={idx} bgColor={bgColor} />
        ))}
      </div>
    </>
  );
};

export default Board;
