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

const defaultValue = Array<string | null>(9).fill(null);

type SetBoardType = Dispatch<SetStateAction<Array<string | null>>>;

const defaultUpdate: SetBoardType = () => defaultValue;

type BoardContextType = {
  board: Array<string | null>;
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
