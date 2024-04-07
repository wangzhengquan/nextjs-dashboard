import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    
    extend: {
      spacing: {
        'headerh': '3rem',
      },
      gridTemplateColumns: {
        '13': 'repeat(13, minmax(0, 1fr))',
      },
      colors: {
        primary: '#303651',
        CtaBg: '#EBF3FF',
        CtaBgDarker: '#CFD5FF',
        CtaBgBorder: '#CDD2F3',
        // blue: {
        //   400: '#2589FE',
        //   500: '#0070F3',
        //   600: '#2F6FEB',
        // },
      },
      backgroundImage: {
      },
      transitionProperty: {
        width: 'width'
      }
    },
    keyframes: {
      shimmer: {
        '100%': {
          transform: 'translateX(100%)',
        },
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
export default config;
