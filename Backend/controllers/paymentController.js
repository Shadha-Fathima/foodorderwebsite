import Razorpay from 'razorpay';
import { Payment } from '../models/paymentModel.js';
import crypto from 'crypto';

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export const createOrder = async (req, res) => {
    try {
        const { amount, currency, userId, orderId } = req.body;

        // Create a Razorpay order
        const options = {
            amount: amount * 100,
            currency,
            receipt: `order_${orderId}`,
        };

        const order = await razorpay.orders.create(options);

        // Save payment details in the database
        const payment = new Payment({
            userId,
            orderId,
            razorpayOrderId: order.id,
            amount,
            currency,
            status: 'created',
        });

        await payment.save();

        res.json({
            success: true,
            orderId: order.id,
            amount: order.amount,
            currency: order.currency,
        });
    } catch (error) {
        res.status(500).json({ message: error.message || 'Internal server error' });
    }
};

export const verifyPayment = async (req, res) => {
    try {
        const { razorpayOrderId, razorpayPaymentId, razorpaySignature } = req.body;

        // Find the payment in the database
        const payment = await Payment.findOne({ razorpayOrderId });

        if (!payment) {
            return res.status(404).json({ success: false, message: 'Payment not found' });
        }

        // Verify the signature
        const hmac = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET);
        hmac.update(`${razorpayOrderId}|${razorpayPaymentId}`);
        const generatedSignature = hmac.digest('hex');

        if (generatedSignature !== razorpaySignature) {
            payment.status = 'failed';
            await payment.save();
            return res.status(400).json({ success: false, message: 'Payment verification failed' });
        }

        // Update payment status to completed
        payment.razorpayPaymentId = razorpayPaymentId;
        payment.status = 'completed';
        await payment.save();

        res.json({ success: true, message: 'Payment verified successfully', payment });
    } catch (error) {
        res.status(500).json({ message: error.message || 'Internal server error' });
    }
};
