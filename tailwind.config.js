/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        display: ['Outfit', 'system-ui', 'sans-serif'],
        body: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
      },
      colors: {
        surface: {
          50: '#F7F8FC',
          100: '#EDEFF7',
          200: '#D5DAE8',
          300: '#A8B0C8',
          400: '#7B849F',
          500: '#5A627A',
          600: '#3D4458',
          700: '#252A3A',
          800: '#151824',
          900: '#0C0E18',
          950: '#07080F',
        },
        brand: {
          300: '#C4B5FD',
          400: '#A78BFA',
          500: '#8B5CF6',
          600: '#7C3AED',
          700: '#6D28D9',
        },
        neon: {
          cyan: '#22D3EE',
          blue: '#38BDF8',
          violet: '#A855F7',
          magenta: '#E879F9',
          pink: '#F472B6',
          emerald: '#34D399',
          amber: '#FBBF24',
          orange: '#FB923C',
          rose: '#FB7185',
        },
      },
      boxShadow: {
        glass: '0 8px 40px rgba(0, 0, 0, 0.35)',
        glow: '0 0 40px rgba(139, 92, 246, 0.25)',
        'glow-cyan': '0 0 32px rgba(34, 211, 238, 0.2)',
        card: '0 20px 50px rgba(0, 0, 0, 0.4)',
      },
      borderRadius: {
        '2.5xl': '1.25rem',
        '4xl': '2rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.4s ease-out both',
        'slide-up': 'slideUp 0.45s cubic-bezier(0.22, 1, 0.36, 1) both',
        'slide-in': 'slideIn 0.4s cubic-bezier(0.22, 1, 0.36, 1) both',
        'pulse-dot': 'pulseDot 1.2s ease-in-out infinite',
        float: 'float 6s ease-in-out infinite',
        shimmer: 'shimmer 2.5s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(14px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          '0%': { opacity: '0', transform: 'translateX(-10px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        pulseDot: {
          '0%, 80%, 100%': { opacity: '0.35', transform: 'scale(0.85)' },
          '40%': { opacity: '1', transform: 'scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        },
      },
      backgroundImage: {
        'page-glow':
          'radial-gradient(ellipse 70% 50% at 15% 20%, rgba(56, 189, 248, 0.16), transparent 50%), radial-gradient(ellipse 60% 45% at 85% 15%, rgba(168, 85, 247, 0.18), transparent 50%), radial-gradient(ellipse 50% 40% at 50% 100%, rgba(232, 121, 249, 0.08), transparent 50%)',
        'brand-gradient': 'linear-gradient(135deg, #38BDF8 0%, #A855F7 55%, #E879F9 100%)',
        'btn-gradient': 'linear-gradient(135deg, #7C3AED 0%, #A855F7 50%, #C026D3 100%)',
        'bar-gradient': 'linear-gradient(90deg, #38BDF8, #A855F7)',
      },
    },
  },
  plugins: [],
}
