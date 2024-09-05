
import { axiosInstance } from "../config/axiosInstance"

export const userLogin = async(data)=>{
    try {
        const response = await axiosInstance({
            url:"/user/login",
            method:"POST",
            data,
            withCredentials:true,
       
          })
          return response?.data
    } catch (error) {
        console.log(error)
        
    }
}

export const checkUser = async()=>{
    try {
        const response = await axiosInstance({
            url:"/user/check-user",
            method:"GET",
            withCredentials:true,
        })
        return response?.data
    } catch (error) {
        console.log(error)
        
    }
}

export const userLogout = async () => {
    try {
        const response = await axiosInstance({
            url: "/user/logout",
            method: "POST",
        });
        return response?.data;
    } catch (error) {
        toast.error("Log-out Failed ");
        console.log(error);
    }
};