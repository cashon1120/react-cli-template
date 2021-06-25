const path = require('path');
const webpack = require('webpack');
const DllPlugin = require('webpack/lib/DllPlugin');
module.exports = {
  mode: 'production',
  entry: {
    vendor: ['react', 'react-dom']
  },
  output: {
    path: path.resolve(__dirname, '../dist/lib/'),
    filename: '[name].js',
    library: '[name]'
  },
  devtool: 'inline-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new DllPlugin({
      context: __dirname,
      name: '[name]',
      path: path.join(__dirname, '../[name].manifest.json'), //描述生成的manifest文件
    }),
  ]
}