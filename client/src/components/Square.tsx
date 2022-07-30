import { MakeMoveType, MAKE_MOVE } from "@tic-tac-toe/utils";
import { FC } from "react";
import { useSocket } from "../context/SocketProvider";
import { useUser } from "../context/UserProvider";

type SquareTypes = {
  value: "X" | "O" | null;
  idx: number;
  bgColor: string;
};

const Square: FC<SquareTypes> = ({ value, idx, bgColor }: SquareTypes) => {
  const socket = useSocket();
  const { state } = useUser();
  const { roomId, symbol, userId } = state;

  const handleSquareClick = () => {
    const makeMove: MakeMoveType = {
      roomId,
      userId,
      idx,
      symbol: symbol === "X" ? "X" : "O"
    };
    socket?.emit(MAKE_MOVE, makeMove);
  };

  return (
    <button
      className="grid-item"
      style={{ backgroundColor: bgColor }}
      onClick={() => handleSquareClick()}>
      {value}
    </button>
  );
};

export default Square;
