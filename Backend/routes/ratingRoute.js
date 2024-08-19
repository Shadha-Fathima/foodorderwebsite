import express from 'express';
import { addRating, getRatingsByRestaurant } from '../controllers/ratingController.js';

const router = express.Router();

router.post('/add', addRating);
router.get('/:restaurantId', getRatingsByRestaurant);

export default router;
