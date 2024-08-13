import express from 'express'
import { createRestaurant, deleteRestaurant, getRestaurant, updateRestaurant } from '../controllers/restaurantController.js'

const router = express.Router()


router.get('/restaurantList', getRestaurant)
router.post('/create', createRestaurant)
router.put('/update/:id', updateRestaurant)
router.delete('/delete/:id', deleteRestaurant)






export default router