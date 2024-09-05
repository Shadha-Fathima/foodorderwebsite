import jwt from 'jsonwebtoken'

export const authUser = (req,res,next) =>{
    console.log("middleware called")
    try{
        const {token} = req.cookies;
        console.log(req.cookies)
        console.log(token,"token")
        if(!token){
            return res.status(401).json({success: false,message:"user not authenticated"})
        }

        const tokenVerified = jwt.verify(token,process.env.JWT_SECRET_KEY);

        if(!tokenVerified){
            return res.status(400).json({success:false,message:"user not authenticated"})
        }
         req.user = tokenVerified;

        next();
    }catch (error){
        console.error('Error during user authentication:', error);
        return res.status(500).json({ success: false, message: 'Internal server error' })
    }
}

/*import jwt from 'jsonwebtoken';

export const authUser = (req, res, next) => {
    try {
        const token = req.cookies.token; 

        if (!token) {
            return res.status(401).json({ success: false, message: 'No token provided' });
        }

        // Verify the token
        jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
            if (err) {
                return res.status(401).json({ success: false, message: 'Invalid or expired token' });
            }
            
            // Attach the decoded token to the request object
            req.user = decoded;
            next();
        });
    } catch (error) {
        console.error('Error during user authentication:', error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
};*/
