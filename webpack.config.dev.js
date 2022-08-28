/* eslint-disable no-useless-escape */
const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, 'dev-test/App.js'),
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'index.js'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.s[ac]ss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.(png|jpe?g|gif)([\?]?.*)$/,
        loader: 'file-loader?name=assets/images/[name].[ext]'
      },
      {
        test: /\.(svg|woff|woff2|ttf|eot|otf)([\?]?.*)$/,
        loader: 'file-loader?name=assets/fonts/[name].[ext]'
      }
    ]
  },
  node: {
    fs: 'empty'
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'dev-test'),
    port: 9001
  }
};
