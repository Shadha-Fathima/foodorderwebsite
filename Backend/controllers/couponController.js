import { Coupon } from "../models/couponModel.js";
import { Order } from "../models/orderModel.js";

export const createCoupon = async (req, res) => {
    try {
        const { code, discountPercentage, maxDiscountAmount, expiryDate, usageLimit } = req.body;

        const newCoupon = new Coupon({ code, discountPercentage, maxDiscountAmount, expiryDate, usageLimit });
        await newCoupon.save();

        


        res.json({ success: true, message: 'Coupon created successfully', data: newCoupon });
    } catch (error) {
        console.log('Error creating coupon', error);
        res.status(500).json({ message: error.message || 'Internal server error' });
    }
};

export const validateCoupon = async (req, res) => {
    try {
        const { code } = req.body;

        const coupon = await Coupon.findOne({ code });

        if (!coupon) {
            return res.status(400).json({ success: false, message: 'Invalid coupon code' });
        }

        if (coupon.expiryDate < new Date()) {
            return res.status(400).json({ success: false, message: 'Coupon expired' });
        }

        if (coupon.usageLimit <= coupon.usedCount) {
            return res.status(400).json({ success: false, message: 'Coupon usage limit reached' });
        }

        res.json({ success: true, message: 'Coupon is valid', data: coupon });
    } catch (error) {
        console.log('Error validating coupon', error);
        res.status(500).json({ message: error.message || 'Internal server error' });
    }
};

export const applyCoupon = async (req, res) => {
    try {
        const { orderId, code } = req.body;

        const coupon = await Coupon.findOne({ code });

        if (!coupon) {
            return res.status(400).json({ success: false, message: 'Invalid coupon code' });
        }

        const currentDate = new Date();
        const expiryDate = new Date(coupon.expiryDate);

        
        if (currentDate < expiryDate) {
            return res.status(400).json({ success: false, message: 'Coupon expired' });
        }

        console.log('Expiry Date:', expiryDate);
        console.log('Current Date:', currentDate);



        if (coupon.expiryDate < new Date()) {
            return res.status(400).json({ success: false, message: 'Coupon expired' });
        }

        if (coupon.usageLimit <= coupon.usedCount) {
            return res.status(400).json({ success: false, message: 'Coupon usage limit reached' });
        }

        const order = await Order.findById(orderId);

        if (!order) {
            return res.status(400).json({ success: false, message: 'Order not found' });
        }

        const discount = (order.totalPrice * coupon.discountPercentage) / 100;
        const finalDiscount = Math.min(discount, coupon.maxDiscountAmount);

        order.totalPrice -= finalDiscount;
        await order.save();

        coupon.usedCount += 1;
        await coupon.save();

        res.json({ success: true, message: 'Coupon applied successfully', data: { order, finalDiscount } });
    } catch (error) {
        console.log('Error applying coupon', error);
        res.status(500).json({ message: error.message || 'Internal server error' });
    }
};
