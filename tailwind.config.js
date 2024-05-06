/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/App.tsx',
    './src/index.tsx',
    './src/**/*.{ts,tsx}',
    './src/**/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
}

