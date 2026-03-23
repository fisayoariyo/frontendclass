/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Bricolage Grotesque"', 'sans-serif'],
        body: ['"DM Sans"', 'sans-serif'],
      },
      colors: {
        neutral: {
          900: 'hsl(243, 96%, 9%)',
          800: 'hsl(243, 27%, 20%)',
          700: 'hsl(243, 23%, 24%)',
          600: 'hsl(243, 23%, 30%)',
          300: 'hsl(240, 6%, 70%)',
          200: 'hsl(250, 6%, 84%)',
          0:   'hsl(0, 0%, 100%)',
        },
        orange:  { 500: 'hsl(28, 100%, 52%)' },
        blue:    { 500: 'hsl(233, 67%, 56%)', 700: 'hsl(248, 70%, 36%)' },
      },
      animation: {
        'drift-1':  'drift 18s ease-in-out infinite',
        'drift-2':  'drift 22s ease-in-out infinite',
        'drift-3':  'drift 15s ease-in-out infinite',
        'fade-up':  'fadeUp 0.5s ease both',
        'drop-in':  'dropIn 0.2s ease',
        'spin-fast':'spin 0.8s linear infinite',
      },
      keyframes: {
        drift: {
          '0%,100%': { transform: 'translate(0,0) scale(1)' },
          '33%':     { transform: 'translate(40px,-30px) scale(1.05)' },
          '66%':     { transform: 'translate(-20px,40px) scale(0.97)' },
        },
        fadeUp: {
          from: { opacity: 0, transform: 'translateY(20px)' },
          to:   { opacity: 1, transform: 'translateY(0)' },
        },
        dropIn: {
          from: { opacity: 0, transform: 'translateY(-8px)' },
          to:   { opacity: 1, transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}

