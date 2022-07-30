import { RoomType } from "@tic-tac-toe/utils";
import { Dispatch } from "react";
import { ActionType, UserActionTypes } from "../reducers/userReducer";

export const handlingStartGame = (
  room: RoomType,
  userId: string,
  dispatch: Dispatch<UserActionTypes>
) => {
  if (room.currentUser === userId) {
    dispatch({ type: ActionType.GameStartMyTurn });
  } else {
    dispatch({ type: ActionType.GameStart });
  }
};
