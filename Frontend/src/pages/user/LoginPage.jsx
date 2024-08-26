import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { userLogin } from '../../services/userApi'

export const LoginPage = () => {
  const {
    register,
    handleSubmit,
  
    formState: { errors },
  } = useForm()
   const navigate=useNavigate()
   const onSubmit = async (data) =>{
  
    try {
      const response = await userLogin(data);
      toast.success("Login success");
      navigate("/");
  } catch (error) {
      toast.error("Login Failed");
      console.log(error);
  }
    

  }
 
  return (
    

<div className="bg-yellow min-h-screen">
  <div className="flex justify-center items-center p-20">
    {/* Container for Form and Image */}
    <div className="flex flex-row bg-gray rounded-2xl shadow-2xl">
      
      {/* Form Section */}
      <div className="card-body p-8">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text font-serif font-bold">Email</span>
            </label>
            <input type="email"  {...register("email")} placeholder="email" className="input input-bordered" required />
          </div>
          
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text font-serif font-bold">Password</span>
            </label>
            <input type="password"  {...register("password")} placeholder="password" className="input input-bordered" required />
            <label className='label'>
            <Link to ='/signup'>
             New user?
            </Link>
            </label>
          </div>
          
          <div className="flex flex-col  justify-start items-center form-control mt-6  ">
          <button type='submit' className="bg-gradient-to-r bg-green text-white w-1/2 py-2  text-lg font-bold rounded-md">Login</button>
        </div>
        </form>
      </div>

      {/* Image Section */}
      <div className="flex items-center justify-center">
        <img src="src/assets/platter-2009590_640.jpg" alt="Platter" className="rounded-r-2xl w-full h-full object-cover" />
      </div>
    </div>
  </div>
</div>


  )
}
