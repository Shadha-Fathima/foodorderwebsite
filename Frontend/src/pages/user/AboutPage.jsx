import React from 'react'

export const AboutPage = () => {
  return (
    
    
    <div class="bg-gray-100 min-h-screen flex items-center justify-center">
    <div class="container mx-auto p-6">
    <h1 class="text-3xl font-bold text-gray-800 mb-8 text-center">About</h1>
        <div class="flex flex-col md:flex-row gap-6">
            
            <div class="flex-1 bg-white rounded-lg shadow-lg flex items-center justify-center">
                <img src="/src/assets/food_5.png" alt="Left Image" class="rounded-lg object-cover w-full h-full"/>
            </div>
            
            <div class="flex-1 bg-gray rounded-lg shadow-lg p-6 flex flex-col items-center justify-center">
                <h2 class="text-2xl font-semibold text-gray-800 mb-4 text-center">Welcome to Peppery</h2>
                <p class="text-gray-600 text-center">
                    At Peppery, we believe in spicing up your taste buds with a wide variety of delicious food options.
                </p>
            </div>
            
            <div class="flex-1 bg-white rounded-lg shadow-lg flex items-center justify-center">
                <img src="/src/assets/food_7.png" alt="Right Image" class="rounded-lg object-cover w-full h-full"/>
            </div>
        </div>
    </div>
</div>


  )
}
