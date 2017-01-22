const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');

const parts = require('./webpack.parts');

const PATHS = {
  app: path.join(__dirname, 'app'),
  build: path.join(__dirname, 'build')
};

const common = merge(
  {
    entry: {
      app: PATHS.app
    },
    output: {
      path: PATHS.build,
      filename: '[name].js'
    }
  },
  parts.lintCSS(PATHS.app),
  parts.lintJavaScript(PATHS.app)
);

module.exports = function(env) {
  if (env === 'production') {
    return merge(
      common,
      {
        output: {
          chunkFilename: 'scripts/[chunkhash].js',
          filename: '[name].[chunkhash].js',
          // Tweak this to match your GitHub project name
          publicPath: '/inside-frontend/'
        },
        plugins: [
          new webpack.HashedModuleIdsPlugin()
        ]
      },
      parts.setFreeVariable(
        'process.env.NODE_ENV',
        'production'
      ),
      parts.loadJavaScript(PATHS.app),
      parts.minifyJavaScript('source-map'),
      parts.clean(PATHS.build),
      parts.generateSourcemaps('source-map'),
      parts.extractCSS(PATHS.app),
      parts.loadImage(PATHS.app),
      parts.loadHandlebars(PATHS.app)
    );
  }

  return merge(
    common,
    {
      // Disable performance hints during development
      performance: {
        hints: false
      },
      plugins: [
        new webpack.NamedModulesPlugin()
      ]
    },
    parts.generateSourcemaps('eval-source-map'),
    parts.loadCSS(),
    parts.loadImage(PATHS.app),
    parts.loadHandlebars(PATHS.app),
    parts.devServer({
      // Customize host/port here if needed
      host: process.env.HOST,
      port: 3000
    })
  );
};
