import express from "express";
import { checkUser, createUser, userLogin, userProfile } from "../controllers/userController.js";
import { authUser } from "../middlewares/authUser.js";


const router = express.Router()

router.post('/register', createUser)
router.post('/login', userLogin) 
router.get('/profile/:id',authUser, userProfile)
router.get('/check-user',authUser,checkUser)

export default router
