let path = require('path');
let webpack = require('webpack');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let ExtractTextWebpackPlugin = require("extract-text-webpack-plugin");
let CopyWebpackPlugin = require("copy-webpack-plugin");

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
        test: /\.jsx?/,// 以js 或jsx 结尾，x可以省略
        // use: [
        //   {
        //     loader: 'babel-loader',
        //     // options: {      //----------------只要使用了babel-loader 就会自动执行.babelrc的文件。所以几下options的配置放到.babelrc（json格式）文件中配置也可以，
        //     //   presets: [
        //     //     'env', // 在解析低级语法
        //     //     'stage-0',// 在解析高级语法
        //     //     'react' // 先解析react
        //     //   ]
        //     // }
        //   }
        // ],
        exclude: /node_modules/,// 排除那些文件，不用babel编译
        include: /src/,// 包含哪些文件，需要用babel编译
      },
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

  resolve: {
    //别名---把一个长路径，赋值一个新的名字
    alias: {
      'bootstrap': path.resolve(__dirname, "node_modules/bootstrap/dist/css/bootstrap.css")
    },
    // 省略后缀名 第一个元素规定为" ",默认支持省略".js", ".json"，但是增加省略后缀名时就得在把这三个加上，不然会覆盖掉
    extensions: [" ", ".js", ".json", ".css"],
    // 第三方模块查找路径，
    modules: ['node_modules', 'lib']
  },


  plugins: [
    // 拷贝静态文件 插件
    new CopyWebpackPlugin([{
      from: './src', // 文件源
      to: 'public' // 目的文件，如果没有public 会自动创建
    }]),

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