const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require("copy-webpack-plugin");
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const webpack = require('webpack')
const chalk = require('chalk');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const {
  CleanWebpackPlugin
} = require('clean-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: path.join(__dirname, '../src/index.js'),
  output: {
    filename: '[name].js',
    path: path.join(__dirname, '../dist/'),
  },
  devServer: {
    host: '0.0.0.0',
    contentBase: path.join(__dirname, '../dist'),
    compress: true,
    port: 8000
  },
  cache: {
    type: "filesystem"
  },
  module: {
    rules: [{
        test: /\.scss$/,
        use: [ MiniCssExtractPlugin.loader, 
          {
            loader: 'css-loader',
            options: {
              modules: true
            }
          },
          'sass-loader']
      },
      {
        test: /\.jsx?$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react',
            ],
            plugins: [
              "@babel/plugin-proposal-class-properties",
            ]
          }
        }
      },
      {
        test: /\.(png|jpg|gif)$/i,
        use: [{
          loader: 'url-loader'
        }, ],
      }
    ]
  },

  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      '@': path.resolve(__dirname, '../public/'),
    }
  },

  plugins: [
    new MiniCssExtractPlugin(),

    new HtmlWebpackPlugin({
      template: path.join(__dirname, '../public/index.html')
    }),

    new CleanWebpackPlugin(),

    new CopyPlugin({
      patterns: [
        { 
          from: path.join(__dirname, '../public/favicon.ico'), 
          to: path.join(__dirname, '../dist/'), 
        },
      ],
    }),

    new ProgressBarPlugin({
      complete: '=',
      format: ' build [:bar] ' + chalk.green.bold(':percent') + ' (:elapsed seconds)',
      clear: false
    }),

    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require(path.join(__dirname, '../vendor.manifest.json')),
      name: "./my-dll.js",
      scope: "xyz",
      sourceType: "commonjs2"
     }),
  ]
}