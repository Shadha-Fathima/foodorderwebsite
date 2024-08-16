import express from 'express';
import { createOrder, deleteOrder, getOrderById, getOrderList, getUserOrders, updateOrderStatus } from '../controllers/orderController.js';
import { authUser } from '../middlewares/authUser.js';

const router = express.Router();


router.get('/orderList',getOrderList)
router.post('/create',createOrder)
router.get('/order/:Id',authUser,getOrderById )
router.get('/user/:userId',authUser,getUserOrders)
router.put('/update/:orderId',authUser,updateOrderStatus)
router.delete('/delete/:orderId',authUser,deleteOrder)



export default router;