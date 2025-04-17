/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#f8f9fa",
        foreground: "#1e293b",
        border: "#e2e8f0",
      },
    },
  },
  plugins: [require('@tailwindcss/typography'),],
}; 