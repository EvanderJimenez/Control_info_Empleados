/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      red: "#CD0404",
      blue: "#454fce",
      black: "#181818",
      white: "#dfe0dc",
      darkBlue: "#27374D",
      lithBlue: "#9DB2BF",
      lithGray: "#DDDDDD",
      pink: "#D14D72",
      yellow: "#E8AA42"

    },
    extend: {},
  },
  plugins: [],
};
