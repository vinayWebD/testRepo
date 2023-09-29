/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./src/**/*.{js,jsx}', './public/index.html'],
  content: [],
  theme: {
    colors: {
      darkblue: '#003355',
      white: '#ffffff',
      whitelight: '#f2f2f2',
      whitelighter: 'rgba(242, 242, 242, 0.2)',
      greylight: '#A1A0A0',
      greymedium: '#D1D1D1',
      greydark: '#333333',
      red: '#FF0000',
      hyperlink: '#70BAFF',
      bluebg: '#F8FCFF',
      blueprimary: '#0071BC',
      gradientfrom: '#04436e',
      gradientto: '#023456',
      lightbluebg: '#E9F6FF',
    },
    extend: {
      fontFamily: {
        sans: ['Montserrat', 'sans'], // Use Montserrat as the default sans-serif font
      },
      borderColor: {
        customGray: 'rgba(161, 160, 160, 0.50)',
      },
    },
  },
  plugins: [],
};
