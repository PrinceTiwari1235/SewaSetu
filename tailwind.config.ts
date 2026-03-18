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
        crimson: {
          50:  '#fff0f0',
          100: '#ffdddd',
          200: '#ffc0c0',
          300: '#ff9494',
          400: '#ff5757',
          500: '#ff2323',
          600: '#e60000',
          700: '#c10000',
          800: '#9f0000',
          900: '#840000',
          950: '#490000',
        },
        slate: {
          950: '#0a0f1e',
        },
        mountain: {
          50:  '#f4f6fb',
          100: '#e8ecf6',
          200: '#ccd6ea',
          300: '#a0b4d6',
          400: '#6d8dbe',
          500: '#4b6fa8',
          600: '#39578e',
          700: '#2f4674',
          800: '#293c61',
          900: '#263452',
          950: '#111827',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        body:    ['var(--font-body)', 'system-ui', 'sans-serif'],
        nepali: ['var(--font-nepali)', 'sans-serif'],
      },
      backgroundImage: {
        'mountain-gradient': 'linear-gradient(135deg, #0a0f1e 0%, #1a2744 50%, #2d1515 100%)',
        'hero-gradient':     'linear-gradient(160deg, #0f172a 0%, #1e1b4b 40%, #4c0519 100%)',
        'card-shimmer':      'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.04) 50%, transparent 60%)',
      },
      animation: {
        'fade-up':      'fadeUp 0.6s ease forwards',
        'fade-in':      'fadeIn 0.5s ease forwards',
        'slide-right':  'slideRight 0.5s ease forwards',
        'float':        'float 6s ease-in-out infinite',
        'shimmer':      'shimmer 2.5s infinite',
        'pulse-slow':   'pulse 4s cubic-bezier(0.4,0,0.6,1) infinite',
        'spin-slow':    'spin 20s linear infinite',
      },
      keyframes: {
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideRight: {
          '0%':   { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-20px)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition:  '200% 0' },
        },
      },
      boxShadow: {
        'glow-red':    '0 0 40px rgba(220, 38, 38, 0.3)',
        'glow-blue':   '0 0 40px rgba(59, 130, 246, 0.2)',
        'card':        '0 4px 24px rgba(0,0,0,0.4)',
        'card-hover':  '0 8px 40px rgba(0,0,0,0.6)',
      },
    },
  },
  plugins: [],
}
