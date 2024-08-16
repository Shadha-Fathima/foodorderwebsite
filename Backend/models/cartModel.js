import mongoose from 'mongoose';



const cartSchema = new mongoose.Schema({
    userId: { type: mongoose.Types.ObjectId, 
    ref: 'User', required: true },
    items: [
        {
        foodItemsId: { type: mongoose.Types.ObjectId,
        ref: 'Food', required: true },
        quantity: { type: Number, required: true, default: 1 },
    }
],
    totalPrice: { type: Number, default: 0 }, 
    createdAt: { type: Date, default: Date.now },
});

export const Cart = mongoose.model('Cart', cartSchema);
