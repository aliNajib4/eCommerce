/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "0.5rem",
    },
    extend: {
      gridTemplateColumns: {
        "auto-fit-250": "repeat(4, minmax(300px, 1fr))",
      },
      animation: {
        pumping: "pumping 300ms ease-out ",
      },
      keyframes: {
        pumping: {
          "0%": {
            transform: "scale(1)",
          },
          "20%": {
            transform: "scale(0.8)",
          },
          "30%": {
            transform: "scale(1.1)",
          },
          "50%": {
            transform: "scale(1.7)",
          },
          "100%": {
            transform: "scale(1)",
          },
        },
      },
    },
  },
  plugins: [],
};
