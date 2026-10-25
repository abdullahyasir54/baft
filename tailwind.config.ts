import type { Config } from 'tailwindcss'

export default {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Baft "Paper & Marker" tokens, backed by CSS variables in globals.css
        baft: {
          neon:        '#D4E424',
          ink:         '#16121F',
          snow:        '#F6F4F7',
          paper:       'var(--paper)',
          card:        'var(--surface-card)',
          heading:     'var(--text-heading)',
          body:        'var(--text-body)',
          accent:      'var(--text-accent)',
          faint:       'var(--faint)',
          line:        'var(--border)',
          'line-soft': 'var(--border-soft)',
          pink:        'var(--pink)',
          'pink-text': 'var(--pink-text)',
          'sky-text':  'var(--sky-text)',
          'lav-text':  'var(--lav-text)',
          'peach-text':'var(--peach-text)',
        },
      },
      fontFamily: {
        archivo: ['Archivo', 'Helvetica Neue', 'sans-serif'],
        plex:    ['IBM Plex Mono', 'ui-monospace', 'monospace'],
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%':      { opacity: '0.2' },
        },
      },
      animation: {
        blink: 'blink 1.6s infinite',
      },
      transitionTimingFunction: {
        signature: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
} satisfies Config
