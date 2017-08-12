# Template

前后端分离的Restful架构大行其道，传统的模板技术已经不多见了。实际上只是渲染的地方由后端转移到了前端，模板的渲染技术本质上还是一样的。简而言之就是字串模板和数据的结合。

golang提供了两个标准库用来处理模板text/template和html/template。我们使用html/template格式化html字符。这两个包在api级别是一致的，只是"html/template"提供了对html文本的更好支持，比如会将一些html中的关键符号（类似'<', '>'之类的）做些转义处理再输出。

## 模板引擎

模板引擎很多，Python的jinja，nodejs的jade等都很好。所谓模板引擎，则将模板和数据进行渲染的输出格式化后的字符程序。


## 后端

```go
t := template.Must(template.New("hello").Parse("hello world"))
t.Execute(os.Stdout, nil)

//此处，template.Must(*template.Template, error )会在Parse返回err不为nil时，调用panic。
//Must的引入，就是为了中和Golang将error置于函数返回值这种做法带来的缺点。
//有了Must，我们可以将两句inline在一起。
template.Must(template.New("hello").Parse("hello world")).Execute(os.Stdout, nil)
```

### 模板命名
前文已经提及，模板对象是有名字的，可以在创建模板对象的时候显示命名，也可以让go自动命名。可是涉及到嵌套模板的时候，该如何命名模板呢，毕竟模板文件有好几个？

go提供了ExecuteTemplate方法，用于执行指定名字的模板。

```go
func templateHandler(w http.ResponseWriter, r *http.Request){
    t, _ :=template.ParseFiles("templates/layout.html")
    fmt.Println(t.Name())
    t.ExecuteTemplate(w, "layout", "Hello world")
}
```
layout.html文件：

```html
{{ define "layout" }}

<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <title>layout</title>
  </head>
  <body>
    <h3>This is layout</h3>
    template data: {{ . }}
  </body>
</html>

{{ end }}
```

总而言之，创建模板对象后和加载多个模板文件，执行模板文件的时候需要指定base模板（layout），在base模板中可以include其他命名的模板。无论点.，define，template这些花括号包裹的东西都是go的action（模板标签）

### Action

action是go模板中用于动态执行一些逻辑和展示数据的形式。大致分为下面几种：

1. 条件语句
2. 迭代
3. 封装
4. 引用

### 参数，变量和管道
模板的参数可以是go中的基本数据类型，如字串，数字，布尔值，数组切片或者一个结构体。在模板中设置变量可以使用 $variable := value。我们在range迭代的过程使用了设置变量的方式。

go还有一个特性就是模板的管道函数，熟悉django和jinja的开发者应该很熟悉这种手法。通过定义函数过滤器，实现模板的一些简单格式化处理。并且通过管道哲学，这样的处理方式可以连成一起。

```html
{{ p1 | p2 | p3 }}
{{ 12.3456 | printf "%.2f" }}
```

### 函数
既然管道符可以成为模板中的过滤器，那么除了内建的函数，能够自定义函数可以扩展模板的功能。幸好go的模板提供了自定义模板函数的功能。

想要创建一个定义函数只需要两步：

- 创建一个FuncMap类型的map，key是模板函数的名字，value是其函数的定义。
- 将FuncMap注入到模板中。

```go
func templateHandler(w http.ResponseWriter, r *http.Request) {
    funcMap := template.FuncMap{"fdate": formDate}
    t := template.New("layout").Funcs(funcMap)
    t = template.Must(t.ParseFiles("templates/layout.html", "templates/index.html"))
    t.ExecuteTemplate(w, "layout", time.Now())
}
```