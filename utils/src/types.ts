export interface ServerToClientEvents {
  noArg: () => void;
  basicEmit: (a: number, b: string, c: Buffer) => void;
  withAck: (d: string, callback: (e: number) => void) => void;
}

export interface ClientToServerEvents {
  hello: () => void;
}

export interface InterServerEvents {
  ping: () => void;
}

export interface SocketData {
  name: string;
  age: number;
}

export type JoinRoomType = {
  roomId: string;
  userId: string;
};

export type JoinRoomSuccessType = {
  roomId: string;
  joined: boolean;
};

export type RoomType = {
  roomId: string;
  users: string[];
};

export type UserType = {
  userId: string;
  userName: string;
  roomId: string;
  symbol: "X" | "O" | null;
};
