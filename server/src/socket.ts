import { createServer } from "http";
import { Server } from "socket.io";
import app from "./app";

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*"
  }
});

io.on("connection", (socket) => {
  console.log(`User connected with id ${socket.id}`);

  socket.on("disconnect", () => {
    console.log(`User disconnected with id ${socket.id}`);
  });
  socket.on("USER_JOINED", (data) => {
    console.log("USER_JOINED", data);
  });
  socket.on("SEND_VALUE", (data) => {
    console.log("SEND_VALUE", data);
    socket.emit("GET_RESPONSE", "Good");
  });
});

export default httpServer;
