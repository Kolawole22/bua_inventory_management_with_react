/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{html,js,tsx}"],
  theme: {
    screens: {
      lt: { max: "500px" },
      sm: { max: "600px" },
      sm1: { max: "840px" },
      md: { max: "1100px" },
      md1: { max: "850px" },
      lg: { min: "2300px" },
      xl: { max: "1280px" },
      "2xl": { max: "1536px" },
    },
    extend: {},
  },
  plugins: [],
};
