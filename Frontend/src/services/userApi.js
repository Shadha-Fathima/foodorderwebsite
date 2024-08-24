import axios from "axios" 

export const userLogin = async(data)=>{
    try {
        const response = await axios({
            url:"http://localhost:3000/api/user/login",
            method:"POST",
            data,
            withCredentials:true,
       
          })
          return response?.data
    } catch (error) {
        console.log(error)
        
    }
}