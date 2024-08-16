import { Order } from "../models/orderModel.js";

export const getOrderList= async(req,res,next)=>{
    
    try {

        const orderList = await Order.find();
        
        res.json({success: true,message:'fetched order list',data:orderList})

    } catch (error) {
        console.log('error', error)
        res.status(500).json({message:error.message || 'Internal server error'}) 
    }


}



export const createOrder= async(req,res,next)=>{
    
    try {
        
        const { userId,restaurantId,foodItems,totalPrice,status,createdAt,deliveryAddress,paymentStatus } = req.body
        
        if(!userId || !restaurantId || !foodItems || !totalPrice){
            return res.status(400).json({success:false,message:'all fields are required'})
        }

        const newOrder = new Order({ userId,restaurantId,foodItems,totalPrice,status,createdAt,deliveryAddress,paymentStatus})
        await newOrder.save()

        res.json({success: true,message:'order placed successfully',data:newOrder})

    } catch (error) {
        console.log('error', error)
        res.status(500).json({message:error.message || 'Internal server error'}) 
    }


}

export const getOrderById = async (req,res,next)=>{
    try {
        const {orderId} = req.params;
        const order = await Order.findById(orderId);
        
        if (!order){
            return res.status(400).json({success:false,message:'order not found'})
        }
        res.json({success:true,data:order})
    } catch (error) {
        res.status(500).json({message:error.message || 'Internal server error' })
        
    }
}


export const getUserOrders = async (req,res)=>{
    try {
        const {userId} = req.params
        const orders = await Order.find ({userId})

        res.json({success:true, data:orders})
    } catch (error) {
        res.status(500).json({message: error.message || "Internal server error"})
    }
}

export const updateOrderStatus = async (req, res) => {
    try {
        const { orderId } = req.params;
        const { status } = req.body;

        const updatedOrder = await Order.findByIdAndUpdate(orderId, { status }, { new: true });

        if (!updatedOrder) {
            return res.status(404).json({ success: false, message: 'Order not found' });
        }

        res.json({ success: true, message: 'Order status updated', data: updatedOrder });
    } catch (error) {
        res.status(500).json({ message: error.message || 'Internal server error' });
    }
};

// Delete an order 
export const deleteOrder = async (req, res) => {
    try {
        const { orderId } = req.params;

        const deletedOrder = await Order.findByIdAndDelete(orderId);

        if (!deletedOrder) {
            return res.status(404).json({ success: false, message: 'Order not found' });
        }

        res.json({ success: true, message: 'Order canceled successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message || 'Internal server error' });
    }
};