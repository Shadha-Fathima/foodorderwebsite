import express from 'express'
import { createRestaurant, deleteRestaurant, getRestaurant, updateRestaurant } from '../controllers/restaurantController.js'
import { upload } from '../middlewares/uploadMiddleware.js'

const router = express.Router()


router.get('/restaurantList', getRestaurant)
router.post('/create', upload.single('image-restaurant'), createRestaurant)
router.put('/update/:id', updateRestaurant)
router.delete('/delete/:id', deleteRestaurant)






export default router