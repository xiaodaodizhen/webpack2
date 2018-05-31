## 依赖
- 标识项目依赖 --save 上线开发都需要
-  --save-dev    ||   -D  开发依赖，只有开发用 

## 安装
```
npm install webpack webpack-cli -D   (开发用)

 ```

 ## webpack 可以0配置，功能很弱。
- 打包工具，优化代码，模块化

## npx 的使用，必须要求node8.5+
- npx 文件名     就会到node-modules 里找到然后执行，如果没有安装会自动安装

## 配置执行的文件，在package.json 中
-   "scripts": {
         "build": "webpack"
    },


## 插件:实现html 打包功能，可以通过一个模板实现打包出引用好js路径的html
- npm install html-webpack-plugin -D

## 插件 ： 清空打包以输出文件

- npm install clean-webpack-plugin -D

## 插件 ： 配置开发服务器

- npm install webpack-dev-server -D

## 插件 ：抽离样式文件，抽离出以link标签形式引入到文件, (不能使用当前版本，当前版本只是支持webpack3)
- npm install extract-text-webpack-plugin@next -D

## loader 加载器

- npm install style-loader css-loader -D
- npm install less less-loader node-sass sass-loader -D


- npm install postcss-loader autoprefixer -D   给css加前缀，达到各个浏览器内核兼容

- npm install purifycss-webpack purify-css glob -D    glob 插件是为了全局搜索   purifycss-webpack 删除多余未用的css less样式，依赖于purify-css插件


## 将所有的css样式抽离到index.css 文件中，
- 问题：如果使用了css抽离功能，css-loader内置的热更新功能将会失效
- 原因：是css抽离之后进入到了html中
- 解决方案：开发的时候不进行css样式抽离，打包上线的时候在进行抽离。 
   - 1. 安装环境变量插件  npm install cross-env -D
   - 2. 在package.json 文件中配置
        ```
        "scripts": {
            "build": "cross-env NODE_ENV=development webpack",
            "dev": "cross-env NODE_ENV=production webpack-dev-server"
        },

        ```
        cross-env NODE_ENV=development (设置环境变量) webpack(执行命令)

## 在前端js代码中区分开发环境和生产环境
- webpack 自带此功能
    ```
        new webpack.DefinePlugin({
        _DEV_: isDev
        })
        
    ```

## webpack 中处理图片的问题（在项目中处理图片的方式）
- 1. 直接通过路径引用
- 2. 在js中引用图片
- 3. 在背景图中引用

  - 方案： npm install file-loader url-loader -D   // 解决js 中的图片引用，打包后图片引用---看js文件备注

          npm install html-withimg-loader -D    // 解决html中的图片引用，打包后图片引用   打包前: <img src="./1.jpg">   打包后: src="images/9568043d528780847a30ba5d2d33948b.jpg"

## webpack 中编译react \ js 文件

- npm install babel-core babel-loader babel-preset-env babel-preset-stage-0 babel-preset-react -D

## 拷贝静态文件

- npm install copy-webpack-plugin -D

## 
- npm install bootstrap