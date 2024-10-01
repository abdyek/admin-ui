module.exports = {
  content: ["./src/**/*.vue", "index.html"],
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
