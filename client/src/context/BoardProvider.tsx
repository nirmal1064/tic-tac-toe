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
const defaultBgColor = "";

type SetBoardType = Dispatch<SetStateAction<Array<"X" | "O" | null>>>;

const defaultUpdate: SetBoardType = () => defaultValue;

type SetBgColorType = Dispatch<SetStateAction<string>>;
const defaultColorUpdate: SetBgColorType = () => defaultBgColor;

type BoardContextType = {
  board: Array<"X" | "O" | null>;
  setBoard: SetBoardType;
  bgColor: string;
  setBgColor: SetBgColorType;
};

const BoardContext = createContext<BoardContextType>({
  board: defaultValue,
  setBoard: defaultUpdate,
  bgColor: defaultBgColor,
  setBgColor: defaultColorUpdate
});

export const useBoard = () => {
  return useContext(BoardContext);
};

const BoardProvider = ({ children }: BoardProviderType) => {
  const [board, setBoard] = useState(defaultValue);
  const [bgColor, setBgColor] = useState(defaultBgColor);

  return (
    <BoardContext.Provider value={{ board, setBoard, bgColor, setBgColor }}>
      {children}
    </BoardContext.Provider>
  );
};

export default BoardProvider;
