import express from "express"

const userRouter = express.Router()
import {UserRegister,loginUser, test, logout, getUserDetails, getAllUser, UserImage, getUserProfile} from "../controller/userController.js"
import {isAuthenticatedUser} from "../middleware/auth.js"

userRouter.route('/register').post(UserRegister)
userRouter.route('/login').post(loginUser)
userRouter.route('/test').get(isAuthenticatedUser,test)
userRouter.route('/logout').get(isAuthenticatedUser,logout)
userRouter.route('/me').get(isAuthenticatedUser,getUserDetails)
userRouter.route('/getalluser').get(isAuthenticatedUser,getAllUser)
userRouter.route('/user-image').post(isAuthenticatedUser,UserImage)
userRouter.route('/get-image').get(isAuthenticatedUser,getUserProfile)

export default userRouter;