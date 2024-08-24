import React from 'react'
import { Link } from 'react-router-dom'



export const SignupPage = () => {



  
 return (
  <div className="bg-yellow min-h-screen">
  <div className="flex justify-center items-center p-20">
    {/* Container for Form and Image */}
    <div className="flex flex-row bg-gray rounded-2xl shadow-2xl">
      
      {/* Form Section */}
      <div className="card-body p-8">
        <form>
        <div className="form-control mb-4">
            <label className="label">
              <span className="label-text font-serif font-bold">Name</span>
            </label>
            <input type="text" placeholder="name" className="input input-bordered" required />
          </div>
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text font-serif font-bold">Email</span>
            </label>
            <input type="email" placeholder="email" className="input input-bordered" required />
          </div>
          
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text font-serif font-bold">Password</span>
            </label>
            <input type="password" placeholder="password" className="input input-bordered" required />
          </div>
          <label className='label'>
            <Link to ='/login'>
             Existing user?
            </Link>
            </label>
          
          <div className="flex flex-col  justify-start items-center form-control mt-6  ">
          <button className="bg-gradient-to-r bg-green text-white w-1/2 py-2  text-lg font-bold rounded-md">Sign Up</button>
        </div>
        </form>
      </div>
      <div className="flex items-center justify-center">
        <img src="src/assets/middle-eastern-food-6615971_640.jpg" alt="Platter" className="rounded-r-2xl w-full h-full object-cover" />
      </div>
    </div>
  </div>
</div>    
  )
}
