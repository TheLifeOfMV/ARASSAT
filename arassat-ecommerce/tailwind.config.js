/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary-black': '#000000',
        'charcoal-dark': '#1a1a1a',
        'accent-orange': '#FF6B35',
        'hover-orange': '#ff7d4d',
        'text-white': '#ffffff',
        'text-gray': '#b0b0b0',
        'text-light-gray': '#e0e0e0',
        'card-bg': '#2a2a2a',
        'border-color': '#333333',
        'success': '#28a745',
        'warning': '#ffc107',
        'error': '#dc3545',
        'info': '#17a2b8',
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-in-out',
        'pulse': 'pulse 2s infinite',
        'spin': 'spin 1s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulse: {
          '0%': { boxShadow: '0 0 0 0 rgba(255, 107, 53, 0.7)' },
          '70%': { boxShadow: '0 0 0 10px rgba(255, 107, 53, 0)' },
          '100%': { boxShadow: '0 0 0 0 rgba(255, 107, 53, 0)' },
        },
      },
      fontFamily: {
        sans: ['Arial', 'Helvetica', 'sans-serif'],
      },
      container: {
        center: true,
        padding: '1rem',
      },
    },
  },
  plugins: [],
}; 