# 表单与表格

大多数Web页面与用户之间的交互都发生在表单中，表单中有许多交互式HTML元素如：文本域，按钮，复选框，下拉列表等。从文档对象层次图中可以看到，表单是包含在文档中的，所以要访问表单，仍然需要通过document对象来访问


## Form 对象
表单就是指的form标签及其里面的内容，要获取一个表单对象，可以给某个form标签加个id属性，然后使用document.getElementById方法获得。也可以使用document.getElementsByTagName("form")来获取所有表单的集合，然后通过下标来访问。还可以给form标签加个name属性，然后可以使用document.getElementsByTagName来访问。

不过，0级DOM（0级DOM并不是任何DOM规范，事实上它是BOM的内容，但浏览器都实现的比较好）为我们提供了更简单的访问From对象的方法——使用document.formName。

```html
<form name="formName"></form>

var fm = document.formName;//可以这样来直接引用该表单对象
//与document.getElementsByTagName("form")相对应有document.forms集合
var fm = document.forms[0];//获取第一个Form对象
```

### 访问表单元素
```js
var fm = document.forms[0];
alert(fm.elements.length);//length属性报告了元素的个数

<form name="formName">
	<input name="textInput" type="text" value="文本框" />
</form>
alert(document.formName.textInput.value);
```

当表单提交时会发生submit事件，我们可以设置事件监听，当用户提交表单时检查表单内容。同时，如果用户输入有误，要阻止表单提交，可以在事件处理函数里return false就行了，当正确时可以调用表单的submit方法提交表单，使用表单的submit方法时不会执行submit事件处理函数。

```js
document.formName.onsubmit = function () {
	//检查表单
	if (result) {
		this.submit();
	} else {
		return false;
	}
};
```
当表单被重置时会发生reset事件，但这个事件意义不大，因为reset按钮本身意义就不大。同时也有一个reset方法.

```js
document.formName.onreset = function () {
	if (confirm("您真的要重置表单吗？")) {
		this.reset();
	} else {
		return false;
	}
};
```

## 表格对象

```html
<table border="1">
	<caption>表格标题</caption>
	<thead>
		<tr>
			<th>表头1</th>
			<th>表头2</th>
			<th>表头3</th>
		</tr>
	</thead>
	<tfoot>
		<tr>
			<td colspan="3">脚注</td>
		</tr>
	</tfoot>
	<tbody>
		<tr>
			<td>数据</td>
			<td>数据</td>
			<td>数据</td>
		</tr>
	</tbody>
	<tbody>
		<tr>
			<td>数据</td>
			<td>数据</td>
			<td>数据</td>
		</tr>
	</tbody>
</table>
```

```js
var table= document.getElementById("myTable");
//获取表格标题caption标签
var caption = table.getElementsByTagName("caption")[0];
//HTML DOM提供的更简单的方法
caption= table.caption;//返回表格标题caption标签，如果没有则返回null
if (caption) {
	alert(caption.firstChild.nodeValue);//输出标题文本
}
var thead =table.tHead;//获取表头
var tfoot = table.tFoot;//获取表尾


//获取所有tr
	var rows = table.getElementsByTagName("tr");//但会获取嵌套表格中的tr
	//rows集合只会包含表格的行，而不包含表格下面嵌套表格的行
	rows = table.rows;//返回包含表格中所有行的一个数组
	alert(rows[0].innerHTML);
	var tBodies = table.tBodies;//返回包含表格中所有tbody的一个数组
	var cells =table.cells;//返回包含表格中所有单元格的一个数组
```

### 行 (TableRow) 对象

行对象的一些属性：cells属性返回行中所有单元格的一个数组。rowIndex属性返回该行在表中的位置。sectionRowIndex属性返回在 tBody 、tHead 或 tFoot 中，行的位置。

```js
var row = table.rows[0];
alert(row.cells.length);//第一行中单元格的数目
alert(row.rowIndex);
```

### TableCell 单元格对象

与TableCell对象相关的有用的属性只有一个：cellIndex属性返回单元在格行中的下标.

```js
alert(table.rows[2].cells[3].cellIndex);
```