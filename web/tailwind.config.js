import tailwindcss from '@tailwindcss/postcss'

// tailwind.config.js
module.exports = {
  darkMode: "class",
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [
      tailwindcss()
  ],
};
  