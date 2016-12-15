var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: ['whatwg-fetch', './src/index.tsx',],
  output: {
    fileName: 'bundle.js',
    path: __dirname + '/dist',
    publicPath: '/dist/'
  },
  plugins: [
    new CopyWebpackPlugin([
        { from: 'static' }
    ])
  ],
  devtool: 'source-map',
  resolve: {
    extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js']
  },
  module: {
    loaders: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader'
      }
    ],
    preLoaders: [
      {
        test: /\.js$/,
        loader: 'source-map-loader'
      }
    ]
  }
};