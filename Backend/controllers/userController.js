import {User} from "../models/userModel.js";
import bcrypt from 'bcrypt'
import { generateUserToken } from "../utils/generateToken.js";

export const createUser = async(req,res,next)=>{
    console.log("route hitted")
    try {
        const {name,email,password,role = 'user'} = req.body
        console.log(name ,email)
        if(!name || !email || !password){
            return res.status(400).json({success:false,message:'all fields are required'})
        }

        const isUserExist = await User.findOne({email})
        console.log('is user exist',isUserExist)
        if(isUserExist){
            return res.status(400).json({success:true,message:'user already exists'})
        }

        const salt = 10;
        const hashedPassword =  bcrypt.hashSync(password, salt);
        

        const newUser = new User({name,email,password:hashedPassword,role})
        await newUser.save()
        console.log('new user testing',newUser)
        const token = generateUserToken(email)
        
        res.cookie("token",token,{httpOnly:true})

        res.json({success: true,message:'user created successfully'})

    } catch (error) {
        res.status(500).json({message: error.message  || ' Internal server error'})
    }


}

export const userLogin= async(req,res,next)=>{
    
    try {
        const {email,password} = req.body
        console.log('missing email or password')
        if(!email || !password){
            return res.status(400).json({success:false,message:'all fields are required'})
        }
        
        const isUserExist = await User.findOne({email})
        
        if(!isUserExist){
            console.log('user does not exist')
            return res.status(400).json({success:false,message:'user does not exist'})
        }
        
        const passwordMatch =   await bcrypt.compare(password, isUserExist.password)
        
        if(!passwordMatch){
            console.log('password does not match')
            return res.status(400).json({success:false,message:'user not authenticated'})
        }

        const token = generateUserToken(email)
        console.log('generated token', token)
        
        res.cookie("token",token)

        res.json({success: true,message:'user login successfully'})

    } catch (error) {
        console.log('error during login', error)
        res.status(500).json({message:error.message || 'Internal server error'})
    }


}