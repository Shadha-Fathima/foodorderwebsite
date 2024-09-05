import { Food } from "../models/foodModel.js";


// export const getFood= async(req,res,next)=>{
//     try {

//         const foodList = await Food.find();

//         res.json({success: true,message:'fetched food list',data:foodList})

//         // check restaurant exist
//         if (!foodList) {
//             return res.status(404).json({ success: false, message: 'food not found' });
//           }

//     } catch (error) {
//         console.log('error', error)
//         res.status(500).json({message:error.message || 'Internal server error'}) 
//     }


// }

export const getFood = async (req, res, next) => {
    try {
        const foodList = await Food.find().populate('restaurantId', 'name');

        if (!foodList || foodList.length === 0) {
            return res.status(404).json({ success: false, message: 'Food not found' });
        }

        res.json({ success: true, message: 'fetched food list', data: foodList });
    } catch (error) {
        console.log('error', error);
        res.status(500).json({ message: error.message || 'Internal server error' });
    }
};


export const addFood= async(req,res,next)=>{
    
    try {

        const { name,description,price,restaurantId } = req.body
        
        if(!name || !description || !price || !restaurantId){
            return res.status(400).json({success:false,message:'all fields are required'})
        }

        const newFood =new Food({name,description,price,restaurantId})
         await newFood.save()

        res.json({success: true,message:' food added to food list',data:newFood})

    } catch (error) {
        console.log('error', error)
        res.status(500).json({message:error.message || 'Internal server error'}) 
    }


}


export const updateFood= async(req,res,next)=>{
    
    try {

        const { name,description,price ,restaurantId} = req.body
        
        const {id} = req.params
        
        const updatedFood = await Food.findByIdAndUpdate(id,{name,description,price,restaurantId},{new:true})
        
        
        
        // check restaurant exist
        if (!updatedFood) {
            return res.status(404).json({ success: false, message: 'food not updated' });
          }

        res.json({success: true,message:'food updated successfully',data:updatedFood})

    } catch (error) {
        console.log('error login', error)
        res.status(500).json({message:error.message || 'Internal server error'}) 
    }


}

export const deleteFood= async(req,res,next)=>{
    
    try {

        const { name,description,price,restaurantId } = req.body
        const {id} = req.params
        
        const deletedFood = await Food.findByIdAndDelete(id,{name,description,price,restaurantId},{new:true})
        
        // check food exist
        if (!deletedFood) {
            return res.status(404).json({ success: false, message: 'food not deleted' });
          }

        res.json({success: true,message:'food deleted successfully',data:deletedFood})

    } catch (error) {
        console.log('error', error)
        res.status(500).json({message:error.message || 'Internal server error'}) 
    }


}
