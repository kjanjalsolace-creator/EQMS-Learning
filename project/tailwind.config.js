/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#e63031',
          hover: '#c42526',
          dark: '#a01f20',
          light: '#f8d7d7',
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
        },
        heading: '#1a1a2e',
        body: '#4a4a68',
        muted: '#8a8a9a',
        'bg-light': '#f5f6fa',
        'bg-section': '#f8f9fb',
        'bg-dark': '#1a1a2e',
        'bg-footer': '#15152a',
        border: '#e8e8ed',
        'border-dark': '#d0d0d8',
        success: '#16a34a',
        'success-light': '#dcfce7',
        warning: '#f59e0b',
        'warning-light': '#fef3c7',
        error: '#dc2626',
        'error-light': '#fee2e2',
        info: '#2563eb',
        'info-light': '#dbeafe',
      },
      fontFamily: {
        heading: ['Poppins', 'Helvetica Neue', 'Arial', 'sans-serif'],
        body: ['Open Sans', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      fontSize: {
        h1: ['2.75rem', { lineHeight: '1.2', letterSpacing: '-0.02em' }],
        h2: ['2.25rem', { lineHeight: '1.2', letterSpacing: '-0.02em' }],
        h3: ['1.75rem', { lineHeight: '1.2' }],
        h4: ['1.375rem', { lineHeight: '1.2' }],
        h5: ['1.125rem', { lineHeight: '1.2' }],
        h6: ['1rem', { lineHeight: '1.2' }],
      },
      borderRadius: {
        button: '0.5rem',
        card: '0.75rem',
        input: '0.5rem',
        badge: '0.375rem',
      },
      boxShadow: {
        card: '0 2px 8px rgba(0, 0, 0, 0.06), 0 1px 2px rgba(0, 0, 0, 0.04)',
        'card-hover': '0 8px 24px rgba(0, 0, 0, 0.1), 0 2px 8px rgba(0, 0, 0, 0.06)',
        header: '0 2px 8px rgba(0, 0, 0, 0.08)',
      },
      spacing: {
        section: '5rem',
        'section-sm': '3rem',
      },
      maxWidth: {
        container: '1200px',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'slide-in-right': 'slideInRight 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
};
