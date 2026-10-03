/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        accent: '#d4a22f',
        cyber: {
          dark: '#0a0d14',
          card: 'rgba(17, 24, 39, 0.75)',
          border: 'rgba(56, 189, 248, 0.15)',
          glow: '#00f0ff',
          neon: '#38bdf8',
          purple: '#a855f7',
          emerald: '#10b981',
          amber: '#f59e0b',
          rose: '#f43f5e',
        },
        string: {
          black: '#101214',
          dark: '#16191d',
          card: '#181b20',
          surface: '#14161a',
          red: '#ff4f36',
          'red-hover': '#ff6854',
          blue: '#3687ff',
          'blue-hover': '#5297ff',
          grey: '#544d56',
          berry: '#c8c2cf',
          light: '#ded4e6',
          border: 'rgba(255, 255, 255, 0.08)',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
        telma: ['Telma', 'cursive', 'sans-serif'],
        display: ['Syne', 'sans-serif'],
        cyber: ['Space Grotesk', 'sans-serif'],
        future: ['Unbounded', 'sans-serif'],
        outfit: ['Outfit', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow-line': 'glowLine 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glowLine: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.9' },
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'cyber-grid': 'linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px)',
      }
    },
  },
  plugins: [],
}

