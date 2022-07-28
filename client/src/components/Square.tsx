import { FC, useEffect } from "react";
import { useBoard } from "../context/BoardProvider";
import { useSocket } from "../context/SocketProvider";

type SquareTypes = {
  value: string | null;
  idx: number;
};

const Square: FC<SquareTypes> = ({ value, idx }: SquareTypes) => {
  const socket = useSocket();
  const { board, setBoard } = useBoard();

  const handleSquareClick = () => {
    const newBoard = board.map((boardValue, index) => {
      if (idx === index && boardValue === null) {
        return "X";
      }
      return boardValue;
    });
    setBoard(newBoard);
  };

  useEffect(() => {
    if (socket == null) return;
    socket.on("GET_RESPONSE", (msg) => {
      console.log(msg);
    });
    return () => {
      socket.off("GET_RESPONSE");
    };
  }, [socket]);

  return (
    <button className="grid-item" onClick={() => handleSquareClick()}>
      {value}
    </button>
  );
};

export default Square;
