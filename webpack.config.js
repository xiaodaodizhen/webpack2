let path = require('path');
let webpack = require('webpack');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let ExtractTextWebpackPlugin = require("extract-text-webpack-plugin");

// 通过环境变量判断执行环境
let isDev = process.env.NODE_ENV === 'development';
module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'build.js',
    path: path.join(__dirname, 'dist')
  },

  module: {
    rules: [
      // { test: /\.css$/, use: ['style-loader', 'css-loader'] },
      // { test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader'] }

      {
        test: /\.css$/, use: new ExtractTextWebpackPlugin.extract({
          fallback: 'style-loader',// 如果css抽离功能暂时不生效，就使用fallback，生效了就可以不执行fallback
          use: [{
            loader: 'css-loder'
          }
          ]
        })
      },
      { test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader'] }
    ]
  },

  plugins: [
    // 使用这个插件注入一个全局名称,来区分是生产环境还是开发环境
    new webpack.DefinePlugin({
      _DEV_: isDev
    }),

    // 将所有的css样式抽离到index.css 文件中，备注：如果使用了css抽离功能，css-loader内置的热更新功能将会失效（原因是css抽离之后进入到了html中）。
    new ExtractTextWebpackPlugin({
      filename: './css/index.css',
      disable: isDev, // 是否生效，根据当前环境变量判断
    }),

    new HtmlWebpackPlugin({ // html 打包
      template: './src/index.html',
      hash: true,
      minify: {
        removeAttributeQuotes: true,
        collapseWhitespace: true
      }
    }),
    // 热更新--默认是刷新
    new webpack.HotModuleReplacementPlugin(),
  ],

  devServer: {
    contentBase: './dist',
    host: 'localhost',
    port: 3000,
    open: true,
    hot: true // 热更新
  },
  mode: "development"
}