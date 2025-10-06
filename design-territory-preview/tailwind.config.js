/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary (Skylevel Red - DSC Confidence)
        primary: {
          50: '#F5F2E8',
          100: '#EDB8C8',
          200: '#D97B92',
          300: '#C43D56',
          400: '#B8344A',
          500: '#A52A52',
          600: '#8B1538',
          700: '#751229',
          800: '#651024',
          900: '#4A0B1A',
          950: '#2D0510',
        },
        // Accent (Excellence Gold - Stoic Premium)
        accent: {
          50: '#FCF3CF',
          100: '#F9E79F',
          200: '#F4D03F',
          300: '#E6C547',
          400: '#D4AF37',
          500: '#B8860B',
          600: '#8B6F00',
          700: '#6B4000',
          800: '#4A2D0A',
          900: '#2D1B06',
        },
        // Neutral (Dark Theme - Stoic Calm)
        neutral: {
          50: '#F5F2E8',
          100: '#E5DDD0',
          200: '#C4B59A',
          300: '#A68A8A',
          400: '#8B6B6B',
          500: '#6B4A4A',
          600: '#4A3333',
          700: '#3D2525',
          800: '#2B1B1B',
          900: '#1A0F0F',
          950: '#0A0606',
        },
        // Professional Blue (Cron Efficiency)
        professional: {
          50: '#EFF6FF',
          100: '#DBEAFE',
          200: '#BFDBFE',
          300: '#93C5FD',
          400: '#60A5FA',
          500: '#3B82F6',
          600: '#2563EB',
          700: '#1D4ED8',
          800: '#1E40AF',
          900: '#1E3A8A',
        },
        // Score Colors (Confidence-based)
        score: {
          excellent: '#D4AF37',
          good: '#10B981',
          moderate: '#F59E0B',
          low: '#EF4444',
        },
        // Status Colors (Cron Professional)
        status: {
          active: '#10B981',
          pending: '#F59E0B',
          rejected: '#EF4444',
          interview: '#3B82F6',
          hired: '#D4AF37',
        }
      },
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          'sans-serif',
        ],
        mono: [
          '"SF Mono"',
          '"Monaco"',
          '"Inconsolata"',
          '"Roboto Mono"',
          'monospace',
        ],
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}

