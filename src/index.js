import './style.css';
import a from './a.js';
document.getElementById('app').innerHTML = "ddddddddd的"


// --------------------------------------------------------这里实现 js 的热更新
if (module.hot) {
  // ------------如果配置路径参数了，那只是允许 相对路径的文件的热更新
  // module.hot.accept('./a.js', () => {
  //   document.getElementById('app').innerHTML = a
  // });

  //------------------ 如果没有配置路径，默认允许全部文件可以热更新
  module.hot.accept();
}

// ------------------------------------------------------------在前端js代码中区分生产环境和开发环境
// _DEV_ 是在webpack.config.js 中由webpack.DefinePlugin 设置的全局变量
if (_DEV_) {
  console.log('开发环境代码使用');
} else {
  console.log('正式环境代码使用');
}