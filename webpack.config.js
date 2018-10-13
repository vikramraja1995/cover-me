const path = require('path');
const webpack = require('webpack');

const SRC_DIR = path.join(__dirname, '/client/src');
const DIST_DIR = path.join(__dirname, '/client/dist/build');

module.exports = {
  entry: ['babel-polyfill', `${SRC_DIR}/index.jsx`],
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      output: {
        comments: false
      }
    })
  ],
  output: {
    path: DIST_DIR,
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    loaders: [
      {
        test: /\.jsx?/,
        include: SRC_DIR,
        loader: 'babel-loader',
        query: {
          presets: ['env', 'react'],
          env: {
            test: {
              presets: ['env', 'react']
            }
          }
        }
      }
    ]
  },
  stats: {
    colors: true
  },
  devtool: 'source-map'
};
