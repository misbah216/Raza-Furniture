/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        linen: '#F2E8D9',
        walnut: '#3B2A20',
        walnutDeep: '#2A1D15',
        wood: '#9C6B43',
        woodDark: '#7A4E2D',
        brass: '#B08D57',
        brassLight: '#D9B382',
        pine: '#3F4D3A',
      },
      fontFamily: {
        display: ['Fraunces', 'serif'],
        body: ['"Work Sans"', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
