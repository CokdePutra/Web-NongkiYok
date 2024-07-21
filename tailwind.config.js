/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "button-gray": "#1E1E1E",
        "hover-button": "#D9D9D9",
        "navbar-color": "#222831",
        "color-primary": "#393E46",
        "color-yellow": "#FCBC36",
      },
    },
  },
  plugins: [],
};
