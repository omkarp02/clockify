interface ServerToClientEvents {
  recieved: (userId) => void;
  connected: (user) => void;
  databaseDisconnected: () => void;
}

interface ClientToServerEvents {
  check: () => void;
  setup: (userId: any) => void;
  task: (userTask: any) => void;
  forceDisconnect: () => void;
}

interface SocketData {}

import { app } from "./app.js";
import dotenv from "dotenv";
import { Server, Socket } from "socket.io";
import { myPromise } from "./config/database.js";
import mongoose from "mongoose";

dotenv.config({ path: "src/config/.env" });

const server = app.listen(process.env.PORT, () => {
  console.log(`connected to port ${process.env.PORT}`);
});

//socket connection on server side
const io = new Server<ClientToServerEvents, ServerToClientEvents, SocketData>(
  server,
  {
    pingTimeout: 60000,
    cors: {
      origin: "http://localhost:4600",
    },
  }
);

//connecting to database
myPromise
  .then((data: typeof mongoose) => {
    let globalSocket: { [key: string]: Array<Socket> } = {};

    io.on("connection", (socket) => {
      socket.on("setup", (userId) => {
        if (globalSocket[userId]) {
          globalSocket[userId].push(socket);
        } else {
          globalSocket[userId] = [socket];
        }
      });

      data.connection.on("disconnected", () => {
        socket.emit("databaseDisconnected");
      });

      socket.on("task", (userTask) => {
        socket.broadcast.emit("recieved", userTask);
      });

      socket.on("disconnect", () => {
        console.log("hello i am disconnected");

        for (let key in globalSocket) {
          if (globalSocket[key]?.length === 0) {
            delete globalSocket[key];
          } else {
            let index = globalSocket[key].indexOf(socket);
            globalSocket[key].splice(index, 1);
          }
        }
      });
    });
  })
  .catch(() => {
    console.log("error occured");
    io.on("connection", (socket) => {
      socket.emit("databaseDisconnected");
    });
  });
