
React 技术栈

- React 主体
- WebPack: 自动化构建工具
- Flex: 布局
- React-Route: 路由
- Redux: View层
- Mocha: 测试
- Istanbu1

React 特点

- 组件
- 状态

JSX

- 增强JS语法:可以在js中写html
- babel: 有且仅有一个父元素；支持模板字符串；


```jsx
class Comp extends React.Component {

	constructor(...args) {
		// 必须调用 super() 方法
		super(...args)
		// 初始化可以直接赋值
		this.state = {value: ''}
	}
	
	fn(ev) {
		this.setState({
			value: ev.target.Value
		})
	}

	render() {
		return <div>
			<input type="text" onChange={this.fn.bind(this)} />
		</div>
	}
}

window.onload=function() {
	ReactDOM.render(
		<Comp />,
		document.getElementById("app")
	)
}
```