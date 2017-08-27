# React component

## React 组件 API

- 设置状态：setState
- 替换状态：replaceState
- 设置属性：setProps
- 替换属性：replaceProps
- 强制更新：forceUpdate
- 获取DOM节点：findDOMNode
- 判断组件挂载状态：isMounted

### setState & replaceState

setState是React事件处理函数中和请求回调函数中触发UI更新的主要方法。
不能在组件内部通过this.state修改状态，因为该状态会在调用setState()后被替换。
setState()并不会立即改变this.state，而是创建一个即将处理的state。setState()并不一定是同步的，为了提升性能React会批量执行state和DOM渲染。
setState()总是会触发一次组件重绘，除非在shouldComponentUpdate()中实现了一些条件渲染逻辑。

```js
// nextState，将要设置的新状态，该状态会和当前的state合并
// callback，可选参数，回调函数。该函数会在setState设置成功，且组件重新渲染后调用。
setState(object nextState[, function callback])
replaceState(object nextState[, function callback])
```

### setProps & replaceProps

设置组件属性，并重新渲染组件。
props相当于组件的数据流，它总是会从父组件向下传递至所有的子组件中。

当和一个外部的JavaScript应用集成时，我们可能会需要向组件传递数据或通知React.render()组件需要重新渲染，可以使用setProps()。
更新组件，我可以在节点上再次调用React.render()，也可以通过setProps()方法改变组件属性，触发组件重新渲染。

```js
// nextProps，将要设置的新属性，该状态会和当前的props合并
// callback，可选参数，回调函数。该函数会在setProps设置成功，且组件重新渲染后调用。
setProps(object nextProps[, function callback])
replaceProps(object nextProps[, function callback])
```

### forceUpdate

forceUpdate()方法会使组件调用自身的render()方法重新渲染组件，组件的子组件也会调用自己的render()。但是，组件重新渲染时，依然会读取this.props和this.state，如果状态没有改变，那么React只会更新DOM。
forceUpdate()方法适用于this.props和this.state之外的组件重绘（如：修改了this.state后），通过该方法通知React需要调用render()
一般来说，应该尽量避免使用forceUpdate()，而仅从this.props和this.state中读取状态并由React触发render()调用。

```js
// callback，可选参数，回调函数。该函数会在组件render()方法调用后调用。
forceUpdate([function callback])
```

### 获取 DOM 节点：findDOMNode

```js
// 返回值：DOM元素DOMElement
DOMElement findDOMNode()
```


### 判断组件挂载状态：isMounted

```js
// 返回值：true或false，表示组件是否已挂载到DOM中
bool isMounted()
```

## React 组件生命周期

组件的生命周期可分成三个状态：

- Mounting：已插入真实 DOM
- Updating：正在被重新渲染
- Unmounting：已移出真实 DOM

生命周期方法：

- componentWillMount 在渲染前调用,在客户端也在服务端。
- componentDidMount 在第一次渲染后调用，只在客户端。之后组件已经生成了对应的DOM结构，可以通过this.getDOMNode()来进行访问。 如果你想和其他JavaScript框架一起使用，可以在这个方法中调用setTimeout, setInterval或者发送AJAX请求等操作(防止异部操作阻塞UI)。
- componentWillReceiveProps 在组件接收到一个新的prop时被调用。这个方法在初始化render时不会被调用。
- shouldComponentUpdate 返回一个布尔值。在组件接收到新的props或者state时被调用。在初始化时或者使用forceUpdate时不被调用。 
可以在你确认不需要更新组件时使用。
- componentWillUpdate在组件接收到新的props或者state但还没有render时被调用。在初始化时不会被调用。
- componentDidUpdate 在组件完成更新后立即调用。在初始化时不会被调用。
- componentWillUnmount在组件从 DOM 中移除的时候立刻被调用。

```jsx
class Clock extends React.Component {
    constructor(...args) {
        // 必须调用 super() 方法
        super(...args)
        // 初始化 state 可以直接赋值
        this.state = {h:0, m:0, s:0};

        var _this = this;
        setInterval(function() {
            _this.tick()
        }, 1000)
        // this.tick()
    }

    tick() {
        var oDate = new Date()
        this.setState({
            h:oDate.getHours(),
            m:oDate.getMinutes(),
            s:oDate.getSeconds()
        })
    }

    componentDidMount() {
        this.tick()
    }
   
    render() {
        return <div>
            <span> {this.state.h} </span>
            <span> {this.state.m} </span>
            <span> {this.state.s} </span>
        </div>
    }
}

window.onload=function() {
    var oDiv = document.getElementById("app")
    ReactDOM.render(
        <Clock />,
        oDiv
    )
}
```

## React ajax
React 组件的数据可以通过 componentDidMount 方法中的 Ajax 来获取，当从服务端获取数据库可以将数据存储在 state 中，再用 this.setState 方法重新渲染 UI。
当使用异步加载数据时，在组件卸载前使用 componentWillUnmount 来取消未完成的请求。

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>React 实例</title>
    <script src="https://cdn.bootcss.com/react/15.4.2/react.min.js"></script>
	<script src="https://cdn.bootcss.com/react/15.4.2/react-dom.min.js"></script>
	<script src="https://cdn.bootcss.com/babel-standalone/6.22.1/babel.min.js"></script>
    <script src="https://cdn.bootcss.com/jquery/2.1.4/jquery.min.js"></script>
  </head>
 <body>
    <div id="example"></div>
    <script type="text/babel">
      var UserGist = React.createClass({
        getInitialState: function() {
          return {
            username: '',
            lastGistUrl: ''
          };
        },

        componentDidMount: function() {
          this.serverRequest = $.get(this.props.source, function (result) {
            var lastGist = result[0];
            this.setState({
              username: lastGist.owner.login,
              lastGistUrl: lastGist.html_url
            });
          }.bind(this));
        },

        componentWillUnmount: function() {
          this.serverRequest.abort();
        },

        render: function() {
          return (
            <div>
              {this.state.username} 用户最新的 Gist 共享地址：
              <a href={this.state.lastGistUrl}>{this.state.lastGistUrl}</a>
            </div>
          );
        }
      });

      ReactDOM.render(
        <UserGist source="https://api.github.com/users/octocat/gists" />,
        document.getElementById('example')
      );
    </script>
  </body>
</html>
```

### React 表单与事件

```js
// 染出一个值为 Hello Runoob! 的 input 元素，并通过 onChange 事件响应更新用户输入的值。
var HelloMessage = React.createClass({
  getInitialState: function() {
    return {value: 'Hello Runoob!'};
  },
  handleChange: function(event) {
    this.setState({value: event.target.value});
  },
  render: function() {
    var value = this.state.value;
    return <div>
            <input type="text" value={value} onChange={this.handleChange} /> 
            <h4>{value}</h4>
           </div>;
  }
});
ReactDOM.render(
  <HelloMessage />,
  document.getElementById('example')
);
```

```js
// 子组件上使用表单
var Content = React.createClass({
  render: function() {
    return  <div>
            <input type="text" value={this.props.myDataProp} onChange={this.props.updateStateProp} /> 
            <h4>{this.props.myDataProp}</h4>
            </div>;
  }
});
var HelloMessage = React.createClass({
  getInitialState: function() {
    return {value: 'Hello Runoob!'};
  },
  handleChange: function(event) {
    this.setState({value: event.target.value});
  },
  render: function() {
    var value = this.state.value;
    return <div>
            <Content myDataProp = {value} 
              updateStateProp = {this.handleChange}></Content>
           </div>;
  }
});
ReactDOM.render(
  <HelloMessage />,
  document.getElementById('example')
);
```

当你需要从子组件中更新父组件的 state 时，你需要在父组件通过创建事件句柄 (handleChange) ，并作为 prop (updateStateProp) 传递到你的子组件上。

```js
var Content = React.createClass({
  render: function() {
    return  <div>
              <button onClick = {this.props.updateStateProp}>点我</button>
              <h4>{this.props.myDataProp}</h4>
           </div>
  }
});
var HelloMessage = React.createClass({
  getInitialState: function() {
    return {value: 'Hello Runoob!'};
  },
  handleChange: function(event) {
    this.setState({value: '菜鸟教程'})
  },
  render: function() {
    var value = this.state.value;
    return <div>
            <Content myDataProp = {value} 
              updateStateProp = {this.handleChange}></Content>
           </div>;
  }
});
ReactDOM.render(
  <HelloMessage />,
  document.getElementById('example')
);

```

### React Refs
React 支持一种非常特殊的属性 Ref ，你可以用来绑定到 render() 输出的任何组件上。
这个特殊的属性允许你引用 render() 返回的相应的支撑实例（ backing instance ）。这样就可以确保在任何时间总是拿到正确的实例。

```js
var MyComponent = React.createClass({
  handleClick: function() {
    // 使用原生的 DOM API 获取焦点
    this.refs.myInput.focus();
  },
  render: function() {
    //  当组件插入到 DOM 后，ref 属性添加一个组件的引用于到 this.refs
    return (
      <div>
        <input type="text" ref="myInput" />
        <input
          type="button"
          value="点我输入框获取焦点"
          onClick={this.handleClick}
        />
      </div>
    );
  }
});
 
ReactDOM.render(
  <MyComponent />,
  document.getElementById('example')
);
```