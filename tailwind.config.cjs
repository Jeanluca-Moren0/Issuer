/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/flowbite/**/*.js',
  ],
  theme: {
    fontFamily: {
      openSans: ['Open Sans', 'sans-serif'],
    },
    extend: {},
  },
  plugins: [require('flowbite/plugin')],
};
