const {
  merge
} = require('webpack-merge');
const devConfig = require('./webpack.dev.js')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = merge(devConfig, {
  mode: 'production',
  optimization: {
    splitChunks: {
      // 自动提取所有公共模块到单独 bundle
      chunks: 'all',
      minSize: 30000, // 引入模块大小大于该值就进行分割 默认30kb
      minChunks: 1, // 模块被引用多少次后才进行分割
      maxAsyncRequests: 5, // 同时加载模块的个数
      maxInitialRequests: 5, // 入口文件模块个数
      usedExports: true,
      cacheGroups: {
        // echarts: {
        //   name: 'echarts',
        //   test: /[\\/]node_modules[\\/]_?echarts(.*)/,
        //   priority: 50,
        //   chunks: 'all'
        // },
        // moment: {
        //   name: 'moment',
        //   test: /[\\/]node_modules[\\/]_?moment(.*)/,
        //   priority: 40,
        //   chunks: 'all'
        // },
        // commons: {
        //   test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
        //   name: 'react',
        //   chunks: 'all',
        //   priority: 0
        // },
      },
    }
  },
  plugins: [
    // new BundleAnalyzerPlugin()
  ]
})