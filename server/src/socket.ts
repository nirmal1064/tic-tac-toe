import {
  ERR_MSG,
  JOIN,
  JoinRoomSuccessType,
  JoinRoomType,
  JOIN_ROOM_SUCCESS,
  MADE_MOVE,
  MakeMoveType,
  MAKE_MOVE,
  MAX_USERS_PER_ROOM,
  RoomType,
  START_GAME
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

const startGame = async (room: RoomType, currentIo: Server) => {
  const { users } = room;
  users.forEach((user) => {
    if (user.symbol === "X") {
      room.currentUser = user.userId;
    }
  });
  currentIo.emit(START_GAME, room);
};

const handleMakeMove = (data: MakeMoveType) => {
  const { userId, idx, roomId } = data;
  const room = rooms.get(roomId);
  if (!room) return;
  const { users, board, currentUser } = room;
  if (currentUser !== userId) return;
  if (board[idx] !== null) return;
  board[idx] = data.symbol;
  users.forEach((user) => {
    if (user.symbol !== data.symbol) {
      room.currentUser = user.userId;
    }
  });
  io.to(roomId).emit(MADE_MOVE, room);
};

io.on("connection", (socket) => {
  console.log(`User connected with id ${socket.id}`);

  socket.on(JOIN, async (data: JoinRoomType) => {
    socket.rooms.forEach((socketRoom) => {
      socket.leave(socketRoom);
    });
    const { roomId } = data;
    let room = rooms.get(roomId);
    let symbol: "X" | "O";
    if (!room) {
      symbol = "X";
      room = {
        roomId,
        users: [{ userId: data.userId, symbol }],
        currentUser: null,
        winner: null,
        board: Array(9).fill(null)
      };
      rooms.set(roomId, room);
    } else {
      if (room.users.length >= MAX_USERS_PER_ROOM) {
        socket.emit(ERR_MSG, "Room is full");
        return;
      }
      symbol = "O";
      room.users.push({ userId: data.userId, symbol });
    }
    socket.join(roomId);
    const result: JoinRoomSuccessType = {
      roomId,
      joined: true,
      symbol
    };
    socket.emit(JOIN_ROOM_SUCCESS, result);
    if (room.users.length === MAX_USERS_PER_ROOM) {
      startGame(room, io);
    }
  });

  socket.on(MAKE_MOVE, handleMakeMove);
});

export default httpServer;
