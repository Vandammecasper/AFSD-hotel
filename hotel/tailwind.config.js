/** @type {import('tailwindcss').Config} */
export default {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    darkMode: false, // or 'media' or 'class'
    theme: {
      colors: {
        primary: '#50563F',
        secondary: '#F1F2EE',
        accent: '#FF934F',
        lightGreen: '#666E50',
        black: '#000000',
      },
      fontFamily: {
        bell: ['Bell MT', 'sans-serif'],
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

