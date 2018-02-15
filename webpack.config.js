const path = require('path');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './client/index.html',
  filename: 'index.html',
  inject: 'body'
})

module.exports = {
  entry: './client/index.js',
  output: {
    path: path.resolve('client/build'),
    filename: 'index_bundle.js',
    publicPath: '/'
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.css$/, loader: ['style-loader', 'css-loader'] },
      { test: /\.scss$/, loader: ExtractTextPlugin.extract('css-loader!sass-loader') },
      { test: /\.(png|svg|woff|woff2|eot|ttf)$/, loader: 'url-loader?limit=100000' },
      { test: /\.{png|svg|jpg|gif}$/, loader: 'file-loader'}
    ]
  },
  devServer: {
    historyApiFallback: true
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  plugins: [
    HtmlWebpackPluginConfig,
    new ExtractTextPlugin('public/styles.css', {
      allChunks: true
    })
  ],
  node: {
    fs: 'empty'
  }
}