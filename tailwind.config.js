module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'accent-1': '#FAFAFA',
        'accent-2': '#EAEAEA',
        'accent-7': '#333',
        success: '#0070f3',
        cyan: '#79FFE1',
      },
      spacing: {
        'h-w': 'calc(4.16666667vw - 30px)',
        'h-logo': 'calc(4.16666667vw - 40px)',
        28: '7rem',
      },
      letterSpacing: {
        tighter: '-.04em',
      },
      lineHeight: {
        tight: 1.2,
      },
      fontSize: {
        '4xl': '2.2rem',
        '5xl': '3rem',
        '6xl': '2.75rem',
        '7xl': '5.5rem',
        '8xl': '6rem',
      },
      boxShadow: {
        small: '0 5px 10px rgba(0, 0, 0, 0.12)',
        medium: '0 8px 30px rgba(0, 0, 0, 0.12)',
      },
      fontFamily: {
        'G-light': ["Gilroy-light"],
        'G-bold': ["Gilroy-bold"],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
