import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Aviram Brand Colors
        dark: {
          DEFAULT: '#09090B',
          lighter: '#17171C',
        },
        light: {
          DEFAULT: '#FAFAFA',
          90: 'rgba(250, 250, 250, 0.9)',
          60: 'rgba(250, 250, 250, 0.6)',
          20: 'rgba(250, 250, 250, 0.2)',
          10: 'rgba(250, 250, 250, 0.1)',
          5: 'rgba(250, 250, 250, 0.05)',
          2: 'rgba(250, 250, 250, 0.02)',
        },
        gray: {
          muted: '#A1A1AA',
          80: 'rgba(161, 161, 170, 0.8)',
          50: 'rgba(161, 161, 170, 0.5)',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      fontWeight: {
        'ultra-light': '200',
      },
      fontSize: {
        'display': ['72px', { lineHeight: '72px', fontWeight: '200' }],
        'section': ['36px', { lineHeight: '40px', fontWeight: '300' }],
        'body-lg': ['20px', { lineHeight: '28px', fontWeight: '300' }],
      },
      spacing: {
        'xs': '8px',
        's': '16px',
        'm': '32px',
        'l': '64px',
        'xl': '128px',
        'xxl': '256px',
      },
    },
  },
  plugins: [],
};

export default config;
