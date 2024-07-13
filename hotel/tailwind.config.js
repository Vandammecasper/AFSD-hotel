/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    colors: {
      primary: '#F1F2EE',
      secondary: '#FEFFFB',
      accent: '#FF934F',
      darkGreen: '#2F3325',
      black: '#000000',
      red: '#FF0000',
    },
    fontFamily: {
      cambria: ['Cambria', 'sans-serif'],
    },
    fontWeight: {
      normal: 400,
      bold: 700,
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}

