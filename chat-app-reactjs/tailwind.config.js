// tailwind.config.js
module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        primary: '#32b0c1',
        primary_bold: '#00879a',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
