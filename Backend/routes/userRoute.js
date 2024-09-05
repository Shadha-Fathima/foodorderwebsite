import express from "express";
import { checkUser, createUser, userLogin, userLogout, userProfile, userSignup } from "../controllers/userController.js";
import { authUser } from "../middlewares/authUser.js";


const router = express.Router()

router.post('/register', createUser)
router.post('/login',userLogin) 
router.get('/profile',authUser, userProfile)
router.get('/check-user',authUser,checkUser)
router.post('/signup',authUser,userSignup)
router.post('/logout',authUser,userLogout)

export default router
