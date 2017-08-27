# React 

## Let's start

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Hello React!</title>
    <script src="https://cdn.bootcss.com/react/15.4.2/react.min.js"></script>
    <script src="https://cdn.bootcss.com/react/15.4.2/react-dom.min.js"></script>
    <script src="https://cdn.bootcss.com/babel-standalone/6.22.1/babel.min.js"></script>
  </head>
  <body>
    <div id="example"></div>
    <script type="text/babel">
      ReactDOM.render(
        <h1>Hello, world!</h1>,
        document.getElementById('example')
      );
    </script>
  </body>
</html>
```

实例中我们引入了三个库： react.min.js 、react-dom.min.js 和 babel.min.js：

- react.min.js - React 的核心库
- react-dom.min.js - 提供与 DOM 相关的功能
- babel.min.js - Babel 可以将 ES6 代码转为 ES5 代码，这样我们就能在目前不支持 ES6 浏览器上执行 React 代码。Babel 内嵌了对 JSX 的支持。通过将 Babel 和 babel-sublime 包（package）一同使用可以让源码的语法渲染上升到一个全新的水平。

注意：
如果我们需要使用 JSX，则 `<script>` 标签的 type 属性需要设置为 `text/babel`。

## JSX 基本语法

```js
// 我们可以在 JSX 中使用 JavaScript 表达式。表达式写在花括号 {} 中
ReactDOM.render(
    <div>
      <h1>{1+1}</h1>
    </div>
    ,
    document.getElementById('example')
);
```

```js
// 在 JSX 中不能使用 if else 语句，但可以使用 conditional (三元运算) 表达式来替代
var myStyle = {
    fontSize: 100,
    color: '#FF0000'
};
ReactDOM.render(
    <h1 style = {myStyle}>style style</h1>,
    document.getElementById('example')
);
```

```js
// React 推荐使用内联样式。我们可以使用 camelCase 语法来设置内联样式. React 会在指定元素数字后自动添加 px 
ReactDOM.render(
    <div>
      <h1>{i == 1 ? 'True!' : 'False'}</h1>
    </div>
    ,
    document.getElementById('example')
);

```

```js
// 注释需要写在花括号中
ReactDOM.render(
    <div>
    <h1>Comment</h1>
    {/*注释...*/}
     </div>,
    document.getElementById('example')
);
```

```js
// JSX 允许在模板中插入数组，数组会自动展开所有成员
var arr = [
  <h1>The first one.</h1>,
  <h2>The second one.</h2>,
];
ReactDOM.render(
  <div>{arr}</div>,
  document.getElementById('example')
);
```

React 可以渲染 HTML 标签 (strings) 或 React 组件 (classes)。
要渲染 HTML 标签，只需在 JSX 里使用小写字母的标签名;要渲染 React 组件，只需创建一个大写字母开头的本地变量。

```js
// 渲染 HTML 标签
var myDivElement = <div className="foo" />;
ReactDOM.render(myDivElement, document.getElementById('example'));

// 渲染 React 组件
var MyComponent = React.createClass({/*...*/});
var myElement = <MyComponent someProperty={true} />;
ReactDOM.render(myElement, document.getElementById('example'));
```

## React 组件

原生 HTML 元素名以小写字母开头，而自定义的 React 类名以大写字母开头，比如 HelloMessage 不能写成 helloMessage。除此之外还需要注意组件类只能包含一个顶层标签，否则也会报错。

```js
// React.createClass 方法用于生成一个组件类 HelloMessage。
// <HelloMessage /> 实例化组件类并输出信息。
var HelloMessage = React.createClass({
  render: function() {
    return <h1>Hello World！</h1>;
  }
});
 
ReactDOM.render(
  <HelloMessage />,
  document.getElementById('example')
);


// 如果需要向组件传递参数，可以使用 this.props 对象
var HelloMessage = React.createClass({
  render: function() {
    return <h1>Hello {this.props.name}</h1>;
  }
});
 
ReactDOM.render(
  <HelloMessage name="Runoob" />
  {"/*这句代码有点类似构造函数*/"}
  ,
  document.getElementById('example')
);
```

注意，在添加属性时， class 属性需要写成 className ，for 属性需要写成 htmlFor ，这是因为 class 和 for 是 JavaScript 的保留字。

可以创建多个组件来合成一个组件，即把组件的不同功能点进行分离。

```js
// 例中 WebSite 组件使用了 Name 和 Link 组件来输出对应的信息，也就是说 WebSite 拥有 Name 和 Link 的实例。
// 类似于面向对象中的组合
var WebSite = React.createClass({
  render: function() {
    return (
      <div>
        <Name name={this.props.name} />
        <Link site={this.props.site} />
      </div>
    );
  }
});
 
var Name = React.createClass({
  render: function() {
    return (
      <h1>{this.props.name}</h1>
    );
  }
});
 
var Link = React.createClass({
  render: function() {
    return (
      <a href={this.props.site}>
        {this.props.site}
      </a>
    );
  }
});
 
ReactDOM.render(
  <WebSite name="菜鸟教程" site=" http://www.runoob.com" />,
  document.getElementById('example')
);
```

React 把组件看成是一个状态机（State Machines）。通过与用户的交互，实现不同状态，然后渲染 UI，让用户界面和数据保持一致。
React 里，只需更新组件的 state，然后根据新的 state 重新渲染用户界面（不要操作 DOM）。
getInitialState 方法用于定义初始状态，也就是一个对象，这个对象可以通过 this.state 属性读取。当用户点击组件，导致状态变化，this.setState 方法就修改状态值，每次修改以后，自动调用 this.render 方法，再次渲染组件。

```js
var LikeButton = React.createClass({
	getInitialState: function() {
		return {liked: false};
	},
	handleClick: function(event) {
		this.setState({liked: !this.state.liked});
	},
	render: function() {
		var text = this.state.liked ? '喜欢' : '不喜欢';
		return (
			<p onClick={this.handleClick}>
			你<b>{text}</b>我。点我切换状态。
			</p>
		);
	}
});

ReactDOM.render(
    <LikeButton />,
    document.getElementById('example')
);
```

state 和 props 主要的区别在于 props 是不可变的，而 state 可以根据与用户交互来改变。这就是为什么有些容器组件需要定义 state 来更新和修改数据。 而子组件只能通过 props 来传递数据。


```js
var HelloMessage = React.createClass({
	// 通过 getDefaultProps() 方法为 props 设置默认值
	getDefaultProps: function() {
		return {
			name: 'Runoob'
		};
  	},
  	render: function() {
  		return <h1>Hello {this.props.name}</h1>;
  	}
});
 
ReactDOM.render(
	<HelloMessage />,
	document.getElementById('example')
);
```


```js
var WebSite = React.createClass({
  getInitialState: function() {
    return {
      name: "菜鸟教程",
      site: "http://www.runoob.com"
    };
  },
 
  render: function() {
    return (
      <div>
        <Name name={this.state.name} />
        <Link site={this.state.site} />
      </div>
    );
  }
});
 
var Name = React.createClass({
  render: function() {
    return (
      <h1>{this.props.name}</h1>
    );
  }
});
 
var Link = React.createClass({
  render: function() {
    return (
      <a href={this.props.site}>
        {this.props.site}
      </a>
    );
  }
});
 
ReactDOM.render(
  <WebSite />,
  document.getElementById('example')
);
```

Props 验证使用 propTypes，它可以保证我们的应用组件被正确使用，React.PropTypes 提供很多验证器 (validator) 来验证传入数据是否有效。当向 props 传入无效数据时，JavaScript 控制台会抛出警告。 

```js
var title = "The title is must";
// var title = 123;
var MyTitle = React.createClass({
	propTypes: {
		title: React.PropTypes.string.isRequired,
	},
	render: function() {
		return <h1> {this.props.title} </h1>;
	}
});

ReactDOM.render(
    <MyTitle title={title} />,
    document.getElementById('example')
);
```


```js
React.createClass({
  propTypes: {
    // 可以声明 prop 为指定的 JS 基本数据类型，默认情况，这些数据是可选的
    optionalArray: React.PropTypes.array,
    optionalBool: React.PropTypes.bool,
    optionalFunc: React.PropTypes.func,
    optionalNumber: React.PropTypes.number,
    optionalObject: React.PropTypes.object,
    optionalString: React.PropTypes.string,
 
    // 可以被渲染的对象 numbers, strings, elements 或 array
    optionalNode: React.PropTypes.node,
 
    //  React 元素
    optionalElement: React.PropTypes.element,
 
    // 用 JS 的 instanceof 操作符声明 prop 为类的实例。
    optionalMessage: React.PropTypes.instanceOf(Message),
 
    // 用 enum 来限制 prop 只接受指定的值。
    optionalEnum: React.PropTypes.oneOf(['News', 'Photos']),
 
    // 可以是多个对象类型中的一个
    optionalUnion: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number,
      React.PropTypes.instanceOf(Message)
    ]),
 
    // 指定类型组成的数组
    optionalArrayOf: React.PropTypes.arrayOf(React.PropTypes.number),
 
    // 指定类型的属性构成的对象
    optionalObjectOf: React.PropTypes.objectOf(React.PropTypes.number),
 
    // 特定 shape 参数的对象
    optionalObjectWithShape: React.PropTypes.shape({
      color: React.PropTypes.string,
      fontSize: React.PropTypes.number
    }),
 
    // 任意类型加上 `isRequired` 来使 prop 不可空。
    requiredFunc: React.PropTypes.func.isRequired,
 
    // 不可空的任意类型
    requiredAny: React.PropTypes.any.isRequired,
 
    // 自定义验证器。如果验证失败需要返回一个 Error 对象。不要直接使用 `console.warn` 或抛异常，因为这样 `oneOfType` 会失效。
    customProp: function(props, propName, componentName) {
      if (!/matchme/.test(props[propName])) {
        return new Error('Validation failed!');
      }
    }
  },
  /* ... */
});
```