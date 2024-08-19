import { Admin } from "../models/adminModel.js"
import { generateAdminToken } from "../utils/generateToken.js"
import bcrypt from 'bcrypt'
import {Restaurant} from "../models/restaurantModel.js"

// admin login
export const adminLogin= async(req,res,next)=>{
    
    try {
        const {email,password} = req.body
        
        if(!email || !password){
            return res.status(400).json({success:false,message:'all fields are required'})
        }
        
         const isAdminExist = await Admin.findOne({email})
        
        if(!isAdminExist){
            return res.status(400).json({success:false,message:'admin does not exist'})
         }

         if(isAdminExist.role !== "admin"){
            return res.status(403).json({success:false,message:"access denied"})
         }

        console.log('Input password:', password);
        console.log('Stored hashed password:', isAdminExist.password);
        
        const salt = 10;
        const hashedPassword = bcrypt.hashSync('adminpassword', salt);

       
        
        if(password==isAdminExist.password){
            
            return res.status(400).json({success:false,message:'admin not authenticated'})
        }

         const token = generateAdminToken(email)
         console.log('generated token', token)
        
        res.cookie("token",token)

        res.json({success: true,message:'admin logged in successfully'})

    } catch (error) {
        console.log('error during login', error)
        res.status(500).json({message:error.message || 'Internal server error'}) 
    }


}
// admin profile
export const adminProfile= async(req,res,next)=>{
    
    try {

        const {id} = req.params;
        const adminData = await Admin.findById(id);
        

        res.json({success: true,message:'admin data fetched',data:adminData})

    } catch (error) {
        console.log('error login', error)
        res.status(500).json({message:error.message || 'Internal server error'}) 
    }


}
// check Admin is existing or not
export const checkAdmin= async(req,res,next)=>{
    
    try {

          const user = req.Admin;

          if(!Admin){
            return res.status(400).json({success:false,message:"admin not authenticated"})
          }
        
        
        res.json({success: true,message:'admin authenticated'})

    } catch (error) {
        console.log('error ', error)
        res.status(500).json({message:error.message || 'Internal server error'}) 
    }


}
// admin signup
export const adminSignup = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ success: false, message: 'All fields are required' });
        }

        //const isAdminExist = await Admin.findOne({ email });
        //if (isAdminExist) {
            //return res.status(400).json({ success: false, message: 'Admin already exists' });
        //}

        //const hashedPassword = await bcrypt.hash(password, 10);
        const salt = 10;
        const hashedPassword = bcrypt.hashSync('adminpassword', salt);

        const newAdmin = new Admin({ name, email, password: hashedPassword, role: 'admin' });
        await newAdmin.save();

        const token = generateAdminToken(email);
        res.cookie("token", token);

        res.json({ success: true, message: 'Admin signed in successfully', data: newAdmin });
    } catch (error) {
        res.status(500).json({ message:error.message || 'Internal server error' });
    }
};

// list all restaurants
export const listRestaurants = async (req, res) => {
    try {
        const restaurants = await Restaurant.find();
        res.json({ success: true, data: restaurants });
    } catch (error) {
        res.status(500).json({ message: error.message || 'Internal server error' });
    }
};

// Add a Restaurant
export const addRestaurant = async (req, res) => {
    try {
        const { name, address, phone, email } = req.body;

        const newRestaurant = new Restaurant({ name, address, phone, email });
        await newRestaurant.save();
        
        res.json({ success: true, message: 'Restaurant added successfully', data: newRestaurant });
    } catch (error) {
        res.status(500).json({ message: error.message || 'Internal server error' });
    }
};

// Update a Restaurant
export const updateRestaurant = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, address, phone, email } = req.body;

        const updatedRestaurant = await Restaurant.findByIdAndUpdate(
            id,
            { name, address, phone, email },
            { new: true }
        );
        
        res.json({ success: true, message: 'Restaurant updated successfully', data: updatedRestaurant });
    } catch (error) {
        res.status(500).json({ message: error.message || 'Internal server error' });
    }
};

// Delete a Restaurant
export const deleteRestaurant = async (req, res) => {
    try {
        const { id } = req.params;
        await Restaurant.findByIdAndDelete(id);
        
        res.json({ success: true, message: 'Restaurant deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message || 'Internal server error' });
    }
};

// List all Users
export const listUsers = async (req, res) => {
    try {
        const users = await users.find();
        res.json({ success: true, data: users });
    } catch (error) {
        res.status(500).json({ message: error.message || 'Internal server error' });
    }
};

// Update User Role
export const updateUserRole = async (req, res) => {
    try {
        const { id } = req.params;
        const { role } = req.body;

        const updatedUser = await User.findByIdAndUpdate(id, { role }, { new: true });
        
        res.json({ success: true, message: 'User role updated successfully', data: updatedUser });
    } catch (error) {
        res.status(500).json({ message: error.message || 'Internal server error' });
    }
};

// List all Orders
export const listOrders = async (req, res) => {
    try {
        const orders = await orders.find().populate('userId').populate('restaurantId').populate('food.foodItemsId');
        res.json({ success: true, data: orders });
    } catch (error) {
        res.status(500).json({ message: error.message || 'Internal server error' });
    }
};

// Update Order Status
export const updateOrderStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const updatedOrder = await Order.findByIdAndUpdate(id, { status }, { new: true });
        
        res.json({ success: true, message: 'Order status updated successfully', data: updatedOrder });
    } catch (error) {
        res.status(500).json({ message: error.message || 'Internal server error' });
    }
};

// admin logout
export const adminLogout= async(req,res,next)=>{
    
    try {
        const {email,password} = req.body
        
        if(!email || !password){
            return res.status(400).json({success:false,message:'all fields are required'})
        }
        
         const isAdminExist = await Admin.findOne({email})
        
        if(!isAdminExist){
            return res.status(400).json({success:false,message:'admin does not exist'})
         }

         if(isAdminExist.role !== "admin"){
            return res.status(403).json({success:false,message:"access denied"})
         }

        console.log('Input password:', password);
        console.log('Stored hashed password:', isAdminExist.password);
        
        const salt = 10;
        const hashedPassword = bcrypt.hashSync('adminpassword', salt);

       // const passwordMatch =   await bcrypt.compare(password,isAdminExist.password)
        
        if(password==isAdminExist.password){
            
            return res.status(400).json({success:false,message:'admin not authenticated'})
        }

         const token = generateAdminToken(email)
         console.log('generated token', token)
        
        res.cookie("token",token)

        res.json({success: true,message:'admin logged out successfully'})

    } catch (error) {
        console.log('error during login', error)
        res.status(500).json({message:error.message || 'Internal server error'}) 
    }


}


