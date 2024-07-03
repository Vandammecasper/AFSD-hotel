/* v8 ignore start */

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],

  theme: {
    colors: {
      primary: "#50563F",
      secondary: "#F1F2EE",
      accent: "#FF934F",
      lightGreen: "#666E50",
    },
    fontFamily: {
      bell: ["Bell MT", "sans-serif"],
    },
    fontWeight: {
      bold: 700,
      normal: 500,
    },
  },
  plugins: [],
};
