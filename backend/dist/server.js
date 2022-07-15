import { app } from "./app.js";
import dotenv from "dotenv";
import { Server } from "socket.io";
import { myPromise } from "./config/database.js";
dotenv.config({ path: "src/config/.env" });
const server = app.listen(process.env.PORT, () => {
    console.log(`connected to port ${process.env.PORT}`);
});
const io = new Server(server, {
    pingTimeout: 60000,
    cors: {
        origin: "http://localhost:4600",
    },
});
myPromise
    .then((data) => {
    let globalSocket = {};
    io.on("connection", (socket) => {
        socket.on("setup", (userId) => {
            if (globalSocket[userId]) {
                globalSocket[userId].push(socket);
            }
            else {
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
            var _a;
            console.log("hello i am disconnected");
            for (let key in globalSocket) {
                if (((_a = globalSocket[key]) === null || _a === void 0 ? void 0 : _a.length) === 0) {
                    delete globalSocket[key];
                }
                else {
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
