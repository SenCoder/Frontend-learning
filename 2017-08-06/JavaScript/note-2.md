# Javascript Note-2


## 语法总结

### Js 函数声明

1. 普通的函数声明

```jsfunction box(num1, num2) {
	return num1+ num2;}
```
2. 使用变量初始化函数
```js
var box= function(num1, num2) {	return num1 + num2; 
};
```
3.使用 Function 构造函数

```jsvar box= new Function('num1', 'num2' ,'return num1 + num2');
```

第三种方式我们不推荐，因为这种语法会导致解析两次代码(第一次解析常 规 ECMAScript 代码，第二次是解析传入构造函数中的字符串 )，从而影响性能。但我们可以通 过这种语法来理解 "函数是对象，函数名是指针 "的概念。


### 作为值的函数

ECMAScript 中的函数名本身就是变量，所以函数也可以作为值来使用。也就是说，不 仅可以像传递参数一样把一个函数传递给另一个函数 ，而且可以将一个函数作为另一个函数 的结果返回。在 golang, python 等高级语言中对此都是支持的，所以这里不多讲。


### 函数内部属性

在函数内部，有两个特殊的对象: arguments 和 this。arguments 是一个类数组对象，包含着传入函数中的所有参数 ，主要用途是保存函数参数 。但这个对象还有一个名叫 callee 的 属性，该属性是一个指针，指向拥有这个 arguments 对象的函数。

```js
// 第一种写法
function box(num) {
	if (num <= 1) {		return 1; 
	} else {		return num * box(num-1);	}
}

// 第二种写法
function box(num) { 
	if (num <= 1) {		return 1; 
	} else {		return num * arguments.callee(num-1);//使用 callee 来执行自身 
	}}
```

对于阶乘函数一般要用到递归算法 ，所以函数内部一定会调用自身 ;如果函数名不改变 是没有问题的，但一旦改变函数名，内部的自身调用需要逐一修改。为了解决这个问题 ，我 们可以使用 arguments.callee 来代替（第二种写法）。

函数内部另一个特殊对象是 this，其行为与 Java 和 C#中的 this 大致相似。换句话说， this 引用的是函数据以执行操作的对象 ，或者说函数调用语句所处的那个作用域 。


### 函数属性和方法

ECMAScript 中的函数是对象，因此函数也有属性和方法。每个函数都包含两个属性 : length 和 prototype。其中，length 属性表示函数希望接收的命名参数的个数。对于 prototype 属性，它是保存所有实例方法的真正所在 ，也就是原型。这个属性， 我们将在面向对象一章详细介绍 。