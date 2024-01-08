/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: ['class', '[data-mode="dark"]'],

  theme: {
    darkMode: ['class', '[data-mode="dark"]'],
    extend: {
      darkMode: ['class', '[data-mode="dark"]'],
    },
  },
  plugins: [],
}

