// import React from 'react'

// export const MenuPage = () => {
//   return (
//     <div>MenuPage</div>
//   )
// }

// Pages/menuPage.jsx
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import toast from 'react-hot-toast';

//  export const MenuPage = () => {
//     const [menuItems, setMenuItems] = useState([]);

//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchMenuItems = async () => {
//             try {
//                 const response = await axios.get('/api/food');
//                 setMenuItems(response.data.data);
//                 console.log(response.data.data);

//             } catch (error) {
//                 console.log(error)
//                 setError('Failed to fetch menu items');
//                 toast.error('Failed to load menu');

//             }
//         };
//         fetchMenuItems();
//     }, []);

//     if (error) {
//         return <div>{error}</div>;
//     }

//     return (
//         <div className="container mx-auto p-6">
//             <h1 className="text-3xl font-bold text-center mb-8">Our Menu</h1>
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
//             {Array.isArray(menuItems) && menuItems.length > 0 ? (
//                 {menuItems.map(item => (
//                     <div key={item._id} className="bg-white rounded-lg shadow-lg overflow-hidden">
//                         <img src={item.image} alt={item.name} className="w-full h-48 object-cover" />
//                         <div className="p-4">
//                             <h2 className="text-xl font-bold">{item.name}</h2>
//                             <p className="text-gray-700 mb-2">{item.description}</p>
//                             <p className="text-gray-900 font-semibold">${item.price}</p>
//                         </div>
//                     </div>
//                 ))}

//             </div>
//         </div>
//     );
// };

import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export const MenuPage = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await axios.get("/api/food");
        setMenuItems(response.data.data);
        console.log(response.data.data);
      } catch (error) {
        console.log(error);
        setError("Failed to fetch menu items");
        toast.error("Failed to load menu");
      }
    };
    fetchMenuItems();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-8">Our Menu</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {Array.isArray(menuItems) && menuItems.length > 0 ? (
          menuItems.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-bold">{item.name}</h2>
                <p className="text-gray-700 mb-2">{item.description}</p>
                <p className="text-gray-900 font-semibold">${item.price}</p>
              </div>
            </div>
          ))
        ) : (
          <div>No menu items available</div>
        )}
      </div>
    </div>
      );
    };




