# Javascript Note-2



## 语法总结

### 时间与日期
ECMAScript 中的 Date 类型是在早期 Java 中 java.util.Date 类基础上构建的。为此，Date类型使用 UTC (Coordinated Universal Time，国际协调时间[又称世界统一时间]) 1970 年 1 月 1 日午夜(零时)开始经过的毫秒来保存日期 。在使用这种数据存储格式的条件下 ，Date 类型 保存的日期能够精确到 1970 年 1 月 1 日之前或之后的 285616 年。

ECMAScript 提供了两个方法，Date.parse()和 Date.UTC()。Date.parse()方法接收一个表 示日期的字符串参数，然后尝试根据这个字符串返回相应的毫秒数。 ECMA-262 没有定义 Date.parse()应该支持哪种日期格式 ，因此方法的行为因实现而异 ，因地区而异。


```js
// 在调用 Date 构造方法而不传递参数的情况下 ，新建的对象自动获取当前的时间和日期 。
var box = new Date();
var box = new Date(Date.parse('6/13/2011'));//Mon Jun 13 2011 00:00:00 GMT+0800
var box = new Date('6/13/2011'); //直接传入，Date.parse()后台被调用

alert(Date.parse('6/13/2011'));
alert(Date.parse()); // NaN
```

Date 对象在不同浏览器中的实现有许多奇怪的行为，因此有些情况需要实验。
Date.UTC()方法同样也返回表示日期的毫秒数 ，但它与 Date.parse()在构建值时使用不同的信息。

与其他类型一样，Date 类型也重写了 toLocaleString()、toString()和 valueOf()方法;但这些方法返回值与其他类型中的方法不同。var box = new Date(Date.UTC(2011,11, 5, 15, 13, 16)); alert('toString:' + box.toString());alert('toLocaleString:' + box.toLocaleString()); //按本地格式输出

```js
alert(Date.UTC(2011,11)); //1322697600000// 如果 Date.UTC()参数传递错误，那么就会出现负值或者 NaN 等非法信息。alert(Date.UTC()); //负值或者 NaN 如果要输出指定日期，那么直接把 Date.UTC()传入 Date 构造方法里即可。var box = new Date(Date.UTC(2011,11, 5, 15, 13, 16));

var box = new Date(Date.UTC(2011,11, 5, 15, 13, 16));
alert('toString:' + box.toString());alert('toLocaleString:' + box.toLocaleString()); //按本地格式输出

// box.toString toLocaleString 这两个方法在不同浏览器显示的效果又不一样,但不用担心，这两个方法只是在 调试比较有用
```
