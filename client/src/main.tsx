import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import BoardProvider from "./context/BoardProvider";
import SocketProvider from "./context/SocketProvider";
import UserProvider from "./context/UserProvider";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <BrowserRouter>
      <UserProvider>
        <SocketProvider>
          <BoardProvider>
            <App />
          </BoardProvider>
        </SocketProvider>
      </UserProvider>
    </BrowserRouter>
  </StrictMode>
);
