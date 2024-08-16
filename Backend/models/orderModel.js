import mongoose from "mongoose";


const orderSchema = new mongoose.Schema({
    userId: { type: mongoose.Types.ObjectId, 
        ref:'User', required: true },
    restaurantId: { type: mongoose.Types.ObjectId, 
        ref: 'Restaurant', required: true },
    fooditems: {
        foodItemsId: { type: mongoose.Types.ObjectId, 
        ref: 'Food' },
        quantity: { type: Number, }
    },
    totalPrice: { type: Number, required: true },
    status: { type: String, enum: ['pending', 'confirmed', 'in progress', 'completed', 'canceled'], default: 'pending' },
    createdAt: { type: Date, default: Date.now },
    deliveryAddress: { type: String },
    paymentStatus: { type: String, enum: ['paid', 'unpaid'], default: 'unpaid' }
});

export const Order = mongoose.model('Order', orderSchema);
