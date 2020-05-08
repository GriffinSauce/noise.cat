module.exports = {
  purge: {
    content: ['./components/**/*.tsx', './pages/**/*.tsx', './styles/**/*.css'],
  },
  theme: {
    extend: {
      fontFamily: {
        sans: ['Source Sans Pro', 'sans-serif'],
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
