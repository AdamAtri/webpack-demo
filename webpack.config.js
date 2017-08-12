const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

const PATHS = {
  app: path.join(__dirname, 'app'),
  build: path.join(__dirname, 'build'),
};

const commonConfig = {
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
};

const productionConfig = () => commonConfig;

const devlopmentConfig = () => {
  const config = {
    devServer: {
      // Enable history API fallback so HTML5 history based routing will work.
      historyApiFallback: true,

      // Display only errors to reduce the amount of output
      stats: 'errors-only',

      // Parse host and port from env to allow customization
      // If using Docker, Vagrant, or Cloud9 set
      //  `host: options.host || '0.0.0.0'`
      // as 0.0.0.0 is available to all network devices
      host: process.env.HOST || '0.0.0.0', // defaults to `localhost`
      port: process.env.PORT, // defaults to 8080

      // WDS provides an overlay for capturing warnings and errors
      overlay: {
        errors: true,
        warnings: true,
      },
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          enforce: 'pre',
          // Using the <eslint-loader> provides live linting while the
          //  WDS is running (`yarn start`)
          // !! before using <eslint-loader>, make sure that <eslint> is
          //  installed locally.
          loader: 'eslint-loader',
          options: { emitWarning: true, },
        },
      ],
    },
  };
  return Object.assign({}, commonConfig, config);
};

module.exports = (env) => {
  console.log(env);
  if (env.target === 'production') return productionConfig();
  return devlopmentConfig();
};
