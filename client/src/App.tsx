import { Grid, Typography } from "@mui/material";
import { FC } from "react";
import "./App.css";
import Board from "./components/Board";
import Home from "./components/Home";
import Room from "./components/Room";
import { useBoard } from "./context/BoardProvider";
import { useUser } from "./context/UserProvider";

const App: FC = () => {
  const { board } = useBoard();
  const { state } = useUser();
  const { userId, roomId, joined } = state;

  let content;
  if (userId === "" && !joined) {
    content = <Home />;
  } else if (userId !== "" && !joined) {
    content = <Room />;
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
