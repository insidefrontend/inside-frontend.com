module.exports = {
  plugins: [
    require('postcss-discard-duplicates'),
    require('postcss-import'),
    require('autoprefixer'),
    require('cssnano')
  ]
};
