module.exports = {
  important: true,
  content: ['./{src,public}/**/*.{tsx,html}'],
  theme: {
    extend: {
      colors: {
        bg: 'linear-gradient(90deg, rgba(2,10,17,1) 0%, rgba(0,24,48,1) 100%)',
      },
      animation: {
        fade: 'fade 1s',
      },
      keyframes: {
        fade: {
          '0%, 100%': 'opacity: 1;',
          '50%': 'opacity: 0;',
        },
      },
    },
  },
  plugins: [],
};
