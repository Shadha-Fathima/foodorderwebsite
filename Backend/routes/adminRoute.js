import express from 'express'
import { addRestaurant, 
         adminLogin, 
         adminLogout, 
         adminProfile, 
         adminSignup, 
         checkAdmin, 
         deleteRestaurant, 
         listOrders, 
         listRestaurants, 
         listUsers, 
         updateOrderStatus, 
         updateRestaurant, 
         updateUserRole } from '../controllers/adminController.js'

import { authAdmin } from '../middlewares/authAdmin.js'


const router = express.Router()

// admin routes
router.post('/login',  adminLogin)
router.get('/profile/:id',authAdmin, adminProfile)
router.post('/signup', adminSignup)
router.post('/logout',authAdmin,adminLogout)
router.get('/check-admin',authAdmin,checkAdmin)

// restaurant routes
router.get('/list-Restaurant',authAdmin,listRestaurants)
router.post('/add-restaurant',authAdmin,addRestaurant)
router.put('/update/:id',authAdmin,updateRestaurant)
router.delete('/delete/:id',authAdmin,deleteRestaurant)

// user routes
router.get('/list-users',authAdmin,listUsers)
router.put('/update/:id/role',authAdmin,updateUserRole)

// order routes
router.get('/list-orders',authAdmin,listOrders)
router.put('/update/:id/status',authAdmin,updateOrderStatus)

export default router