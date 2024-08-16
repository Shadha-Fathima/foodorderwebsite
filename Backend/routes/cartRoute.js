import express from 'express'
import { addToCart, clearCart, removeFromCart, updateCartItem } from '../controllers/cartController.js'


const router = express.Router()

router.post('/add', addToCart )
router.post('/remove', removeFromCart)
router.post('/update',updateCartItem)
router.post('/clear',clearCart)





export default router;