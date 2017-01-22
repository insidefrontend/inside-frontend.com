const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

exports.devServer = function(options) {
  return {
    devServer: {
      // Enable history API fallback so HTML5 History API based
      // routing works. This is a good default that will come
      // in handy in more complicated setups.
      historyApiFallback: true,

      // Unlike the cli flag, this doesn't set
      // HotModuleReplacementPlugin!
      // hot: true,

      // Don't refresh if hot loading fails. If you want
      // refresh behavior, set inline: true instead.
      // hotOnly: true,
      inline: true,

      // Display only errors to reduce the amount of output.
      stats: 'errors-only',

      // Parse host and port from env to allow customization.
      //
      // If you use Vagrant or Cloud9, set
      // host: options.host || '0.0.0.0';
      //
      // 0.0.0.0 is available to all network devices
      // unlike default `localhost`.
      host: options.host, // Defaults to `localhost`
      port: options.port // Defaults to 8080
    },
    // plugins: [
    //   // Enable multi-pass compilation for enhanced performance
    //   // in larger projects. Good default.
    //   new webpack.HotModuleReplacementPlugin({
    //     // Disabled as this won't work with html-webpack-template yet
    //     // multiStep: true
    //   })
    // ]
  };
};

exports.browserSync = function(options) {
  return {
    plugins: [
      new BrowserSyncPlugin({
        host: options.host, // Defaults to `localhost`
        port: options.port, // Defaults to 8080,
        proxy: 'http://localhost:3100/'
      })
    ]
  }
};

exports.loadHandlebars = function(paths) {
  return {
    module: {
      rules: [
        {
          test: /\.hbs$/,
          include: paths,
          use: [{            
            loader: 'handlebars-loader',
            options: {
              inlineRequires: '\/images\/'
            } 
          }]
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        inject: true,
        title: 'Inside Frontend',
        template: `${paths}/index.hbs`
      })
    ]
  };
};

exports.lintJavaScript = function(paths) {
  return {
    module: {
      rules: [
        {
          test: /\.js$/,
          include: paths,
          use: 'eslint-loader',
          enforce: 'pre'
        }
      ]
    }
  };
};

exports.loadCSS = function(paths) {
  return {
    module: {
      rules: [
        {
          test: /\.css$/,
          // Restrict extraction process to the given
          // paths.
          include: paths,
          use: [
            {
              loader: 'style-loader'
            },
            {
              loader: 'css-loader'
            },
            {
              loader: 'postcss-loader'
            }
          ]
        }
      ]
    }
  };
};

exports.extractCSS = function(paths) {
  return {
    module: {
      rules: [
        // Extract CSS during build
        {
          test: /\.css$/,
          // Restrict extraction process to the given
          // paths.
          include: paths,
          exclude: /node_modules/,
          loader: ExtractTextPlugin.extract({
            fallbackLoader: 'style-loader',
            loader: [
              {
                loader: 'css-loader',
                query: {
                  minimize: true
                },
              },
              'postcss-loader'
            ]
          })
        }
      ]
    },
    plugins: [
      // Output extracted CSS to a file
      new ExtractTextPlugin('[name].[contenthash].css')
    ]
  };
};

exports.lintCSS = function(paths) {
  return {
    module: {
      rules: [
        {
          test: /\.css$/,
          include: paths,
          use: 'postcss-loader',
          enforce: 'pre'
        }
      ]
    }
  };
};

exports.generateSourcemaps = function(type) {
  return {
    devtool: type
  };
};

exports.loadJavaScript = function(paths) {
  return {
    module: {
      rules: [
        {
          test: /\.js$/,
          include: paths,
          exclude: /node_modules/,
          loader: 'babel-loader',
          options: {
            // Enable caching for improved performance during
            // development.
            // It uses default OS directory by default. If you need
            // something more custom, pass a path to it.
            // I.e., { cacheDirectory: '<path>' }
            cacheDirectory: true
          }
        }
      ]
    }
  };
};

exports.loadImage = function(paths) {
  return {
    module: {
      rules: [
        {
          test: /\.(jpe?g|png|gif|svg)$/i,
          loader: 'file-loader',
          options: {
            name: '[path][name].[hash].[ext]'
          }
        }
      ]
    }
  }
}

exports.clean = function(path) {
  return {
    plugins: [
      new CleanWebpackPlugin([path])
    ]
  };
};

exports.minifyJavaScript = function(sourceMap) {
  return {
    plugins: [
      new webpack.optimize.UglifyJsPlugin({
        sourceMap: sourceMap,
        compress: {
          warnings: false
        }
      })
    ]
  };
};

exports.setFreeVariable = function(key, value) {
  const env = {};
  env[key] = JSON.stringify(value);

  return {
    plugins: [
      new webpack.DefinePlugin(env)
    ]
  };
};
