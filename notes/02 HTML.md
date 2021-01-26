HTML is HyterText MARKUP Language

[代码部分](/Users/parallax/Documents/CIT&CIS/The Web Developer Bootcamp 2020/code/0chickens.html)

### Mozilla Developer Network(MDN)

[All HTML elements we may use](https://developer.mozilla.org/en-US/docs/Web/HTML/Element)

+ The **HTML `<p>` element** represents a paragraph, 但是实际上可以包含所有东西

+ The **HTML `<h1>`–`<h6>` elements** represent six levels of section headings. `<h1>` is the highest section level and `<h6>` is the lowest.

  <font color = grape>**head和paragraph都会自动空行!**</font> 

+ `lorem` 可以在HTML中生成随机文本, 用以测试或者验证

  

### HTML Skleton

There are something we need for each HTML file. 按照这个格式<font color = gree>才是valid的html</font>

```html
<!DOCTYPE html>
<html>
    <head>
        <title>Chicken - wikipedia</title>
    </head>
    <body>
        所有内容
    </body>
</html>
```

+ DOCTYPE 没有closing tag

+ The **HTML `<html>` element** represents the **root (top-level element) of an HTML document**

   All other elements must be descendants of this element.

+ 任何`<html>` element下面必然有 One <head> element, followed by one <body> element.

+ `<head>` 中必须有一个<title>, it is the <font color = grape>title of title bar in browser</font> 



### HTML lists

Unordered list 是 <ul>, 表现为**bullet points**, ordered list 是 <ol>, 表现为**numbered list**

其中的每一项是<li>, it must be contained under <ol>,<ul>或者<menu> 

<font color = gree>**支持nested list, 只需要其中某个<li>内再次contain一个<ul>即可**</font> 

<img src="https://live.staticflickr.com/65535/50775998586_20132f372e_o.png" alt="image-20201229130321690"  align="left"/>



### HTML Anchor element

We need hypertext reference in the bracket!

既可以去往<font color = grape>**world wide website也可以访问本地的html**</font>

```html
去往www需要加上http://
<a href="http://www.google.com">Go to www</a> 
 <a href="about.html">Local html</a>
```



### HTML images

image只有一个open brcket!

<font color = grape>**其src类似于anchor的href, 都可以选择从网上或者本地获取**</font>

+ 这里的`alt` 是图片不能显示的时候才显示的内容, alternative

```html
<img src="/Users/parallax/Desktop/86610614_p0.jpg" alt="OOps">
<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Female_pair.jpg/220px-Female_pair.jpg">
```



### HTML comments

格式如下

```html
<!-- something -->
```



### HTML5

HTML5 is the latest evolution of the standard that defines [HTML](https://developer.mozilla.org/en-US/docs/HTML). 

+ Inline elements: 不同的elements会分享同一行, 比如多个<a>会在同一行显示
+ Block elements: 不同的elements会take a whole block of space, 比如<h1><h2>都是block elements



### HTML division & span

The **HTML Content Division element** (**`<div>`**) is the generic container for flow content. <font color = grape>div是block elements</font> 

可以用div来实现网页中一些==有边框的block==! <font color = gree>但是具体的实现需要css才行</font>

The **HTML `<span>` element** is a generic ==inline== container for phrasing content, which does not inherently represent anything.

我们也可以在inline用span wrap一部分content, 然后通过css对该span进行设置, 比如<font color = red>设置content颜色为红!</font>

```html
这里既有div也有span
<div>
    <a href="http://www.google.com">Go to www</a>
    <a href="about.html"><span>Local html</span></a>
</div>
```



### Odd Assortment of Elements: HR, BR, SUP, SUB

+ HR: The **HTML `<hr>` element** represents a thematic break between paragraph-level elements: for example, a change of scene in a story, or a shift of topic within a section. <font color = grape>**注意这个只有<hr>一个bracket,会生成一条横线**</font> 

+ BR: line break, <font color = grape>**注意这个只有br一个bracket,相当于换行符**</font> 

+ SUP: superscript element, 即上标, 注意sup可以contain anchor element, 所以参考文献才可以链接

  ```html
  <sup><a href="http://www.google.com">[2]</a>
  ```

+ SUB: subscript element, 即下标, 用法和上标是一样的

  ```html
  一个实现fraction的表达
  <sup>1</sup>/<sub>2</sub>
  ```



### HTML Entities

html内置的一些sequences,  ==start with an amperand & and end with semicolon==

比如在vscode中,难以表达 1<2, 因为<被视作left bracket! <font color = grape>所以需要小于符号的html entity</font>

  ```html
1 &lt; 2  <!-- less than -->
2 &gt; 1  <!-- greater than -->
  ```



### Semantic Markup

Definition: Meaningful markup

比如 `section, main` 这些html elements 都和 `div` 具有相同的功能, 但是他们的<font color = gree>name have meanings</font> 

Why need this? Better **readability**, 方便自己修改的时候看懂!

<img src="/Users/parallax/Library/Application Support/typora-user-images/image-20201230162720512.png" alt="image-20201230162720512" style="zoom: 50%;" align="left"/>

+ `<main>`和div一模一样, 代表正文部分, navigator部分不算!

+ `<nav>` 是navigator, 网页顶端的导航.

  ```html
  <nav>
      <ul>
          <li><a href="http://www.google.com">Go to www</a></li>
          <li><a href="about.html"><span>Local html</span></a></li>
      </ul>
  </nav>
  ```

+ `<section>`  相当于正文里的每个部分, 比如可以给每一段分成一个section, 并且之后==在css里面对这段进行操作==

+ `<article>`  一般会包括一个heading, it can be used independently.

+ `<aside>` 比如**sidebars或者大纲**这类东西

+ `<footer>` 比如页面最下方的导航网址, 一般就是footer

+ `<time>`  用来代表contains 一个datetime

+ `<figure>` 一般会包括图片, logo之类



### Screen Reader Demonstration

可以用苹果的旁白来朗读整个website, 它实际读的是html文件



### VSCODE EMMET

A plugin for vscode to write html easily.

可以用+,>, ^,*等快捷键来完成快速的书写

[Documntation](https://docs.emmet.io/abbreviations/syntax/)



### HTML Tables

[html代码部分](/Users/parallax/Documents/CIT&CIS/The Web Developer Bootcamp 2020/code/0heaviestBird.html)

+ 首先外面需要一个`<table>` 来wrap 所有的content

+ The **HTML `<td>` element** defines a cell of a table that contains data, <font color = grape>**即table中每一个cell/block,多个td在同一row**</font>

+ The **HTML `<tr>` element** defines a row of cells in a table. <font color = grape>**每一行tr里面有多个td!**</font>

+ The **HTML `<th>` element** defines a cell as header of a group of table cells.<font color = grape>**即dataframe里面的column!当然也是被tr所contain的!**</font> 

  组合这三个就可以得到 ![image-20210101152935954](https://live.staticflickr.com/65535/50787626248_b03e32ccf9_o.png)

+ The **HTML `<thead>` element** defines a set of rows defining the head of the columns of the table, <font color = red>注意这里面是th而非tr!</font> 

+ The **HTML Table Body element** (**`<tbody>`**) encapsulates a set of table rows ( elements).

  <font color = grape>**分别用thead和tbody contain title part和 body, 都可以是多行的(有些header比较复杂)**</font> 



#### Shared header

比如这样存在shared header的情况,几个subheader共用了一个header <img src="/Users/parallax/Library/Application Support/typora-user-images/image-20210101153508519.png" alt="image-20210101153508519"  />

此处需要用到`rowspan`和`colspan`,代表当前<font color = gree>cell 一共占据了多少个row或者column</font> 

```html
<tr>
    <th rowspan="2">Animal</th>
    <th colspan="2">Average Mass</th>
    <th rowspan="2">Boolean</th>
</tr>
<tr>
    <th>KG</th>
    <th>Pounds</th>
</tr>
```

设置animal和boolean的rowspan为2, 而average mass则是设置colspan=2, <font color = grape>**因此对于header第二行,这两个subheader只能放在average mass下面!**</font>





### HTML Forms

The **HTML `<form>` element** represents a document section containing interactive controls for submitting information.

其action 属性 specifies <font color = grape>**where the form data should be sent**</font> , 格式为`<form *action*=""></form>`

[html代码](/Users/parallax/Documents/CIT&CIS/The Web Developer Bootcamp 2020/code/0forms.html)



#### HTML INPUT

在form中需要 **`<input>`** 来让user输入信息, <font color = red>没有closing tag</font>

+ 有二十多种不同的`input type`,包括 password, text, color等, 可以实现很多input, 比如password会自动obseure input之类的

  + **Text**类型

    ```html
    <form action="/tacos">
        <p>
            <label for="username">Enter a Username:</label>
            <input type="text" id="username" placeholder="username" name="username">
        </p>
    </form>
    ```

    此时在输入haoyu的情况下我们会得到 <font color = grape>**file:///tacos?username=haoyu**</font> 

    多个inout的情况下会得到` file:///tacos?username=haoyu&password=123&color=%235b2f2f&color=1` 这样用&链接多个relation的内容

    ==因此, 在设置好action和name的情况下, 我们可以实现在自己的website中进行google搜索!==

  + **Checkbox**, 可以通过设置`checked`来让初始状态是选中的, <font color = grape>**`<input *type*="checkbox" *name*="agree" *id*="agree" *checked*>`**</font> 

    在checkbox type下<font color = red>如果check</font> button去往的是 `name's content = on`

  + **Radio**, **单选题**,  <font color = grape>**需要注意的点是radio的多个input有相同name, 不同id(用来link label), 不同value(用来实现真正的选择)**</font> 

    <font color = red>注意: 这个value看不见但是是存在的,如果不设置, 搜索依然是 `name's content = on`, 但此处多个name是相同的</font>

    但如果设置了不同的value, 就会得到 `name's content = value`, correctly
    
  + **Range**, 设置范围, 可以用`min,max,step` 来设置最小,最大,step值, <font color = red>注意,`value` 这里设置的是初始值(number也有这些attribute)</font>

    

+ `placeholder` 能够让input box显示出未输入情况下的默认input, 比如`<input type="text" *placeholder="username">` 能实现<img src="/Users/parallax/Library/Application Support/typora-user-images/image-20210101162846033.png" alt="image-20210101162846033" style="zoom:60%;" />
+ `id` 属性让每个input都有独一无二的tag, 与`label`组合可以link label & inputbox
+ `name` 属性也是submit的组成部分,it is to reference form data after a form is submitted.



#### TextArea

不属于input,但是也是要在form里面submit的, `<textarea>`

可以用`rows,cols`来设置输入框的size



#### HTML Labels

The **HTML `<label>` element** represents a caption for an item in a user interface, <font color = grape>**比如输入框上面告诉你该输入什么**</font>

+ `for` 属性内容是input的id, 通过这样可以把label和input link起来, ==点击label可以直接跳转到对应input!!==

  ```html
  <label for="username">Enter a Username:</label>
  <input type="text" id="username" placeholder="username">
  ```



#### HTML Buttons

The **HTML `<button>` element** represents a clickable button, used to submit [forms](https://developer.mozilla.org/en-US/docs/Learn/Forms) or anywhere in a document for accessible.

<font color = grape>**如果点击button, 会去往`<form>` 的action attribute所设置的path**</font>, 当然不设置button, **input输入之后用回车也是可以的**

<font color = grape>**如果在form外设置了button, 点击它和form没有任何关系, 不会去往form设置的action**</font> 

+ `type` 决定了该button的性质, 可以选择 `"submit","buttons"` 等多种,实现不同的button功能

  <font color = red>注意button也可以用input来实现, 比如`<input type="submit" value="Click me!">`</font>, 一般还是用`<button>`
  
+ Button也可以有id, 在css里进行



#### 实现search

Google search

```html
<form action="https://www.google.com/search">
    <input type="text" name="q">
    <button>Google!</button>
</form>
```



#### HTML Select

`<select>` 有id和name, id用来和label匹配, name作为reference of data

`<select>` contains `<option>` , 每个option都需要对应的value, <font color = grape>**和input的radio type相同**</font>

==同样也可以用selected来作为默认的选项==

```html
<p>
    <label for="meal">Please Select an Entree</label>
    <select name="Meal" id="meal">
        <option value="fish">Fish</option>
        <option value="chicken" selected>Chicken</option>
        <option value="pork">Pork</option>
    </select>
</p>
```





### HTML5 Validation

Server Validation——no involve of Javascript.

+ input type 为 text时, 可以用`required` 在submit时进行基础检测, <font color = grape>**输入不能为空**</font>

  ```html
  <input type="text" name="first" id="first" required>
  ```

  还可以添加`minlength,maxlength`来限制input的长度, <font color = grape>**如果是numberic type的则设置`min,max`**</font>

  ```html
  <input type="text" name="username" id="username" minlength="5" maxlength="20" required>
  ```

  Advanced:可以使用`pattern` 和regex来检测是否input match regex

+ 对于一些更复杂的type,存在自带的validation

  ```html
  <input type="email" requred> 会自动检测是否@前后都有东西
  <input type="url" requred> 会自动检测是否符合一个url格式(http://)
  ```

  

### Example

[Marathon Registration Form](/Users/parallax/Documents/CIT&CIS/The Web Developer Bootcamp 2020/code/0MarathonRegister.html)

<font color = grape>**需要注意的点是radio的三个有相同name, 不同id(用来link label), 不同value(用来实现真正的选择)**</font> 

<img src="/Users/parallax/Library/Application Support/typora-user-images/image-20210101204315315.png" alt="image-20210101204315315"  align="left"/>









