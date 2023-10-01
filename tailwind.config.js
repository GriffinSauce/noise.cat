const colors = require('tailwindcss/colors');

module.exports = {
  content: ['./src/**/*.tsx', './src/**/*.css'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Source Sans 3', 'sans-serif'],
        display: ['Poppins', 'sans-serif'],
      },
    },
  },
  variants: {
    backgroundColor: [
      'responsive',
      'first',
      'last',
      'even',
      'odd',
      'hover',
      'focus',
    ],
    borderRadius: ['responsive', 'first', 'last'],
  },
  plugins: [],
};
