import React from 'react'



export const AboutPage = () => {
  return (
    
    
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
    <div className="container mx-auto p-6">
    <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">About</h1>
        <div className="flex flex-col md:flex-row gap-6">
            
            <div className="flex-1 bg-white rounded-lg shadow-lg flex items-center justify-center">
                <img src='/src/assets/food_5.png' alt="Left Image" className="rounded-lg object-cover w-full h-full"/>
            </div>
            
            <div className="flex-1 bg-gray rounded-lg shadow-lg p-6 flex flex-col items-center justify-center">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Welcome to Peppery</h2>
                <p className="text-gray-600 text-center">
                    At Peppery, we believe in spicing up your taste buds with a wide variety of delicious food options.
                </p>
            </div>
            
            <div className="flex-1 bg-white rounded-lg shadow-lg flex items-center justify-center">
                <img src="/src/assets/food_7.png" alt="Right Image" className="rounded-lg object-cover w-full h-full"/>
            </div>
        </div>
    </div>
</div>


  )
}
