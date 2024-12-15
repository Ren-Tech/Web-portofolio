module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        fadeInLeftPartial: {
          "0%": { transform: "translateX(-33%)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        fadeInRightPartial: {
          "0%": { transform: "translateX(33%)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        fadeInBottomPartial: {
          "0%": { transform: "translateY(33%)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
      animation: {
        fadeInLeftPartial: "fadeInLeftPartial 1s ease-out",
        fadeInRightPartial: "fadeInRightPartial 1s ease-out",
        fadeInBottomPartial: "fadeInBottomPartial 1s ease-out",
      },
    },
  },
  plugins: [],
};
