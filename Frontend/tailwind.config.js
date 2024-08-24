import daisyui from 'daisyui'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
     
  ],
  theme: {
    extend: {
      colors:{
        yellow: '#FDA403',
        orange: '#E8751A',
        green: '#898121',
        gray: '#E5C287',
      },
    },
  },
  plugins: [
       daisyui,
    ],
}

