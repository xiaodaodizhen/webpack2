import './style.css';
import a from './a.js';
document.getElementById('app').innerHTML = "ddddddddd的"

if (module.hot) {
  // 这里实现 js 的热更新

  // ------------如果配置路径参数了，那只是允许 相对路径的文件的热更新
  // module.hot.accept('./a.js', () => {
  //   document.getElementById('app').innerHTML = a
  // });

  //------------------ 如果没有配置路径，默认允许全部文件可以热更新
  module.hot.accept();


}