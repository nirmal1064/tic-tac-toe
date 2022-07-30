import { Alert, Typography } from "@mui/material";
import {
  ALPHA_NUMERIC,
  ERR_MSG,
  JOIN,
  JoinRoomSuccessType,
  JOIN_ROOM_SUCCESS,
  RoomType,
  START_GAME
} from "@tic-tac-toe/utils";
import { customAlphabet } from "nanoid/async";
import { useEffect, useState } from "react";
import { useSocket } from "../context/SocketProvider";
import { useUser } from "../context/UserProvider";
import { handlingStartGame } from "../helpers";
import { ActionType } from "../reducers/userReducer";
import GridItemButton from "./GridItemButton";
import GridTextField from "./GridTextField";

const Room = () => {
  const { state, dispatch } = useUser();
  const { userId, userName } = state;
  const socket = useSocket();
  const [roomId, setRoomId] = useState<string>("");
  const [errMsg, setErrMsg] = useState<string>("");

  const createRoom = async () => {
    const nanoid = customAlphabet(ALPHA_NUMERIC, 6);
    const newRoomId = await nanoid();
    setRoomId(newRoomId);
    const obj = {
      roomId: newRoomId,
      userId
    };
    socket?.emit(JOIN, obj);
  };

  const joinRoom = () => {
    if (roomId === "") return;
    const obj = {
      roomId,
      userId
    };
    socket?.emit(JOIN, obj);
  };

  useEffect(() => {
    const dispatchJoinRoomSuccess = (result: JoinRoomSuccessType): void => {
      dispatch({
        type: ActionType.UpdateRoom,
        payload: {
          roomId: result.roomId,
          joined: true,
          symbol: result.symbol
        }
      });
    };

    const updateErrMsg = (msg: string): void => {
      setErrMsg(msg);
    };

    socket?.on(START_GAME, (room: RoomType) =>
      handlingStartGame(room, userId, dispatch)
    );
    socket?.on(JOIN_ROOM_SUCCESS, dispatchJoinRoomSuccess);
    socket?.on(ERR_MSG, updateErrMsg);

    return () => {
      socket?.off(START_GAME, (room: RoomType) =>
        handlingStartGame(room, userId, dispatch)
      );
      socket?.off(JOIN_ROOM_SUCCESS, dispatchJoinRoomSuccess);
      socket?.off(ERR_MSG, updateErrMsg);
    };
  }, [socket]);

  return (
    <>
      <Typography marginBottom={"10px"}>Welcome {userName}</Typography>
      <GridTextField
        value={roomId}
        label="Room ID"
        onChange={(e) => setRoomId(e.target.value)}
      />
      <GridItemButton onClick={joinRoom} value="Join The Room" />
      {errMsg !== "" && (
        <Alert
          onClose={() => {
            setErrMsg("");
          }}
          severity="error">
          {errMsg}
        </Alert>
      )}
      <Typography marginTop={"10px"} marginBottom={"10px"}>
        ---------------Or---------------
      </Typography>
      <GridItemButton onClick={createRoom} value="Create New Room" />
    </>
  );
};

export default Room;
