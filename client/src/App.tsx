import { Grid } from "@mui/material";
import { FC } from "react";
import "./App.css";
import Board from "./components/Board";
import Home from "./components/Home";
import Room from "./components/Room";
import { useUser } from "./context/UserProvider";

const App: FC = () => {
  const { state } = useUser();
  const { userId, joined } = state;

  let content;
  if (userId === "" && !joined) {
    content = <Home />;
  } else if (userId !== "" && !joined) {
    content = <Room />;
  } else if (joined) {
    content = <Board />;
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
