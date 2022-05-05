module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  important: true,
  theme: {
    fontSize: {
      xs: "calc(0.3vw + 14px)",
      sm: "calc(0.4vw + 14px)",
      md: "calc(0.7vw + 18px)",
      lg: "calc(1.5vw + 18px)",
      xl: "calc(2.5vw + 18px)",
      "2xl": "calc(2.25vw + 20px)",
      "3xl": "calc(3vw + 20px)",
      "4xl": "calc(4vw + 25px)",
      "5xl": "calc(4.5vw + 25px)",
      "6xl": "calc(5vw + 30px)",
      "7xl": "calc(5.5vw + 30px)",
      "8xl": "calc(6vw + 30px)",
      "9xl": "calc(7vw + 30px)",
    },
    screens: {
      sxsp: "360px",
      sp: "480px",
      tablet: "640px",
      laptop: "1024px",
      desktop: "1280px",
    },
    extend: {
      colors: {
        primary: "#04ac4d",
        secondary: "#ead808",
      },
      spacing: {
        "h-w": "calc(4.16666667vw - 30px)",
        "h-logo": "calc(4.16666667vw - 40px)",
        28: "7rem",
      },
      fontFamily: {
        My: ["My"],
        Gilroy: ["Gilroy"],
        "Noto-Sans": ["Noto Sans JP"],
      },
      gridTemplateRows: {
        8: "repeat(8, minmax(0, 1fr))",
      },
    },
  },
  plugins: [require("tailwindcss-fluid-spacing")],
};
