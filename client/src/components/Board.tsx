import { Typography } from "@mui/material";
import { useUser } from "../context/UserProvider";
import Square from "./Square";

type BoardTypes = {
  numbers: Array<"X" | "O" | null>;
};

const Board = ({ numbers }: BoardTypes) => {
  const { state } = useUser();
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
