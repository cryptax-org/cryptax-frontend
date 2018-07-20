const webpack = require('webpack');
const dotenv = require('dotenv');

const commonPaths = require('./common-paths');

const result = dotenv.config()
const port = process.env.PORT || 3000;

const config = {
  mode: 'development',
  entry: {
    app: `${commonPaths.appEntry}/index.js`
  },
  output: {
    filename: '[name].[hash].js'
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.(scss|css)$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              camelCase: true,
              sourceMap: true
            }
          },
          {
            loader: "sass-loader"
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'INVOKE_URL_HOST': JSON.stringify(process.env.INVOKE_URL_HOST),
        'INVOKE_URL': JSON.stringify(process.env.INVOKE_URL),
        'API_KEY': JSON.stringify(process.env.API_KEY),
        'BASE_URL': JSON.stringify(process.env.BASE_URL)
      }
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    host: 'localhost',
    port: port,
    historyApiFallback: true,
    hot: true,
    open: true
  }
};

module.exports = config;
