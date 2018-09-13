const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const commonPaths = require('./common-paths');

const config = {
  entry: {
    vendor: ['semantic-ui-react']
  },
  output: {
    path: commonPaths.outputPath,
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: 'assets/img/[name].[hash].[ext]'
            }
          },
          {
            loader: 'image-webpack-loader'
          }
        ]
      }
    ]
  },
  resolve: {
    modules: [commonPaths.appEntry, 'node_modules'],
    alias: {
      assets: commonPaths.assets,
      components: commonPaths.components,
      layouts: commonPaths.layouts,
      pages: commonPaths.pages,
      enhancers: commonPaths.enhancers,
      state: commonPaths.state,
      routes: commonPaths.routes
    }
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          chunks: 'initial',
          test: 'vendor',
          name: 'vendor',
          enforce: true
        }
      }
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'public/index.html',
      favicon: 'public/favicon.ico'
    })
  ]
};

module.exports = config;
