webPack

据说 React.js 采用虚拟 DOM 的复杂度为 O(n), 而直接操作 DOM  的算法为 O(n^3)，所以性能极高.

## 环境

```sh
# 配置 webpack

# webpack 的 cli 环境
npm install -g webpack
# webpack 自带服务器
npm install -g webpack-dev-server

npm init

# 后台编译babel工具
npm install babel-core -D
# babel 对 ES2015 的预设
npm install babel-preset-es2015 -D
# babel 加载器
npm install babel-loader -D

# webpack 本身
# webpack 本地依赖
npm install webpack -D
# babel 服务器的本地依赖
npm install webpack-dev-server -D
# babel-react 本地预设
npm install babel-preset-react -D
# react 本身
npm install react -D
# react-dom 本身
npm install react-dom -D
# 热更新
npm install react-hot-loader -D

# 可选
npm install css-loader -D
npm install style-loader -D
```

## 配置文件

```
webpack.config.js	# babel 配置文件
.babelrc	# babel 预设文件
```

```
webpack
webpack --watch
webpack-dev-server
```