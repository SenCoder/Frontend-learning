# BOM & DOM

## 什么是BOM ?
- BOM是Browser Object Model的缩写，简称浏览器对象模型
- BOM提供了独立于内容而与浏览器窗口进行交互的对象
- 由于BOM主要用于管理窗口与窗口之间的通讯，因此其核心对象是window

## BOM 能做什么？
BOM提供了一些访问窗口对象的一些方法，我们可以用它来移动窗口位置，改变窗口大小，打开新窗口和关闭窗口，弹出对话框，进行导航以及获取客户的一些信息如：浏览器品牌版本，屏幕分辨率。但BOM最强大的功能是它提供了一个访问HTML页面的一入口——document对象，以使得我们可以通过这个入口来使用DOM的强大功能！

window对象是BOM的顶层(核心)对象，所有对象都是通过它延伸出来的，也可以称为window的子对象。由于window是顶层对象，因此调用它的子对象时可以不显示的指明window对象，例如下面两行代码是一样的：

```js
document.write("BOM");
window.document.write("BOM");
```
JavaScript中的任何一个全局函数或变量都是window的属性。
window 子对象：

- document 对象
- frames 对象
- history 对象
- location 对象
- navigator 对象
- screen 对象

### Navigator 对象的属性

- appCodeName	返回浏览器的代码名
- appName	返回浏览器的名称
- appVersion	返回浏览器的平台和版本信息
- browserLanguage	返回当前浏览器的语言
- cookieEnabled	返回指明浏览器中是否启用 cookie 的布尔值
- cpuClass	返回浏览器系统的 CPU 等级
- onLine	返回指明系统是否处于脱机模式的布尔值
- platform	返回运行浏览器的操作系统平台
- systemLanguage	返回 OS 使用的默认语言
- userAgent	返回由客户机发送服务器的 user-agent 头部的值
- userLanguage	返回 OS 的自然语言设置


## 什么是DOM？
Document Object Model (DOM)是HTML和XML文档的编程接口。它提供了上述文档的一种结构化表示，同时也定义了一种通过程序来改变文档结构，风格，以及内容的方式。DOM用一组结构化的节点以及对象来表示文档。本质上就是将网页和脚本语言以及编程语言连接起来。DOM被设计为独立于任何特定的编程语言，通过协调一致的API以确保这种文档的结构化表现形式是有效的。


## DOM与BOM的关系
DOM与BOM的关系：BOM包含DOM。
document对象是BOM的一部分，同时也是HTML DOM的HTMLDocument对象的一种表现形式，反过来说，它也是XML DOM Document对象。JavaScript中的大部分处理DOM的过程都利用document对象，所以我们访问文档需要使用BOM提供的这个入口。


## DOM基础

### 标签获取

- `document.getElementById()`
- `document.getElementsByTagName()`
- `document.getElementsByName()`
- `getAttribute()`
- `setAttribute()`
- `removeAttribute()`

```html
<div id="box" title="Title" class="Box" style="color:red">Test Div</div>
```

```js
// onload 事件触发
windown.onload = function() {
	var box = document.getElementById('idvalue')
	alert(box)
	alert(box.innerHTML)
	//获取通用属性的值
	alert(box.id)
	alert(box.title)
	alert(box.style)
	alert(box.color)
	alert(box.className)
	//自定义属性按此方法获取会有兼容性问题
	//使用getAttribute()获取
}
```

```js
windown.onload = function() {
	var box = document.getElementById('idvalue')
	box.innerHTML = "<strong> Test Div </strong>"
}
```

```html
<ul>
	<li>1</li>
	<li>2</li>
	<li>3</li>
<ul>
```

```js
windown.onload = function() {
	var li = document.getElementsByTagName("li")
	alert(li.length)
	alert(document.getElementsByTagName("*").length)
}
```

### 节点解析

```js
windown.onload = function() {
	var box = document.getElementById('idvalue')
	alert(box.nodeName)		// TageName
	alert(box.nodeType)		// 节点类型：元素节点/文本节点/属性节点
	alert(box.nodeValue)	
}
```

```js
windown.onload = function() {
	var box = document.getElementById('idvalue')
	box.innerHtml = "<strong>Hello</strong>"
	box.childNodes[0].nodeValue="<strong>Hello</strong>"
}
```

```js
windown.onload = function() {
	var box = document.getElementById('idvalue')
	alert(box.childNodes[0].nodeValue)
	alert(box.firstChild.nodeValue)
	alert(box.lastChild.nodeValue)
	alert(box.ownerDocument === document)
	alert(box.ownerDocument.nodeName)
	alert(box.ownerDocument.nodeType)
	
	alert(box.parentNode)
	alert(box.firstChild.nextSibling)
	alert(box.lasttChild.previousSibling)
	
	alert(box.attributes)
	alert(box.attributes[0].nodeName)
	alert(box.attributes[0].nodeType)
	alert(box.attributes['title'].nodeValue)
}
```

```html
<div id="box">
	<p>Text 1</p>
	<p>Text 2</p>
	<p>Text 3</p>
</div>
```

```js
windown.onload = function() {
	var box = document.getElementById('box')
	alert(box.childNodes.length)	//对上面的html，由于浏览器对空白字符的处理不同，该结果在不同浏览器中会不同
}

function filterWhiteNode(nodes) {
	var ret f= [];
	for (var i = 0; i < nodes.length; i ++) {
		if (nodes[i].nodeType == 3 && /^\s+$/.test(nodes[i].nodeValue)) {
			continue;
		} else {
			ret.push(nodes[i])
		}
	}
	return ret
}

// 我们也可以通过移除空白节点的方法达到过滤空白字符的目的
```
