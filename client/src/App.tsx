import { Alert, Grid, Typography } from "@mui/material";
import {
  CREATE_ROOM,
  CREATE_ROOM_SUCCESS,
  ERR_MSG,
  JoinRoomSuccessType,
  JOIN_ROOM,
  JOIN_ROOM_SUCCESS
} from "@tic-tac-toe/utils";
import { customAlphabet } from "nanoid/async";
import { FC, useEffect, useState } from "react";
import "./App.css";
import Board from "./components/Board";
import GridItemButton from "./components/GridItemButton";
import GridTextField from "./components/GridTextField";
import { useBoard } from "./context/BoardProvider";
import { useSocket } from "./context/SocketProvider";
import { useUser } from "./context/UserProvider";
import { ActionType } from "./reducers/userReducer";

const App: FC = () => {
  const { board } = useBoard();
  const socket = useSocket();
  const { state, dispatch } = useUser();
  const [joined, setJoined] = useState(false);
  const [roomId, setRoomId] = useState<string>("");
  const [userId, setUserId] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [errMsg, setErrMsg] = useState<string>("");

  console.log(`state: ${JSON.stringify(state)}`);
  const createUser = async () => {
    const nanoid = customAlphabet("0123456789abcdefghijklmnopqrstuvwxyz", 10);
    const id = await nanoid();
    setUserId(id);
    dispatch({
      type: ActionType.UpdateUser,
      payload: { userId: id, userName }
    });
  };

  const createRoom = async () => {
    const nanoid = customAlphabet("ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890", 6);
    const newRoomId = await nanoid();
    setRoomId(newRoomId);
    const obj = {
      roomId: newRoomId,
      userId
    };
    socket?.emit(CREATE_ROOM, obj);
  };

  const joinRoom = () => {
    if (roomId === "") return;
    const obj = {
      roomId,
      userId
    };
    socket?.emit(JOIN_ROOM, obj);
  };

  useEffect(() => {
    socket?.on(CREATE_ROOM_SUCCESS, (result: JoinRoomSuccessType) => {
      setJoined(result.joined);
      console.log(`dispatching CREATE_ROOM_SUCCESS: ${result.roomId}`);
      dispatch({
        type: ActionType.UpdateRoom,
        payload: { roomId: result.roomId }
      });
    });

    socket?.on(JOIN_ROOM_SUCCESS, (result: JoinRoomSuccessType) => {
      setJoined(result.joined);
      console.log(`dispatching JOIN_ROOM_SUCCESS ${result.roomId}`);
      dispatch({
        type: ActionType.UpdateRoom,
        payload: { roomId: result.roomId }
      });
    });

    socket?.on(ERR_MSG, (msg: string) => {
      setErrMsg(msg);
    });

    return () => {
      socket?.off(CREATE_ROOM_SUCCESS);
      socket?.off(JOIN_ROOM_SUCCESS);
      socket?.off(ERR_MSG);
    };
  }, [socket]);

  let content;
  if (userId === "" && !joined) {
    content = (
      <>
        <GridTextField
          value={userName}
          label="Enter Your Name"
          onChange={(e) => setUserName(e.target.value)}
        />
        <GridItemButton onClick={createUser} value="Enter" />
      </>
    );
  } else if (userId !== "" && !joined) {
    content = (
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
  } else if (joined) {
    content = (
      <>
        <Grid item>
          <Typography marginBottom={"10px"}>Room ID {roomId}</Typography>
        </Grid>
        <Grid item>
          <Board numbers={board} />;
        </Grid>
      </>
    );
  }

  return (
    <Grid
      container
      direction={"column"}
      spacing={0}
      alignItems={"center"}
      justifyContent={"center"}>
      {content}
    </Grid>
  );
};

export default App;
