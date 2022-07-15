import express from "express"
import { addTask, getTask, getTaskByUser, updateTask } from "../controller/taskController.js"
import {isAuthenticatedUser} from "../middleware/auth.js"

const taskRouter = express.Router()

taskRouter.route("/add").post(isAuthenticatedUser,addTask)
taskRouter.route("/getall").get(isAuthenticatedUser,getTask)
taskRouter.route("/update").put(isAuthenticatedUser,updateTask)
taskRouter.route("/gettaskbyuser/:id").get(isAuthenticatedUser,getTaskByUser)

export default taskRouter;