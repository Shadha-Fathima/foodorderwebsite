import React from 'react'
import { AboutPage } from './AboutPage'

export const HomePage = () => {
  return (
    <><div className="p-4 border-collapse rounded-2xl">
      <div
        className="bg-cover bg-center min-h-screen rounded-2xl flex items-center"
        style={{ backgroundImage: "url('/src/assets/header_img.png')" }}
      >
        <div className='text-white flex flex-col font-mono text-5xl font-extrabold ml-10 space-y-4'>
          <h1>Spice up your taste buds</h1>
          <p className='text-base whitespace-pre-line'>
            Peppery offers a flavorful journey with bold spices and{"\n"}
            delicious dishes that spice up your taste buds.{"\n"}
            Discover exceptional culinary delights
          </p>
          <div className='flex justify-start'>
            <button className='bg-gradient-to-r bg-green text-white text-sm py-2 px-6 rounded-md shadow-lg transform hover:scale-105 transition duration-300 ease-in-out max-w-xs'>
              Explore Menu
            </button>
          </div>
        </div>
      </div>
    </div><AboutPage /></>
  )
}
