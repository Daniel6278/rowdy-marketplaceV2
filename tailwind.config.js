/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'utsa-blue': '#0c2340',
        'utsa-orange': '#f15a22',
        'light-gray': '#9b9b9b',
        'success': '#1d8221',
        'error': '#E02B2B',
      },
    },
  },
  plugins: [],
}

