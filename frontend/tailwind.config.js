/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'greenroute': {
          500: '#10b981', // emerald-500
          900: '#064e3b', // emerald-900
        }
      }
    },
  },
  plugins: [],
}
