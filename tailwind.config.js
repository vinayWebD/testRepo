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
      lightblue: '#DEF2FF',
      lightbluebg: '#E9F6FF',
      deleteRed: '#E83E39',
      iconBackground: '#0081CC0D',
    },
    extend: {
      fontFamily: {
        sans: ['Montserrat', 'sans'], // Use Montserrat as the default sans-serif font
      },
      boxShadow: {
        card: '0px 0px 2px 0px rgba(40, 41, 61, 0.14)',
      },
      borderColor: {
        customGray: 'rgba(161, 160, 160, 0.50)',
      },
      height: {
        screenHeight: 'cal(100vh - 300px)',
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        '@keyframes scaleBounce': {
          '0%, 100%': { transform: 'scale(1)', opacity: 1 },
          '50%': { transform: 'scale(1.2)', opacity: 0.2 },
        },
        '.scale-bounce': {
          animationTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
          animationDuration: '270ms',
          animationName: 'scaleBounce',
        },
      };
      addUtilities(newUtilities, ['responsive', 'hover']);
    },
  ],
};
