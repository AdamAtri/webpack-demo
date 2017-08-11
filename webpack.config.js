const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const PATHS = {
  app: path.join(__dirname, 'app'),
  build: path.join(__dirname, 'build'),
};

module.exports = {
  // Entries have to resolve to files. However, webpack defaults to the
  //  Node convention of resolving to "index.js" if a directory is supplied
  entry: {
    app: PATHS.app,
  },
  output: {
    path: PATHS.build,
    // [name] is a token that will be replaced when the string is evaluated.
    filename: '[name].js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Adam\'s Webpack Demo',
    }),
  ],
};
