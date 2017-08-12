//  'webpack-parts' abstracts portions of the 'webpack-config'
//  to aid in composibility

// Development Server
exports.devServer = ({ host, port } = { }) => ({
  devServer: {
    // Enable history API fallback so HTML5 history based routing will work.
    historyApiFallback: true,

    // Display only errors to reduce the amount of output
    stats: 'errors-only',

    host, // defaults to `localhost`
    port, // defaults to 8080

    // WDS provides an overlay for capturing warnings and errors
    overlay: {
      errors: true,
      warnings: true,
    },
  },
});

//  Linting by ESLint
exports.lintJavaScript = ({ include, exclude, options }) => ({
  module: {
    rules: [
      {
        test: /\.js$/,
        include,
        exclude,
        enforce: 'pre',
        // Using the <eslint-loader> provides live linting while the
        //  WDS is running (`yarn start`)
        // !! before using <eslint-loader>, make sure that <eslint> is
        //  installed locally.
        loader: 'eslint-loader',
        options: options || { emitWarning: true, },
      },
    ],
  },
});

//  Style bundling
exports.loadCSS = ({ include, exclude } = { }) => ({
  module: {
    rules: [
      {
        test: /\.css$/,
        include,
        exclude,
        // Loaders are transformations that are applied to source files, and
        //  return the new source. They can be chained together like a Unix pipe.
        //  They evaluate from *right to left*.
        use: [ 'style-loader', 'css-loader' ], // read: styleLoader(cssLoader(input));
      },
    ],
  },
});
