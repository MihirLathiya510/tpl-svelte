/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        accent: {
          500: '#ff6b00',
          600: '#e65d00',
          700: '#cc5200'
        },
        light: {
          bg: '#ffffff',
          text: '#111827'
        },
        dark: {
          bg: '#111827',
          text: '#f3f4f6'
        }
      },
      fontFamily: {
        mono: ['"Space Mono"', 'monospace']
      },
      animation: {
        'fade-in': 'fadeIn 1s ease-in',
        'slide-up': 'slideUp 0.5s ease-out',
        'type': 'type 3.5s steps(40, end)'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        type: {
          '0%': { width: '0' },
          '100%': { width: '100%' }
        }
      }
    }
  },
  plugins: []
}