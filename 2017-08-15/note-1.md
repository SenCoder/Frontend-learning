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