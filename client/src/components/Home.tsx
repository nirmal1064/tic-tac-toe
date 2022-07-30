import { customAlphabet } from "nanoid/async";
import { useState } from "react";
import { useUser } from "../context/UserProvider";
import { ActionType } from "../reducers/userReducer";
import GridItemButton from "./GridItemButton";
import GridTextField from "./GridTextField";

const Home = () => {
  const [_userId, setUserId] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const { dispatch } = useUser();
  const createUser = async () => {
    const nanoid = customAlphabet("0123456789abcdefghijklmnopqrstuvwxyz", 10);
    const id = await nanoid();
    setUserId(id);
    dispatch({
      type: ActionType.UpdateUser,
      payload: { userId: id, userName }
    });
  };

  return (
    <>
      <GridTextField
        value={userName}
        label="Enter Your Name"
        onChange={(e) => setUserName(e.target.value)}
      />
      <GridItemButton onClick={createUser} value="Enter" />
    </>
  );
};

export default Home;
