import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState
} from "react";

type BoardProviderType = {
  children: React.ReactNode;
};

const defaultValue = Array<"X" | "O" | null>(9).fill(null);

type SetBoardType = Dispatch<SetStateAction<Array<"X" | "O" | null>>>;

const defaultUpdate: SetBoardType = () => defaultValue;

type BoardContextType = {
  board: Array<"X" | "O" | null>;
  setBoard: SetBoardType;
};

const BoardContext = createContext<BoardContextType>({
  board: defaultValue,
  setBoard: defaultUpdate
});

export const useBoard = () => {
  return useContext(BoardContext);
};

const BoardProvider = ({ children }: BoardProviderType) => {
  const [board, setBoard] = useState(defaultValue);

  return (
    <BoardContext.Provider value={{ board, setBoard }}>
      {children}
    </BoardContext.Provider>
  );
};

export default BoardProvider;
