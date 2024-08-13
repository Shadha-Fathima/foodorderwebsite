import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true,'Name is required'],
        },
    email:{
        type: String,
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
        default:'admin',

    },
    
})

export const Admin = mongoose.model('Admin',adminSchema)