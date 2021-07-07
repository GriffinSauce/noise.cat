module.exports = {
  purge: {
    content: ['./src/**/*.tsx', './src/**/*.css'],
  },
  theme: {
    extend: {
      fontFamily: {
        sans: ['Source Sans Pro', 'sans-serif'],
        display: ['Poppins', 'sans-serif'],
      },
      boxShadow: {
        drawer: '0px 0px 20px rgba(0, 0, 0, 0.1)',
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
