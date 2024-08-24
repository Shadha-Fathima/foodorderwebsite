import mongoose from "mongoose";


const restaurantSchema = new mongoose.Schema({
    name: {
      type: String,
      required: [true, 'Restaurant name is required'],
    },
    address: {
      street: String,
      city: String,
      state: String,
      zip: String,
    },
    image:{
      type:String,
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    foodItems: [
      {
        type: mongoose.Types.ObjectId,
        ref:'Food',
      }
    ],
    createdAt: {
      type: Date,
      default: Date.now,
    },
  });
  
  export const Restaurant = mongoose.model('Restaurant', restaurantSchema);