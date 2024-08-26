import { cloudinaryInstance } from "../config/cloudinaryConfig.js";
import { Restaurant } from "../models/restaurantModel.js";

export const getRestaurant= async(req,res,next)=>{
    
    try {

        const restaurantList = await Restaurant.find();


        

        res.json({success: true,message:'fetched restaurant list',data:restaurantList})

    } catch (error) {
        console.log('error', error)
        res.status(500).json({message:error.message || 'Internal server error'}) 
    }


}


export const createRestaurant= async(req,res,next)=>{
    
    try {

        const { name,address,phone,email,foodItems,createdAt } = req.body

        
        
        /*if(!name || !address || !phone || !email){
            return res.status(400).json({success:false,message:'all fields are required'})
        }*/
        
        console.log('image-restaurant====',req.file)

        const uploadResult = await cloudinaryInstance.uploader.upload(req.file.path).catch((error)=>{
            console.log(error)
        })
         
        console.log(uploadResult)

        const newRestaurant =new Restaurant({name,address,image:uploadResult.url,phone,email,foodItems,createdAt})
        await newRestaurant.save()

        res.json({success: true,message:'restaurant created successfully',data:newRestaurant})

    } catch (error) {
        console.log('error', error)
        res.status(500).json({message:error.message || 'Internal server error'}) 
    }


}

export const updateRestaurant= async(req,res,next)=>{
    
    try {

        const { name,address,phone,email,foodItems,createdAt } = req.body
        
        const {id} = req.params
        
        const updatedRestaurant = await Restaurant.findByIdAndUpdate(id,{name,address,email,phone,foodItems,createdAt},{new:true})
        
        // check restaurant exist
        if (!updatedRestaurant) {
            return res.status(404).json({ success: false, message: 'Restaurant not updated' });
          }

        res.json({success: true,message:'restaurant updated successfully',data:updatedRestaurant})

    } catch (error) {
        console.log('error', error)
        res.status(500).json({message:error.message || 'Internal server error'}) 
    }


}


export const deleteRestaurant= async(req,res,next)=>{
    
    try {

        const { name,address,phone,email,foodItems,createdAt } = req.body
        const {id} = req.params
        
        const deletedRestaurant = await Restaurant.findByIdAndDelete(id,{name,address,email,phone,foodItems,createdAt},{new:true})
        
        // check restaurant exist
        if (!deletedRestaurant) {
            return res.status(404).json({ success: false, message: 'Restaurant not deleted' });
          }

        res.json({success: true,message:'restaurant deleted successfully',data:deletedRestaurant})

    } catch (error) {
        console.log('error', error)
        res.status(500).json({message:error.message || 'Internal server error'}) 
    }


}
