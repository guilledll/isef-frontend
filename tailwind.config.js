module.exports = {
  mode: 'jit',
  purge: [
    './components/**/*.vue',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.js',
    './nuxt.config.js',
    './app.html',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      1: ['Circular', 'sans-serif'],
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
