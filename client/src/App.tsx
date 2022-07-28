import { customAlphabet } from "nanoid/async";
import { FC, useState } from "react";
import "./App.css";
import Board from "./components/Board";
import { useBoard } from "./context/BoardProvider";

const App: FC = () => {
  const { board } = useBoard();
  const [joined, setJoined] = useState(false);
  const [roomId, setRoomId] = useState<string>("");

  const createRoom = async () => {
    const nanoid = customAlphabet("ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890", 6);
    const newRoomId = await nanoid();
    setRoomId(newRoomId);
  };

  return (
    <>
      <p>Enter Room Id To Join</p>
      <input
        type="text"
        value={roomId}
        onChange={(e) => setRoomId(e.target.value)}
      />
      <button type="submit">Join Room</button>
      <button type="submit" onClick={() => createRoom()}>
        Create Room
      </button>

      {joined && <Board numbers={board} />}
    </>
  );
};

export default App;
