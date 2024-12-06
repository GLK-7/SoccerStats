/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
  variants: {
    extend: {
      scrollbar: ['rounded'], // ativa estilização extra da scrollbar
    },
  },
};
