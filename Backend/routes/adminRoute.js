import express from 'express'
import { adminLogin, adminProfile } from '../controllers/adminController.js'


const router = express.Router()


router.post('/login',adminLogin)
router.get('/profile/:id', adminProfile)




export default router