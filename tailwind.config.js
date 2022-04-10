module.exports = {
  content: ["./{pages,components}/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontSize: {
      xs: "calc(0.3vw + 12px)",
      sm: "calc(0.35vw + 14px)",
      md: "calc(1.25vw + 12px)",
      lg: "calc(1.5vw + 18px)",
      xl: "calc(1.5vw + 18px)",
      "2xl": "calc(2.7vw + 20px)",
      "3xl": "calc(3.5vw + 20px)",
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
        "accent-1": "#FAFAFA",
        "accent-2": "#EAEAEA",
        "accent-7": "#333",
        success: "#0070f3",
        cyan: "#79FFE1",
      },
      spacing: {
        "h-w": "calc(4.16666667vw - 30px)",
        "h-logo": "calc(4.16666667vw - 40px)",
        28: "7rem",
      },
      letterSpacing: {
        tighter: "-.04em",
      },
      lineHeight: {
        tight: 1.2,
      },

      boxShadow: {
        small: "0 5px 10px rgba(0, 0, 0, 0.12)",
        medium: "0 8px 30px rgba(0, 0, 0, 0.12)",
      },
      fontFamily: {
        My: ["My"],
        "G-light": ["Gilroy-light"],
        "G-bold": ["Gilroy-bold"],
        "Noto-Sans": ["Noto Sans JP"],
      },
      gridTemplateRows: {
        // Simple 8 row grid
        8: "repeat(8, minmax(0, 1fr))",
      },
    },
  },
  plugins: [require("tailwindcss-fluid-spacing")],
};
