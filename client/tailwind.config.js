module.exports = {
  content: ['./{src,public}/**/*.{tsx,html}'],
  important: true,

  theme: {
    screens: {
      sm: '0px',
      // => @media (min-width: 500px) { ... }

      md: '550px',
      // => @media (min-width: 768px) { ... }

      lg: '750px',
      // => @media (min-width: 1024px) { ... }

      xl: '1112px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },
    extend: {
      colors: {
        bg: 'linear-gradient(90deg, rgba(2,10,17,1) 0%, rgba(0,24,48,1) 100%)',
      },
    },
  },
  plugins: [],
};
