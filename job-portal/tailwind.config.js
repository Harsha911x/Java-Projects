/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-black': '#0a0a0a',
        'secondary-black': '#1a1a1a',
        'dark-green': '#1a472a',
        'medium-green': '#2d5a3d',
        'light-green': '#4a7c59',
        'accent-green': '#6b8e23',
        'text-white': '#ffffff',
        'text-gray': '#cccccc',
        'text-light-gray': '#999999',
        'border-color': '#333333',
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #0a0a0a 0%, #1a472a 100%)',
        'gradient-secondary': 'linear-gradient(135deg, #1a472a 0%, #2d5a3d 100%)',
      }
    },
  },
  plugins: [],
}