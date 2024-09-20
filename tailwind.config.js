module.exports = {
  content: ["./src/**/*.vue"],
  theme: {
    extend: {},
  },
  plugins: [],
  safelist: [
    {
      pattern: /bg-(slate|blue|green|red|orange|yellow)-300/,
    },
  ],
}
