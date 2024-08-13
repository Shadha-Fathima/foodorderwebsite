import jwt from 'jsonwebtoken'

export const generateUserToken =(email)=>{
    const token = jwt.sign({email:email},process.env.JWT_SECRET_KEY)
    return token
}

export const generateAdminToken =(email)=>{
    const token = jwt.sign({email:email},process.env.JWT_SECRET_KEY)
    return token
}