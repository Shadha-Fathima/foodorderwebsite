import mongoose from 'mongoose';

const cartItemSchema = new mongoose.Schema({
    foodItemsId: { type: mongoose.Types.ObjectId,
    ref: 'Food', required: true },
    quantity: { type: Number, required: true, default: 1 },
});

const cartSchema = new mongoose.Schema({
    userId: { type: mongoose.Types.ObjectId, 
    ref: 'User', required: true },
    items: [cartItemSchema],
    totalPrice: { type: Number, default: 0 }, 
    createdAt: { type: Date, default: Date.now },
});

export const Cart = mongoose.model('Cart', cartSchema);
