import React from 'react'
import { Link } from 'react-router-dom'

export const Header = () => {
  return (
    <header>
    <div className=" flex items-center p-4 h-20 ">
      <img className='size-20' src="/src/assets/peppery-removebg-preview.png" alt="" />
      
      <span className='"ml-2 text-xl font-bold text-white'>Peppery</span>

      <nav className="flex items-center justify-center w-full space-x-20">
    <Link to="/" className="text-white font-bold hover:text-blue-500 ">
      Home
    </Link>
    <Link to="/about" className="text-white font-bold hover:text-blue-500">
      About
    </Link>
    <Link to="/user/restaurants" className="text-white font-bold hover:text-blue-500">
      Restaurants
    </Link>
  </nav>
      <Link to='/signup'>
      <button className='bg-gradient-to-r bg-green text-white font-semibold py-2 px-6 rounded-full shadow-lg transform transition duration-300 ease-in-out hover:scale-[1.02] hover:backface-visibility-hidden' >Sign Up</button>
      </Link>
    </div>
    </header>
    
  )
}


