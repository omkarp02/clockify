import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import session from "express-session";
dotenv.config({ path: "src/config/.env" });
import { error } from "./middleware/error.js";
const app = express();
app.use(session({
    secret: "secret-key",
    resave: "false",
    saveUninitialized: false,
}));
app.use(express.json());
app.use(cookieParser());
import userRouter from "./routes/userRoutes.js";
import taskRouter from "./routes/taskRoutes.js";
app.use("/api/user", userRouter);
app.use("/api/task", taskRouter);
app.use(error);
export { app };
