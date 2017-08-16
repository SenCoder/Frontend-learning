# 外观样式



修改元素外观主要有下面3种方法：修改ID，修改className,修改元素的style属性。

## 旁门左道

修改ID，通常会造成很多麻烦，我们一般不会用这种操作。

修改className确实是非常好的方法，我们甚至可以利用CSS层叠，通过修改body的className来修改整个页面的风格！前提是我们必须写特定的CSS！

```js
//CSS代码
body.redStyle {
	border:2px solid red;
}
body.redStyle * {
	color:red;
}
body.blueStyle {
	border:2px solid blue;
}
body.blueStyle * {
	color:blue;
}
//JS代码
document.body.className="redStyle";//切换为“红粉佳人”风格
document.body.className="blueStyle";//切换为“蓝调情怀”风格
```

但修改className也并非那么容易，不要忘了className可以有多个的！所以不管添加，测试还是移除元素的className，都要小心，下面的函数可以造福人类！

```js
function hasClassName(obj, cn) {
	return (new RegExp("\\b"+cn+"\\b")).test(obj.className);
}
function addClassName(obj, cn) {
	return obj.className += " " + cn;//第一次添加时，会多出一个前置空格
	//但不用担心，浏览会自动将其清除掉
}
function delClassName(obj, cn) {
	return obj.className = obj.className.replace(new RegExp("\\b"+cn+"\\b"),"");
	//同样，多个className之间的多个空格也会被视为一个
}
```

## 武林正道

可以在元素的style属性上应用CSS规则，并且style属性上的规则优先级要高于样式表中的规则，因此，通过修改元素的style属性来修改元素的外观可能是最方便并且是最有效的方法。

同其它HTML属性不同的是，元素的style属性是一个对象，CSS的属性名和属性值分别映射到了style对象的属性名和属性值，如定义对象的style="color:red;"，在JavaScript中访问时就可以这样访问：obj.style.color。但style属性也有一些需要注意的地方，比如CSS属性名中包含一些不能用作变量名的非法字符时，在JavaScript中访问时，会自动转换成驼峰命名式。