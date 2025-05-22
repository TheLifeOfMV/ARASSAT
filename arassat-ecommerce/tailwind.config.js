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