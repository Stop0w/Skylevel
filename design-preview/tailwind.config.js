/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fef7f7',
          100: '#fdeeed',
          200: '#f8d2d8',
          300: '#f1a7b5',
          400: '#e67c8e',
          500: '#d6425e',
          600: '#8B1538',  // Skylevel primary brand color
          700: '#6b1029',
          800: '#4a0a1c',
          900: '#2a050e',
          950: '#0A0606',  // Skylevel background
        },
        accent: {
          50: '#fefbf8',
          100: '#fdf6e7',
          200: '#f7edc7',
          300: '#f2e1a6',
          400: '#D4AF37',  // Skylevel accent gold
          500: '#c49a1c',
          600: '#a67c15',
          700: '#865e13',
          800: '#684510',
          900: '#4a2e0a',
          950: '#2c1a06',
        },
        neutral: {
          50: '#F5F2E8',  // Skylevel text primary
          100: '#ede8d9',
          200: '#dcc6a4',
          300: '#c4a47c',
          400: '#a38866',
          500: '#836d53',
          600: '#665542',
          700: '#4c4031',
          800: '#332c21',
          900: '#1a1810',
          950: '#0a0606',  // Skylevel background
        }
      }
    },
  },
  plugins: [],
}

