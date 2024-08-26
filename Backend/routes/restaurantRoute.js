import express from 'express'
import { createRestaurant, deleteRestaurant, getRestaurant, updateRestaurant } from '../controllers/restaurantController.js'
import { upload } from '../middlewares/uploadMiddleware.js'
import { authAdmin } from '../middlewares/authAdmin.js'
import { authUser } from '../middlewares/authUser.js'

const router = express.Router()


router.get('/restaurantList', authUser, getRestaurant)
router.post('/create', authAdmin, upload.single('image-restaurant'), createRestaurant)
router.put('/update/:id', authAdmin,updateRestaurant)
router.delete('/delete/:id', authAdmin,deleteRestaurant)






export default router