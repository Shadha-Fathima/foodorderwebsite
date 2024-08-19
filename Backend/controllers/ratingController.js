import { Rating } from '../models/ratingModel.js';
import { Restaurant } from '../models/restaurantModel.js';

// new rating
export const addRating = async (req, res) => {
    try {
        const { userId, restaurantId, rating, review } = req.body;

        if (!userId || !restaurantId || !rating || !review) {
            return res.status(400).json({ success: false, message: 'All fields are required' });
        }

        const newRating = new Rating({ userId, restaurantId, rating, review });
        await newRating.save();

    
        const ratings = await Rating.find({ restaurantId });
        const avgRating = ratings.reduce((acc, curr) => acc + curr.rating, 0) / ratings.length;

        await Restaurant.findByIdAndUpdate(restaurantId, { averageRating: avgRating });

        res.json({ success: true, message: 'Rating added successfully', data: newRating });
    } catch (error) {
        res.status(500).json({ message: error.message || 'Internal server error' });
    }
};

// Fetch ratings for a restaurant
export const getRatingsByRestaurant = async (req, res) => {
    try {
        const { restaurantId } = req.params;

        const ratings = await Rating.find({ restaurantId }).populate('userId', 'name');

        res.json({ success: true, data: ratings });
    } catch (error) {
        res.status(500).json({ message: error.message || 'Internal server error' });
    }
};
