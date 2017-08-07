# MicroService
This is a learning project for frontend and backend development. The project is aimed to build a http server, including frontend(html/css/js) and backend(golang). No tools like tomcat or nginx will be used in this project, thus, the golang will implement all the work.

The function is similar to an opms system. Firstly, we hope to build a mini system, including basic CRUD operation, user management and permission management; Secondly, the Event Sourcing pattern is going to be used in our database; Thirdly, we will build an frontend system similar to the beego case `http://opms.demo.milu365.cn/`. Finally, we need to expand this system to tango, which is the framework used in our project.

## backend

### Gorilla
A powerful URL router and dispatcher for golang.

#### Basic usage

```go
# router of gorilla tool chain
r := mux.NewRouter()
r.HandleFunc("/products/{key}", ProductHandler)
r.HandleFunc("/articles/{category}/", ArticlesCategoryHandler)
r.HandleFunc("/articles/{category}/{id:[0-9]+}", ArticleHandler)

func ArticlesCategoryHandler(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	w.WriteHeader(http.StatusOK)
	fmt.Fprintf(w, "Category: %v\n", vars["category"])
}
```

#### Router
```go
r := mux.NewRouter()
s := r.Host("www.example.com").Subrouter()
s.HandleFunc("/products/", ProductsHandler)
s.HandleFunc("/products/{key}", ProductHandler)
s.HandleFunc("/articles/{category}/{id:[0-9]+}", ArticleHandler)

```

## frontend

### Basic Demo

The basic jquery framework is used in our micro service. 

```html
<html>
<head>
    <link rel="stylesheet" href="css/main.css" />
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js">
    </script>
    <script src="js/hello.js"> </script>
</head>

<body>
    Sampple Go Applications! <br/>
    <div>
        <p class="greeting-id"> The ID is </p>
        <p class="greeting-content"> The content is </p>
    </div>
</body>
</html>
```
- the above code `<script src="js/hello.js"> </script>` cannot be changed to `<script src="js/hello.js" />`

```js
// ajax refresh local data
$(document).ready(function() {
    $.ajax({
        url:"/api/test"
    }).then(function(data) {
        $('.greeting-id').append(data.id);
        $('.greeting-content').append(data.content);
    })
})
```


## Question
- How to solve the problem that the router '/api/test' doesn't work ?
- How to resolve parameters in gorilla ?
- How to build a more complicated html page and jump to another fone ?