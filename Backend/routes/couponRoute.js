import express from 'express'
import { applyCoupon, createCoupon, validateCoupon } from '../controllers/couponController.js'

const router = express.Router()

router.post('/create',createCoupon)
router.post('/update',validateCoupon)
router.post('/delete',applyCoupon)




export default router

