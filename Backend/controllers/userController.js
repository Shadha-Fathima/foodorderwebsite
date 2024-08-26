/*import {User} from "../models/userModel.js";
import bcrypt from 'bcrypt'
import { generateUserToken } from "../utils/generateToken.js";

export const createUser = async(req,res,next)=>{
    
    try {
        const {name,email,password,role = 'user'} = req.body
        console.log('route hits')
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
        // is user exist or not
        const isUserExist = await User.findOne({email})
        
        if(!isUserExist){
            console.log('user does not exist')
            return res.status(400).json({success:false,message:'user does not exist'})
        }
        
        const passwordMatch =  bcrypt.compare(password, isUserExist.password)
        
        if(!passwordMatch){
            
            return res.status(400).json({success:false,message:'user not authenticated'})
        }

        const token = generateUserToken(email)
        console.log('generated token', token)
        
        res.cookie("token",token,{
            httpOnly:true,
            sameSite:'None'
        })

        res.json({success: true,message:'user logged in successfully'})

    } catch (error) {
        console.log('error during login', error)
        res.status(500).json({message:error.message || 'Internal server error'}) 
    }


}



export const userProfile = async (req, res, next) => {
    try {
        const { id } = req.params;
        const userData = await User.findById(id).select('-password');  

        if (!userData) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        res.json({ success: true, message: 'User data fetched', data: userData });

    } catch (error) {
        console.log('Error fetching user data:', error);
        res.status(500).json({ message: error.message || 'Internal server error' });
    }
};




/*export const userProfile= async(req,res,next)=>{
    
    try {

        const {id} = req.params;
        const userData = await User.findById(id).select('-password');
        

        res.json({success: true,message:'user data fetched',data:userData})

    } catch (error) {
        console.log('error', error)
        res.status(500).json({message:error.message || 'Internal server error'}) 
    }


}*/

/*export const checkUser= async(req,res,next)=>{
    
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



export const userSignup = async (req, res, next) => {
    try {
        const { name, email, password, role } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ success: false, message: 'all fields are required' });
        }

        const isUserExist = await User.findOne({ email });
        if (isUserExist) {
            return res.status(400).json({ success: false, message: 'user already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword, role: role || 'user' });
        await newUser.save();

        const token = generateUserToken(email);
        res.cookie("token", token,{httpOnly:true});

        res.json({ success: true, message: 'User signed up successfully', data: newUser.select('-password') });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const userLogout= async(req,res,next)=>{
    
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

        res.json({success: true,message:'user logged out successfully'})

    } catch (error) {
        console.log('error during logout', error)
        res.status(500).json({message:error.message || 'Internal server error'}) 
    }


}*/

import { User } from "../models/userModel.js";
import bcrypt from 'bcrypt';
import { generateUserToken } from "../utils/generateToken.js";

export const createUser = async (req, res, next) => {
    try {
        const { name, email, password, role = 'user' } = req.body;
        console.log('route hits');
        
        if (!name || !email || !password) {
            return res.status(400).json({ success: false, message: 'All fields are required' });
        }

        // Check if the user exists
        const isUserExist = await User.findOne({ email });
        if (isUserExist) {
            return res.status(400).json({ success: false, message: 'User already exists' });
        }

        // Hash the password
        const salt = 10;
        const hashedPassword = bcrypt.hashSync(password, salt);

        // Create the new user
        const newUser = new User({ name, email, password: hashedPassword, role });
        await newUser.save();

        // Generate a token and set it as a cookie
        const token = generateUserToken(newUser._id);
        res.cookie("token", token, { httpOnly: true });

        res.json({ success: true, message: 'User created successfully', data: newUser });

    } catch (error) {
        console.error('Error during user creation:', error);
        res.status(500).json({ message: error.message || 'Internal server error' });
    }
};

export const userLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, message: 'All fields are required' });
        }

        // Check if the user exists
        const isUserExist = await User.findOne({ email });
        if (!isUserExist) {
            console.log('User does not exist');
            return res.status(404).json({ success: false, message: 'User does not exist' });
        }

        // Compare the provided password with the stored hash
        const passwordMatch = await bcrypt.compare(password, isUserExist.password); 

        if (!passwordMatch) {
            return res.status(401).json({ success: false, message: 'User not authenticated' });
        }

        // Generate a token and set it as a cookie
        const token = generateUserToken(isUserExist._id);
        res.cookie("token", token, {
            httpOnly: true,
            sameSite: 'None'
        });

        res.json({ success: true, message: 'User logged in successfully' });

    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: error.message || 'Internal server error' });
    }
};

export const userProfile = async (req, res, next) => {
    try {
        const { id } = req.params;
        const userData = await User.findById(id).select('-password'); // Exclude password from the response

        if (!userData) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        res.json({ success: true, message: 'User data fetched', data: userData });

    } catch (error) {
        console.error('Error fetching user data:', error);
        res.status(500).json({ message: error.message || 'Internal server error' });
    }
};

export const checkUser = async (req, res, next) => {
    try {
        const user = req.user;

        if (!user) {
            return res.status(401).json({ success: false, message: "User not authenticated" });
        }

        res.json({ success: true, message: 'User authenticated', user });

    } catch (error) {
        console.error('Error checking user authentication:', error);
        res.status(500).json({ message: error.message || 'Internal server error' });
    }
};

export const userSignup = async (req, res, next) => {
    try {
        const { name, email, password, role = 'user' } = req.body;
        
        if (!name || !email || !password) {
            return res.status(400).json({ success: false, message: 'All fields are required' });
        }

        // Check if the user already exists
        const isUserExist = await User.findOne({ email });
        if (isUserExist) {
            return res.status(409).json({ success: false, message: 'User already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create and save the new user
        const newUser = new User({ name, email, password: hashedPassword, role });
        await newUser.save();

        // Generate a token and set it as a cookie
        const token = generateUserToken(newUser._id); // Use _id instead of email
        res.cookie("token", token, { httpOnly: true });

        res.json({ success: true, message: 'User signed up successfully', data: newUser });

    } catch (error) {
        console.error('Error during signup:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const userLogout = async (req, res, next) => {
    try {
        // Clear the cookie containing the token
        res.clearCookie("token");

        res.json({ success: true, message: 'User logged out successfully' });

    } catch (error) {
        console.error('Error during logout:', error);
        res.status(500).json({ message: error.message || 'Internal server error' });
    }
};
