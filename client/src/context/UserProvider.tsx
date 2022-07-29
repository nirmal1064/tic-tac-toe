import { UserType, USER_DEFAULT_VALUE } from "@tic-tac-toe/utils";
import { createContext, useContext, useReducer } from "react";
import userReducer, { UserActionTypes } from "../reducers/userReducer";

type UserProviderType = {
  children: React.ReactNode;
};

type UserContextType = {
  state: UserType;
  dispatch: React.Dispatch<UserActionTypes>;
};

export const useUser = () => {
  return useContext(UserContext);
};

const UserContext = createContext<UserContextType>({
  state: USER_DEFAULT_VALUE,
  dispatch: () => null
});

const UserProvider = ({ children }: UserProviderType) => {
  const [state, dispatch] = useReducer(userReducer, USER_DEFAULT_VALUE);
  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
