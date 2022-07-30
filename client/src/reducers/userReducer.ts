import { UserType } from "@tic-tac-toe/utils";

export enum ActionType {
  UpdateUser,
  UpdateRoom,
  GameStartMyTurn,
  GameStart,
  UpdateTurn,
  UpdateSymbol
}

type UpdateUser = {
  type: ActionType.UpdateUser;
  payload: { userId: string; userName: string };
};

type UpdateRoom = {
  type: ActionType.UpdateRoom;
  payload: { roomId: string; joined: boolean; symbol: "X" | "O" };
};

type UpdateSymbol = {
  type: ActionType.UpdateSymbol;
  payload: { symbol: "X" | "O" };
};

type GameStart = {
  type: ActionType.GameStart;
};

type GameStartMyTurn = {
  type: ActionType.GameStartMyTurn;
};

type UpdateTurn = {
  type: ActionType.UpdateTurn;
  payload: { turn: boolean };
};

export type UserActionTypes =
  | UpdateUser
  | UpdateRoom
  | UpdateSymbol
  | GameStart
  | GameStartMyTurn
  | UpdateTurn;

const userReducer = (state: UserType, action: UserActionTypes): UserType => {
  switch (action.type) {
    case ActionType.UpdateUser:
      return {
        ...state,
        userId: action.payload.userId,
        userName: action.payload.userName
      };
    case ActionType.UpdateRoom:
      return {
        ...state,
        roomId: action.payload.roomId,
        joined: action.payload.joined,
        symbol: action.payload.symbol
      };
    case ActionType.UpdateSymbol:
      return {
        ...state,
        symbol: action.payload.symbol
      };
    case ActionType.GameStart:
      return {
        ...state,
        started: true
      };
    case ActionType.GameStartMyTurn:
      return {
        ...state,
        started: true,
        turn: true
      };
    case ActionType.UpdateTurn:
      return {
        ...state,
        turn: action.payload.turn
      };
    default:
      return state;
  }
};

export default userReducer;
