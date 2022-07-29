import { UserType } from "@tic-tac-toe/utils";

export enum ActionType {
  UpdateUser,
  UpdateRoom,
  UpdateSymbol
}

type UpdateUser = {
  type: ActionType.UpdateUser;
  payload: { userId: string; userName: string };
};

type UpdateRoom = {
  type: ActionType.UpdateRoom;
  payload: { roomId: string };
};

type UpdateSymbol = {
  type: ActionType.UpdateSymbol;
  payload: { symbol: string };
};

export type UserActionTypes = UpdateUser | UpdateRoom | UpdateSymbol;

const userReducer = (state: UserType, action: UserActionTypes): UserType => {
  switch (action.type) {
    case ActionType.UpdateUser:
      console.log("ActionType.UpdateUser");
      return {
        ...state,
        userId: action.payload.userId,
        userName: action.payload.userName
      };
    case ActionType.UpdateRoom:
      console.log("ActionType.UpdateRoom");
      return {
        ...state,
        roomId: action.payload.roomId
      };
    case ActionType.UpdateSymbol:
      console.log("ActionType.UpdateSymbol");
      return {
        ...state,
        symbol: action.payload.symbol === "X" ? "X" : "O"
      };
    default:
      return state;
  }
};

export default userReducer;
