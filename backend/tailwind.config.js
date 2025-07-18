/** @type {import('tailwindcss').Config} */
export default {
  content: ["./public/**/*.html"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f8fde6',
          100: '#f0fbc9',
          200: '#e2f898',
          300: '#cdf463',
          400: '#b8ec37',
          500: '#9dd91a',
          600: '#7bb811',
          700: '#5e8b13',
          800: '#4d6f16',
          900: '#425d18',
        }
      }
    },
  },
  plugins: [],
} 