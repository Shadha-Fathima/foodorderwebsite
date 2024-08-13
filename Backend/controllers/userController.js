import {User} from "../models/userModel.js";
import bcrypt from 'bcrypt'
import { generateUserToken } from "../utils/generateToken.js";

export const createUser = async(req,res,next)=>{
    
    try {
        const {name,email,password,role = 'user'} = req.body
        
        if(!name || !email || !password){
            return res.status(400).json({success:false,message:'all fields are required'})
        }

        // user exists or not
        const isUserExist = await User.findOne({email})
        
        if(isUserExist){
            return res.status(400).json({success:true,message:'user already exists'})
        }
        // hashing password
        const salt = 10;
        const hashedPassword =  bcrypt.hashSync(password, salt);
        
        // creating new user
        const newUser = new User({name,email,password:hashedPassword,role})
        await newUser.save()
        
        // token created with cookie
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
            
            return res.status(400).json({success:false,message:'user not authenticated'})
        }

        const token = generateUserToken(email)
        console.log('generated token', token)
        
        res.cookie("token",token)

        res.json({success: true,message:'user logged in successfully'})

    } catch (error) {
        console.log('error during login', error)
        res.status(500).json({message:error.message || 'Internal server error'}) 
    }


}


export const userProfile= async(req,res,next)=>{
    
    try {

        const {id} = req.params;
        const userData = await User.findById(id);
        

        res.json({success: true,message:'user data fetched',data:userData})

    } catch (error) {
        console.log('error login', error)
        res.status(500).json({message:error.message || 'Internal server error'}) 
    }


}

export const checkUser= async(req,res,next)=>{
    
    try {

          const user = req.user;

          if(!user){
            return res.status(400).json({success:false,message:"user not authenticated"})
          }
        
        
        res.json({success: true,message:'user authenticated'})

    } catch (error) {
        console.log('error during login', error)
        res.status(500).json({message:error.message || 'Internal server error'}) 
    }


}