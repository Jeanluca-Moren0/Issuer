/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      openSans: ['Open Sans', 'sans-serif'],
    },
    extend: {
      colors: {
        baroqueGreen: '#323934',
      },
    },
  },
  plugins: [],
};
