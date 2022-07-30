import { FC, useEffect } from "react";
import { useBoard } from "../context/BoardProvider";
import { useSocket } from "../context/SocketProvider";
import { useUser } from "../context/UserProvider";

type SquareTypes = {
  value: "X" | "O" | null;
  idx: number;
};

const Square: FC<SquareTypes> = ({ value, idx }: SquareTypes) => {
  const socket = useSocket();
  const { board, setBoard } = useBoard();
  const { state } = useUser();

  const handleSquareClick = () => {
    const newBoard = board.map((boardValue, index) => {
      if (idx === index && boardValue === null) {
        return state.symbol;
      }
      return boardValue;
    });
    setBoard(newBoard);
  };

  useEffect(() => {
    socket?.on("GET_RESPONSE", (msg) => {
      console.log(msg);
    });
    return () => {
      socket?.off("GET_RESPONSE");
    };
  }, [socket]);

  return (
    <button className="grid-item" onClick={() => handleSquareClick()}>
      {value}
    </button>
  );
};

export default Square;
