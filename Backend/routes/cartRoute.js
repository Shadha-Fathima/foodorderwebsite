import express from 'express'
import { addToCart, clearCart, removeFromCart, updateCartItem } from '../controllers/cartController.js'
import { authUser } from '../middlewares/authUser.js'


const router = express.Router()

router.post('/add',authUser , addToCart )
router.post('/remove', authUser,removeFromCart)
router.post('/update',authUser,updateCartItem)
router.post('/clear',authUser,clearCart)





export default router;