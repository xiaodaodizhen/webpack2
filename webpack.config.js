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
        test: /\.(png|jpg|gif)$/, use: [
          {
            loader: 'url-loader',
            options: { // 本配置，通过npm run build 看的清楚，因为npm run dev 是打包到内存中的，只有在浏览器能看到，
              limit: 5, // base64，不是一个真正的可以浏览的图片文件，是打包为base64形式的东西。 如果长度超过5字节，就会调用file-loader,让他打包为一个真正的图片文件
              outputPath: 'images/'  // 给打包成功的图片文件 配置打包后的存放路径，dist/images/，如果不配置，默认进入文件的output 设置的目录，本案例是 dist文件
            }
          }
        ]
      },
      {
        test: /\.html$/, use: ["html-withimg-loader"]  // 解决html 引用文件打包后的文件引用
      }
      ,
      {
        test: /\.css$/, use: ExtractTextWebpackPlugin.extract({
          fallback: 'style-loader',// 如果css抽离功能暂时不生效，就使用fallback，生效了就可以不执行fallback
          use: [{
            loader: 'css-loader',
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