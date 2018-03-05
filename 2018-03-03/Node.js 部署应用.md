# Node.js 部署应用

## 多进程
Node.js作为一个单线程的进程其运行会非常高 效:脚本的所有代码都在同一个线程里执行，并使用异步回调来提高 CPU效率。

那在多CPU的系统中会怎么处理呢?如何 获取服务器的最大能力?许多现代服务器都是强大的8-16核机器， 可以的话我们都想使用。幸好，这个问题的答案相当简单:即在每个想利用的内核上都运行node进程。我们可以选择众多策略中的某一种将请求路由到各个不同的node进程中，就像匹配需求一样。

接下来面临的问题是，系统不是只有一个，而是n个Node进程 在运行，而这些进程必须监听不同的端口(不可能要求多个用户监听 同一个端口号)。那如何才能将来自mydomain:80的流量转入这些 服务器呢?


我们尝试通过命令启动三个进程：

```bash
	node sample.js 8081
	node sample.js 8082
	node sample.js 8083
```

使用npm模块 http-proxy 来构建自己的代理服务器。package.json如下所示:

```json
{
"name":"",
"description":"",
"version":"",
"dependencies": {
	"ttp-proxy": "0.8.x"
}
}
```

接下来实现代理服务器,并运行代理服务器：

```js
var httpProxy = require("http-proxy"),
fs = require("fs");

var servers = JSON.parse(fs.readFileSync("erver_list.json")).servers;

var s = httpProxy.createServer(function(req, res, proxy) {
	var target = server.shift();			// 1. remove first server
	proxy.proxy.Request(req, res, target);// 2. re-route to that server
	servers.push(target);		// 3. Add back to end of list
});

s.listen(8080);
```

## 多服务器和会话