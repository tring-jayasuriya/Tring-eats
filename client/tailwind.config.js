/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        ctmgreen:"#3A5B22",
        mango:"#F8B602",
        litMango:"#f5f5f5",
        blackop:"rgba(0,0,0,0.6)"
      },
      fontFamily:{
        poppins:['Poppins','sans-serif']
      },
      fontSize: {
        xxs: "0.625rem", 
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
}