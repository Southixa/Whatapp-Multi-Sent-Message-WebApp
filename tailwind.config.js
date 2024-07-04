/** @type {import('tailwindcss').Config} */
const {nextui, colors} = require("@nextui-org/react");
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        hfPrimary: '#00B8D1'
      }
    },
  },
  darkMode: "class",
  plugins: [nextui()],
}

