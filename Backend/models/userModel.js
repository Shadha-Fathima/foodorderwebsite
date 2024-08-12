import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true,'Name is required'],
        },
    email:{
        type: String,
        required: [true,'Email is required'],
    },
    password:{
        type: String,
        required: [true,'Password is required'],
    },
    role:{
        type: String,
        enum: ['user','admin'],
        default:'user',

    },
    orders:[{
        type: mongoose.Types.ObjectId,
        ref : 'Order',
        
        

    }]
})

export const User = mongoose.model('User',userSchema)