/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}", // For the `app` directory (Next.js 13+)
    "./pages/**/*.{js,ts,jsx,tsx}", // For the `pages` directory
    "./components/**/*.{js,ts,jsx,tsx}", // For your components
    "./globals.css", // Include your global CSS file
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

