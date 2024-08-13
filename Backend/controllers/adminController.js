import { Admin } from "../models/adminModel.js"
import { generateAdminToken } from "../utils/generateToken.js"
import bcrypt from 'bcrypt'

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

       // const passwordMatch =   await bcrypt.compare(password,isAdminExist.password)
        
        if(password!==isAdminExist.password){
            
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