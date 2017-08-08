# Cookie 机制

## 原理解释

基于表单认证的规范尚未有定论，一般会使用Cookie来管理Session.
基于表单认证本身是通过服务器端的Web应用，将客户端发送过来的用户ID和密码与之前登陆过的信息做匹配来进行认证的。但是鉴于Http是无状态协议，已经认证过的用户状态无法通过协议层保存下来。即，无法实现状态管理，因此即使当该用户下一次继续访问，也无法区分他与其他的用户。于是，我们使用 cookie来管理session。


这一过程可以抽象为以下三部：

1. 客户端发送已登录信息(用户ID，密码等)
2. 服务器端发送包含 Session ID 的 cookie: Set-Cookie: sessionid=028a8c...
3. 客户端发送包含session ID 的 cookie: Cookie: sessionid=028a8c...

其中客户端的cookie操作，包括 Cookie 的存储，发送等，由浏览器自动完成。当然，为了保证 cookie 的安全性，我们希望服务端在 cookie 内加上 httponly 属性，以减轻跨站脚本攻击（XSS）造成的损失。


## 实现

这里，我们基于 gorilla 工具链实现简单的 cookie 存储, golang 标准库中已经实现了对 cookie 的支持。

```go
mx.HandleFunc("/cookies/write", cookieWriteHandler(formatter)).Methods("GET")
mx.HandleFunc("/cookies/read", cookieReadHandler(formatter)).Methods("GET")


func cookieWriteHandler(formatter *render.Render) http.HandlerFunc {
	return func(w http.ResponseWriter, req *http.Request) {
		expiration := time.Now().Add(2 * 24 * time.Hour)
		cookie := http.Cookie{Name :"sample", Value: "this is a gorilla cookie", Expires: expiration}
		http.SetCookie(w, &cookie)
		formatter.JSON(w, http.StatusOK, "cookie set")
	}
}


func cookieReadHandler(formatter *render.Render) http.HandlerFunc {
	return func(w http.ResponseWriter, req *http.Request) {
		
		cookie, err := req.Cookie("sample")
		if err == nil {
			fmt.Fprint(w, cookie.Value)
		} else {
			fmt.Fprintf(w, "read cookie fail: %v", err)
		}
		
	}
}
```

## 注意事项

1. Cookie功能需要浏览器的支持。
如果浏览器不支持Cookie（如大部分手机中的浏览器）或者把Cookie禁用了，Cookie功能就会失效。
不同的浏览器采用不同的方式保存Cookie。目前Cookie已经成为标准，所有的主流浏览器如IE、Netscape、Firefox、Opera等都支持Cookie。
2. Cookie具有不可跨域名性。很多网站都会使用Cookie。例如，Google会向客户端颁发Cookie，Baidu也会向客户端颁发Cookie。那浏览器访问Google会不会也携带上Baidu颁发的Cookie呢？或者Google能不能修改Baidu颁发的Cookie呢？答案是否定的：根据Cookie规范，浏览器访问Google只会携带Google的Cookie，而不会携带Baidu的Cookie。Google也只能操作Google的Cookie，而不能操作Baidu的Cookie。另外，虽然网站images.google.com与网站www.google.com同属于Google，但是域名不一样，二者同样不能互相操作彼此的Cookie。
3. BASE64编码：保存二进制图片。Cookie不仅可以使用ASCII字符与Unicode字符，还可以使用二进制数据。由于浏览器每次请求服务器都会携带Cookie，因此Cookie内容不宜过多，否则影响速度。Cookie的内容应该少而精。
4. Unicode编码：保存中文
5. Cookie的有效期：Cookie的maxAge决定着Cookie的有效期，单位为秒(second)。如果maxAge为负数，则表示该Cookie仅在本浏览器窗口以及本窗口打开的子窗口内有效，关闭窗口后该Cookie即失效。maxAge为负数的Cookie，为临时性Cookie，不会被持久化，不会被写到Cookie文件中。Cookie信息保存在浏览器内存中，因此关闭浏览器该Cookie就消失了。Cookie默认的maxAge值为–1。如果maxAge为0，则表示删除该Cookie。Cookie机制没有提供删除Cookie的方法，因此通过设置该Cookie即时失效实现删除Cookie的效果。失效的Cookie会被浏览器从Cookie文件或者内存中删除。
6. 域名：Cookie是不可跨域名的。域名www.google.com颁发的Cookie不会被提交到域名www.baidu.com去。这是由Cookie的隐私安全机制决定的。隐私安全机制能够禁止网站非法获取其他网站的Cookie。
正常情况下，同一个一级域名下的两个二级域名如www.helloweenvsfei.com，images.helloweenvsfei.com也不能交互使用Cookie，因为二者的域名并不严格相同。如果想所有helloweenvsfei.com名下的二级域名都可以使用该Cookie，需要设置Cookie的domain参数。
7. HTTP协议不仅是无状态的，而且是不安全的。使用HTTP协议的数据不经过任何加密就直接在网络上传播，有被截获的可能。如果不希望Cookie在HTTP等非安全协议中传输，可以设置Cookie的secure属性为true。浏览器只会在HTTPS和SSL等安全协议中传输此类Cookie。
8. 一般不把密码等重要信息保存到Cookie中。


