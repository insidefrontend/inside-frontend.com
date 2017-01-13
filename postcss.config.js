module.exports = {
  plugins: {
    'postcss-discard-duplicates': {},
    autoprefixer: {
      browsers: ['> 1%', 'last 2 versions', 'chrome >= 27', 'opera >= 15', 'iOS >= 6.1', 'safari >= 6.1', 'ie >= 9', 'ff >= 14']
    }
  }
};
