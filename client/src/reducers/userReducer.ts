import { UserType } from "@tic-tac-toe/utils";

export enum ActionType {
  UpdateUser,
  UpdateRoom,
  GameStartMyTurn,
  GameStart,
  UpdateTurn,
  UpdateSymbol,
  NewGame,
  EndGame
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

type NewGame = {
  type: ActionType.NewGame;
  payload: { symbol: "X" | "O"; turn: boolean };
};

type EndGame = {
  type: ActionType.EndGame;
};

export type UserActionTypes =
  | UpdateUser
  | UpdateRoom
  | UpdateSymbol
  | GameStart
  | GameStartMyTurn
  | UpdateTurn
  | NewGame
  | EndGame;

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
    case ActionType.NewGame:
      return {
        ...state,
        joined: true,
        started: true,
        symbol: action.payload.symbol,
        turn: action.payload.turn
      };
    case ActionType.EndGame:
      return {
        ...state,
        joined: false,
        started: false,
        symbol: null,
        turn: false,
        roomId: ""
      };
    default:
      return state;
  }
};

export default userReducer;
