module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'class',
  theme: {
    colors: {
      'dark-elements': 'hsl(209, 23%, 22%)',
      'light-elements': 'hsl(0, 0%, 100%)',
      'dark-background': 'hsl(207, 26%, 17%)',
      'light-background': 'hsl(0, 0%, 98%)',
      'light-text': 'hsl(200, 15%, 8%)',
      'dark-text': 'hsl(0, 0%, 100%)',
      'light-input': 'hsl(0, 0%, 52%)',
      'dark-input': 'hsl(209, 23%, 22%)'
    },
    fontWeight: {
      'normal': 300,
      'semibold': 600,
      'extra-bold': 800
    },
    extend: {
      screens: {
        sm: '375px',
        lg: '1440px'
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: [require('@tailwindcss/aspect-ratio')]
}
