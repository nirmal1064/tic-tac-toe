import { Typography } from "@mui/material";
import { useUser } from "../context/UserProvider";
import Square from "./Square";

type BoardTypes = {
  numbers: Array<string | null>;
};

const Board = ({ numbers }: BoardTypes) => {
  const { state } = useUser();
  console.log(state);
  return (
    <>
      <Typography marginBottom={"10px"}>Room ID {state.roomId}</Typography>
      <div className="grid">
        {numbers.map((number, idx) => (
          <Square key={idx} value={number} idx={idx} />
        ))}
      </div>
    </>
  );
};

export default Board;
