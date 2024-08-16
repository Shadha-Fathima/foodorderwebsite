import mongoose from "mongoose";


const foodSchema = new mongoose.Schema({
   name:{
    type:String
   },
   description:{
    type:String
   },
   price:{
    type:String
   },
   restaurantId:{
      type:mongoose.Types.ObjectId,
      ref:'Restaurant',
   },
   orders:[{
      type: mongoose.Types.ObjectId,
      ref : 'Order',
      
      

  }]
})
      

      


export const Food =  mongoose.model('Food',foodSchema)