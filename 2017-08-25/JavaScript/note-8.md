# Ajax

## XMLHttpRequest
ajax是一种技术方案，但并不是一种新技术。它依赖的是现有的CSS/HTML/Javascript，而其中最核心的依赖是浏览器提供的XMLHttpRequest对象，是这个对象使得浏览器可以发出HTTP请求与接收HTTP响应。所以我用一句话来总结两者的关系：我们使用XMLHttpRequest对象来发送一个Ajax请求。

### 创建XMLHttpRequest对象

与之前众多DOM操作一样,创建XHR对象也具有兼容性问题:IE6及之前的版本使用ActiveXObject,IE7之后及其它浏览器使用XMLHttpRequest.

不但IE6及其之前的版本将XHR作为一个ActiveXObject运行,而且还存在众多版本:一开始是Microsoft.XMLHTTP 之后变成Msxml2.XMLHTTP及更新版的Msxml3.XMLHTTP.

```js
//考虑兼容性问题
function XHR() {
	var xhr;
	try {
		xhr = new XMLHttpRequest();}
	catch(e) {
		var IEXHRVers =["Msxml3.XMLHTTP","Msxml2.XMLHTTP","Microsoft.XMLHTTP"];
		for (var i=0,len=IEXHRVers.length;i< len;i++) {
			try {xhr = new ActiveXObject(IEXHRVers[i]);}
			catch(e) {continue;}
		}
	}
	return xhr;
}

var xhr = XHR()
// open: create a new http request
// the first param is get/post
// the second param is url
// the third param is true, which means asynchronous， while false means synchronous
xhr.open("get", "test.txt", true)
// bind callback function
xhr.onreadystatechange = callback
// send request
// the param is null in get
xhr.send(null)

function callback() {
	//在这里面没有使用this.readyState这是因为IE下面ActiveXObject的特殊性
	if (xhr.readyState == 4) {//readyState表示文档加载进度,4表示完毕
			alert(xhr.reponseText);//responseText属性用来取得返回的文本
		}
}
```

```js
var xhr = XHR();
xhr.open("post","test.php",true);
xhr.onreadystatechange = function () {
	if (xhr.readyState==4 && xhr.status ==200) {
		alert(xhr.responseText);
	}
};
//比GET请求多了一步
xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
//另外,数据是通过send方法发送的
xhr.send("qs=true&userName=abc&pwd=123456");
```

### XHR对象参考

1. readyState属性 返回当前请求的状态:

	- 0 (未初始化) 对象已建立，但是尚未初始化（尚未调用open方法）
	- 1 (初始化) 对象已建立，尚未调用send方法
	- 2 (发送数据) send方法已调用，但是当前的状态及http头未知
	- 3 (数据传送中) 已接收部分数据，因为响应及http头不全，这时通过responseBody和responseText获取部分数据会出现错误
	- 4 (完成) 数据接收完毕,此时可以通过通过responseBody和responseText获取完整的回应数据

2. status 返回当前请求的http状态码

	我们只需要知道状态为200的时候(OK)才读取response就行了!

3. responseText与responseXML

	responseText 将响应信息作为字符串返回 . XMLHTTP尝试将响应信息解码为Unicode字符串，XMLHTTP默认将响应数据的编码定为UTF-8，如果服务器返回的数据带BOM(byte-order mark)，XMLHTTP可以解码任何UCS-2 (big or little endian)或者UCS-4 数据。注意，如果服务器返回的是xml文档，此属性并不处理xml文档中的编码声明。你需要使用responseXML来处理。
	
	responseXML 将响应信息格式化为Xml Document对象并返回 . 如果响应数据不是有效的XML文档，此属性本身不返回XMLDOMParseError，可以通过处理过的DOMDocument对象获取错误信息。


[关于XMLHttpRequest的理解及用法](https://segmentfault.com/a/1190000004322487)