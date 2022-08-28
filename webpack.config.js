const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'index.js',
    libraryTarget: 'commonjs2'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, 'src'),
        exclude: /(node_modules|build)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
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
        // eslint-disable-next-line no-useless-escape
        test: /\.(png|jpe?g|gif)([\?]?.*)$/,
        loader: 'file-loader?name=assets/images/[name].[ext]'
      },
      {
        // eslint-disable-next-line no-useless-escape
        test: /\.(svg|woff|woff2|ttf|eot|otf)([\?]?.*)$/,
        loader: 'file-loader?name=assets/fonts/[name].[ext]'
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'eslint-loader']
      }
    ]
  },
  externals: {
    react: 'commonjs react',
    reactDOM: 'react-dom',
    i18next: 'i18next',
    'i18next-xhr-backend': 'i18next-xhr-backend',
    'react-i18next': 'react-i18next',
    axios: 'axios',
    utif: 'utif',
    'base64-arraybuffer': 'base64-arraybuffer',
    '@viamericas/viam-alert-messages': '@viamericas/viam-alert-messages'
  }
};
