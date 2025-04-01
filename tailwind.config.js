/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2563eb',
        secondary: '#f3f4f6',
        accent: '#4f46e5',
        textDark: '#1f2937',
      }
    },
  },
  plugins: [],
}