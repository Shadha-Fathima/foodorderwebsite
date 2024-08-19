import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
    userId: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
    orderId: { type: mongoose.Types.ObjectId, ref: 'Order', required: true },
    razorpayPaymentId: { type: String, required: true },
    razorpayOrderId: { type: String, required: true },
    amount: { type: Number, required: true },
    currency: { type: String, default: 'INR' },
    status: { type: String, enum: ['created', 'completed', 'failed'], default: 'created' },
    createdAt: { type: Date, default: Date.now },
});

export const Payment = mongoose.model('Payment', paymentSchema);
