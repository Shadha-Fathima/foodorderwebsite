import express from 'express'
import { addFood, deleteFood, getFood, updateFood } from '../controllers/foodController.js'

const router = express.Router()



router.get('/foodList', getFood )
router.post('/add', addFood )
router.put('/update/:id', updateFood )
router.delete('/delete/:id',deleteFood)

export default router;