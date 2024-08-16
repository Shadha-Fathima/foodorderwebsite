import { Cart } from '../models/cartModel.js';
import { Food } from '../models/foodModel.js'; 

export const addToCart = async (req, res) => {
    console.log("route hits")
    try {
        
        const { userId, foodItemsId, quantity } = req.body;

        const cart = await Cart.findOne({ userId });

        if (!cart) {
            cart = new Cart({ userId, items: [] });
        }

        const foodItems = await Food.findById(foodItemsId);
        if (!foodItems) {
            return res.status(404).json({ success: false, message: 'Food item not found' });
        }

        const existingItemIndex = cart.items.findIndex(item => item.foodItemsId.equals(foodItemsId));
        
        if (existingItemIndex > -1) {
            cart.items[existingItemIndex].quantity += quantity;
        } else {
            cart.items.push({ foodItemsId, quantity });
        }

        cart.totalPrice = cart.items.reduce(async (total, item) => {
            const fooditems =await Food.findById(item.foodItemsId);
            return total + (foodItems.price * item.quantity);
        }, 0);

        await cart.save();

        res.json({ success: true, message: 'Item added to cart', data: cart });

    } catch (error) {
        res.status(500).json({ message: error.message || 'Internal server error' });
    }
};


export const removeFromCart = async (req, res) => {
    try {
        const { userId, foodItemsId } = req.body;

        const cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).json({ success: false, message: 'Cart not found' });
        }

        cart.items = cart.items.filter(item => !item.foodItemsId.equals(foodItemsId));

        cart.totalPrice = cart.items.reduce(async (total, item) => {
            const fooditems = await Food.findById(item.foodItemsId);
            return total + (fooditems.price * item.quantity);
        }, 0);

        await cart.save();

        res.json({ success: true, message: 'Item removed from cart', data: cart });

    } catch (error) {
        res.status(500).json({ message: error.message || 'Internal server error' });
    }
};


export const updateCartItem = async (req, res) => {
    try {
        const { userId, foodItemsId, quantity } = req.body;

        const cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).json({ success: false, message: 'Cart not found' });
        }

        const itemIndex = cart.items.findIndex(item => item.foodItemsId.equals(foodItemsId));
        if (itemIndex > -1) {
            cart.items[itemIndex].quantity = quantity;
        } else {
            return res.status(404).json({ success: false, message: 'Item not found in cart' });
        }

        cart.totalPrice = cart.items.reduce(async (total, item) => {
            const foodItems = await Food.findById(item.foodItemsId);
            return total + (foodItems.price * item.quantity);
        }, 0);

        await cart.save();

        res.json({ success: true, message: 'Cart item updated', data: cart });

    } catch (error) {
        res.status(500).json({ message: error.message || 'Internal server error' });
    }
};

export const clearCart = async (req, res) => {
    try {
        const { userId } = req.body;

        const cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).json({ success: false, message: 'Cart not found' });
        }

        cart.items = [];
        cart.totalPrice = 0;

        await cart.save();

        res.json({ success: true, message: 'Cart cleared', data: cart });

    } catch (error) {
        res.status(500).json({ message: error.message || 'Internal server error' });
    }
};
