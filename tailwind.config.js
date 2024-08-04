/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      "primary":"#38A626",
      "secondary": "#1E1E1E"
    },

    fontFamily: {
      "font-primary": ["Poppins", "sans-serif"],
      "astrapi-billing": ["Inter", "sans-serif"]
    },
  },
  plugins: [],
};

