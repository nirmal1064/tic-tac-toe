import {
  CREATE_ROOM,
  CREATE_ROOM_SUCCESS,
  ERR_MSG,
  JoinRoomSuccessType,
  JoinRoomType,
  JOIN_ROOM,
  JOIN_ROOM_SUCCESS,
  MAX_USERS_PER_ROOM,
  RoomType
} from "@tic-tac-toe/utils";
import { createServer } from "http";
import { Server } from "socket.io";
import app from "./app";

const rooms = new Map<string, RoomType>();

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

  socket.on(CREATE_ROOM, (data: JoinRoomType) => {
    console.log(`Create room request ${data}`);
    const { roomId } = data;
    const roomInfo: RoomType = {
      roomId,
      users: [data.userId]
    };
    rooms.set(roomId, roomInfo);
    console.log(rooms);
    socket.join(roomId);
    const result: JoinRoomSuccessType = { roomId, joined: true };
    socket.emit(CREATE_ROOM_SUCCESS, result);
  });

  socket.on(JOIN_ROOM, (data: JoinRoomType) => {
    console.log(`Join room request ${data}`);
    const { roomId } = data;
    const room = rooms.get(roomId);
    if (room) {
      if (room.users.length === MAX_USERS_PER_ROOM) {
        socket.emit(ERR_MSG, "Room is already Full");
      } else {
        room.users.push(data.userId);
        socket.join(roomId);
        const result: JoinRoomSuccessType = { roomId, joined: true };
        socket.emit(JOIN_ROOM_SUCCESS, result);
      }
    } else {
      socket.emit(ERR_MSG, "Room Does Not Exist");
    }
  });
});

export default httpServer;
