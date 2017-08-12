const path = require('path');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

const parts = require('./webpack.parts');

const PATHS = {
  app: path.join(__dirname, 'app'),
  build: path.join(__dirname, 'build'),
};

const commonConfig = merge([
  {
    // Entries have to resolve to files. However, webpack defaults to the
    //  Node convention of resolving to "index.js" if a directory is supplied
    entry: {
      app: PATHS.app,
    },
    output: {
      path: PATHS.build,
      // [name] is a token that will be replaced when the string is evaluated.
      filename: '[name].js',
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: 'Adam\'s Webpack Demo',
      }),
      new FriendlyErrorsWebpackPlugin({
        compilationSuccessInfo: {
          messages: ['Your application is running on http://localhost:8080.', 'You lucky dog.'],
          notes: ['Some additional notes... for what ? SUCCESS.'],
        },

      }),
    ],
  },
  // include linting by default
  parts.lintJavaScript({ include: PATHS.app }),
  // include style bundling by default
  parts.loadCSS(),
]);

const productionConfig = merge([ ]);

const developmentConfig = merge([
  parts.devServer({
    // Parse host and port from env to allow customization
    // If using Docker, Vagrant, or Cloud9 set
    //  `host: options.host || '0.0.0.0'`
    // as 0.0.0.0 is available to all network devices
    host: process.env.HOST || '0.0.0.0',
    port: process.env.PORT,
  }),
]);

module.exports = (env) => {
  console.log(env);
  if (env.target === 'production') return merge(commonConfig, productionConfig);
  return merge(commonConfig, developmentConfig);
};
