import jwt from 'jsonwebtoken'

export const authAdmin = (req,res,next) =>{
    try{
        const {token} = req.cookies;
        
        if(!token){
            return res.stataus(400).json({success: false,message:"admin not authenticated"})
        }

        const tokenVerified = jwt.verify(token,process.env.JWT_SECRET_KEY);

        if(!tokenVerified){
            return res.status(400).json({success:false,message:"admin not authenticated"})
        }
         req.admin = tokenVerified;

        next();
    }catch (error){
        console.log(error);
    }
}