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
      

      
})

export const Food = mongoose.model('Food',foodSchema)