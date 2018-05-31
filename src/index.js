import './style.css';
import a from './a.js';
// document.getElementById('app').innerHTML = "ddddddddd的"


// --------------------------------------------------------这里实现 js 的热更新
if (module.hot) {
  // ------------如果配置路径参数了，那只是允许 相对路径的文件的热更新
  // module.hot.accept('./a.js', () => {
  //   document.getElementById('app').innerHTML = a
  // });

  //------------------ 如果没有配置路径，默认允许全部文件可以热更新
  module.hot.accept();
  document.getElementById('app').innerHTML = a
}

// ------------------------------------------------------------在前端js代码中区分生产环境和开发环境
// _DEV_ 是在webpack.config.js 中由webpack.DefinePlugin 设置的全局变量
if (_DEV_) {
  console.log('开发环境代码使用');
} else {
  console.log('正式环境代码使用');
}


/**
 * webpack 中图片路径处理
 * 1. 直接通过路径引用
 * 2. 在js中引用图片
 * 3. 在背景图中引用
 * 
 */
let oImg = new Image();
import img1 from "./1.jpg"; // 如果引入了图片就对图片进行编译打包
oImg.src = img1; // img1 是打包后的文件路径，名字随机

// oImg.src = "./1,jpg"; 如果这样直接赋值，会被webpack 认为是一个普通字符串，不进行编译，而是直接进行打包

document.body.appendChild(oImg);

