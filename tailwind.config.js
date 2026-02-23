/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#c41e3a',
        'primary-dark': '#8b1428',
        secondary: '#1a1a1a',
        accent: '#d4af37',
      },
      fontFamily: {
        display: ['Bebas Neue', 'cursive'],
        heading: ['Oswald', 'sans-serif'],
        body: ['Work Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
