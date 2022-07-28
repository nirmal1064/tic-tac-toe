import Square from "./Square";

type BoardTypes = {
  numbers: Array<string | null>;
};

const Board = ({ numbers }: BoardTypes) => {
  return (
    <div className="grid">
      {numbers.map((number, idx) => (
        <Square key={idx} value={number} idx={idx} />
      ))}
    </div>
  );
};

export default Board;
