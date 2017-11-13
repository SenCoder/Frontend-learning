# Node.js 代码组织与模块

## 模块

为了让Node.js的文件可以相互调用，Node.js提供了一个简单的模块系统。

在 Node.js 中，创建一个模块非常简单，如下我们创建一个 main.js 文件，代码如下:

```js
var hello = require('./hello');
hello.world();
```

以上实例中，代码 require('./hello') 引入了当前目录下的 hello.js 文件（./ 为当前目录，node.js 默认后缀为 js）。
Node.js 提供了 exports 和 require 两个对象，其中 exports 是模块公开的接口，require 用于从外部获取一个模块的接口，即所获取模块的 exports 对象。

```js
exports.world = function() {
  console.log('Hello World');
}
```

在以上示例中，hello.js 通过 exports 对象把 world 作为模块的访问接口，在 main.js 中通过 require('./hello') 加载这个模块，然后就可以直接访 问 hello.js 中 exports 对象的成员函数了。


```js
//hello.js 
function Hello() { 
    var name; 
    this.setName = function(thyName) { 
        name = thyName; 
    }; 
    this.sayHello = function() { 
        console.log('Hello ' + name); 
    }; 
}; 
module.exports = Hello;
```

在 main.js 中进行调用:

```js
//main.js 
var Hello = require('./hello'); 
hello = new Hello(); 
hello.setName('BYVoid'); 
hello.sayHello(); 
```

## require 函数

在nodejs中，模块大概可以分为核心模块和文件模块。

核心模块是被编译成二进制代码，引用的时候只需require表示符即可，如(require('net'))。

文件模块，则是指js文件、json文件或者是.node文件。在引用文件模块的时候后要加上文件的路径：/.../.../xxx.js表示绝对路径、./xxx.js表示相对路径(同一文件夹下的xxx.js)，../表示上一级目录。如果既不加/.../、../又不加./的话，则该模块要么是核心模块，要么是从一个node_modules文件夹加载。

对于加载模块时既没指出./ ../ /.../时，加载模块的搜索路径。如果'/home/ry/projects/foo.js' 中的文件调用了 require('bar.js') ，node将在下面的位置进行搜索：

```js
/home/ry/projects/node_modules/bar.js
/home/ry/node_modules/bar.js
/home/node_modules/bar.js
/node_modules/bar.js
```