# CSS Rules

Almost everything you do in CSS follows this basic pattern:

```css
selector {
	property: value;
}
```

selector 可以是h1, img代表所选择的html内容

property 可以是width, height, color之类的

<font color = grape>**Example:所有type为text的input, 取第2n个(即2,4,6...) 然后使broder变为红色solid**</font>

<img src="/Users/parallax/Library/Application Support/typora-user-images/image-20210102141537550.png" alt="image-20210102141537550" style="zoom:67%;" align="left"/>

css样式没必要自己去调整, 可以在可视化网站上进行测试并copy code



### CSS实现

[html代码部分](/Users/parallax/Documents/CIT&CIS/The Web Developer Bootcamp 2020/code/03index.html)

#### 1.Inline Styles

CSS可以直接在html文件中inline实现, 但是不推荐

```html
<h1 style="color: purple">Hello World</h1>
<button style="background-color: green;">Click</button>
```

为什么不好? 因为对于每一个element都要复制相同的style,<font color = grape>**但是用external的方法就可以直接为所有button上相同效果!**</font>

#### 2. `<style>` Element

同样是在html中, 直接用style elements来为多个element apply same style

```html
<style>
    h2 {
        color: red;
    }
</style>
<h2>I am an 1</h2>
<h2>I am an 2</h2>
```

这样可以让多个h2都have same style, 但是不能实现多个文件中share style

#### 3. External StyleSheet

Write a css file, **用 `<link>` 让多个html文件用css里写的style**

[CSS代码部分](/Users/parallax/Documents/CIT&CIS/The Web Developer Bootcamp 2020/code/03app.css)

<font color = red>注意: `<link>`部分是写在`head`里面的</font> 

```html
<link rel="stylesheet" href="03app.css">
```



### CSS COLOR

[html代码部分](/Users/parallax/Documents/CIT&CIS/The Web Developer Bootcamp 2020/code/03index.html)

[CSS代码部分](/Users/parallax/Documents/CIT&CIS/The Web Developer Bootcamp 2020/code/03app.css)

#### Background color

`color` 代表字体颜色, `background-color` 代表背景色,很简单

```css
button{
    color: magenta;
    background-color: cyan;
}
```

#### RGB & Named Colors

到目前为止用的都是有名字的color, 但是实际上还有很多color.

RGB的三个channel从0-255,分别代表红绿蓝, <font color = red>rgb(255,0,0)</font>, 模板如下

```css
background-color: rgb(89,151,0);
```

#### Hexadecimal

其实还是红绿蓝channel 从0-255, 只不过用hex表示了, 0-255可以用8位binary, 也就是2位的hex

<font color = yellow>`#ffff00`</font>  代表red是255, green是255, blue是0, <font color = grape>**如果输入只有3bit, 会自动理解成每个颜色两位是相同的,比如 #cc55ee == #c5e**</font> 

```css
color: #5fcffc;
```



### CSS TEXT

+ `text-align`, <font color = grape>**center表示居中,还有居左/右**</font>, 和`width= %` 组合可以限定用来决定居中的长度 

  ```css
  text-align: center;
  width: 50%;
  ```

  除了标题以外对字体也可以用这招

+ `font-weight`, <font color = grape>**字体粗细,400是普通值,700是bold**</font>

  ```css
  font-weight: 700;
  ```

+ `text-decoration`, <font color = grape>**字体上line的修饰, 比如`underline`或者`line-through`**</font>

  + 注意这里可以加上**颜色修饰**,也是多种颜色格式都允许
  + `style` 比如wavy波浪线, dot 点线
  + `thickness` 也可以设置, 比如4px之类(修饰的是decoration这条line)

  ```css
  text-decoration: orange underline wavy 4px;
  ```

  **Advance: 消除anchor element的underline**

  ```css
  a{
      text-decoration: none;
  }
  ```

  即可消除anchor自带的下划线显示

+ `line-height` 单倍行距 x对应倍数, 写成小数百分数都可以

  ```css
  line-height: 2;
  ```

+ `letter-spacing` 字体间距

  ```css
  letter-spacing: 10px;
  ```

+ `font-size` 字体大小, 有很多种输入, 有relative和absolute

  <img src="/Users/parallax/Library/Application Support/typora-user-images/image-20210102162938681.png" alt="image-20210102162938681" style="zoom:67%;" align="left"/>

+ `font-family`, 类似于字体包, 可以切换不同的字体, <font color = grape>**不同字体当然也有不同间距, 行距之类**</font>

  也可以写多个字体, 如果第一个字体在某个machine不存在, 就自动用第二个!

  <font color = grape>**还可以直接写某个font family的名字, 它会自动在里面选出可用的字体!**</font>

  ```css
  font-family: 'Segoe UI', Arial; 这里是list of fonts
  font-family: monospace; 这里是fontfamily
  ```

   



# CSS Selectors

[html代码](/Users/parallax/Documents/CIT&CIS/The Web Developer Bootcamp 2020/code/03starter.html)

[CSS代码](/Users/parallax/Documents/CIT&CIS/The Web Developer Bootcamp 2020/code/03starter.css)

#### Universal Selector

直接用一个*作为selector, 可以选中所有的element, <font color = red>甚至包括那些不能被执行对应操作的(比如对img改变color)</font>

#### Element Selector

Select multiple elements, **直接把多个elements用comma连接**

```css
h1,h2 {
    color: magenta;
}
```

#### ID Selector

Input和Button都有id, 如果想只修改某个button的话, 那么就单独用 `#logout` 来进行修改, <font color = grape>**当然也可以select multiple id**</font> 

```css
#signup,#login{
    background-color: grey;
}
```

#### Class Selector

<font color = grape>**虽然多个element(甚至不同的element)不能有相同id, 但是可以有相同的class! 格式为`.complete`**</font>

```html
<span class="tag">funny</span>
<a class="tag" href="#puppies">Puppies</a>
```

```css
.tag{
    background-color: red;
}
```

#### Decendent Selector

选择所有在<font color = grape>**element 1里面的element 2, 比如选择所有list里面的anchor, selector 为`li a`**</font> 

```css
span a{ 选择所有span中的anchor element
    color:teal;
}
```

也可以给所有的span都设置一个class(比如post), 然后<font color = red>组合class selector 和 secendent selector</font>, id selector 也可以用来组合

```css
.post a {color:white;}
#signup a {color:white;}
```

#### Adjacent Selector

如果用`+` 连接两个element, 那么所select就是 <font color = grape>**element 2 immediately after element 1**</font>  

比如html中,input 后面有两个button, 第一个是log in, 第二个是sign up, 那么这段代码只改了第一个button

```css
input + button{ color:pink;}
```

#### Direct Selector

只选择element 1的==direct child== element 2, 必须是直接的! 如果是footer>ul>li>a的话, 这些a不会被改变!

```css
footer > a { color:lightblue;}
```

#### Attribute Selector

Select elements with specific attributes, 常用于input elements

```css
input[type="password"]{
    color:green;
} 这样就只会在type为password的input修改
```

同样class也是一个attribute,这样即使class=tag还有其他的elements, 此处可以限定只有span!<font color = grape>**也可以写成span.tag!(仅适用于class)**</font> 

```css
span[class="tag"]{ color: yellow;}
span.tag{ color: yellow;}
```

此处的=可以有一些其他的替换, <font color = grape>**`*=` 代表只要包含都算, 比如这行代表选出所有href contain www的anchor, `$=` 代表end with**</font>

```css
a[href *= "www"]{
    font-size: 30px;
}
```

#### Pseudo Classes

Special status, 比如checked(被选中)之类

+ `hover`, <font color = grape>**即光标移到上面! 比如光标放到button上会变色**</font>, 同样也能参与combination

  ```css
  section button:hover{ color:yellow; }
  ```

+ `active`, <font color = grape>**不同于光标移到, 这个是点击的时候的appearance!**</font> 

  ```css
  section button:active{ background-color: burlywood;}
  ```

+ `checked`, 当选中的时候改变, 和上面一样

+ `nth-of-type`, <font color = grape>**代表当前select的第n个, 直接写数字就是第几个, 如果是mn那就是every m elements**</font>

  比如2n就是第二个,第四个,第六个... , 也可以写odd和even来选择

  ```css
  section:nth-of-type(2n){
      background-color: slategray;
  }
  ```

#### Pseudo Elements

+ `::first-letter`, 选中第一个letter

  ```css
  h2::first-letter{ font-size: 40px;}
  ```

+ `::first-line`, 选中firstline

+ `::selection`, <font color = grape>**被选中的内容会变成对应的效果, 比如这里是选中背景就变黄**</font>

  ```css
  p::selection{
      background-color:yellow;
  }
  ```

  

  

### CSS Cascade(优先级)

同层是最后一次修改优先级最高

如果有多个link to css, 那么会自动按最后一个link(<font color = red>出现重复时才会</font>)

#### CSS Specificity

<font color = grape>**按照most specificity的顺序来,从大到小**</font>

比如section button 和所有的button, <font color = red>无论是什么order, section button确实more specific, **所以按照它的!**</font>

==Inline styles > ID > Class,attribute,pseudo class > Element, pesudo-element== 很重要, id button 比 class button more specific

weight 比例可以看做1000: 100:10:1

**尽量避免inline styles!**

#### CSS important

如果加上 `!important`, 会立刻成为最高优先级并且overwrite其他同样的效果, **尽量少用!**

```css
button {
    background-color: gold !important;
}
```



### CSS Inheritance

比如先设置了h1的color是blue, 然后设置body的color是yellow

 <font color = grape>**结果是h1依旧blue, 其他所有地方yellow, body的yellow被各个children element继承了 **</font>

但是比如input和button这种element,是不会自动inherit的, 即使让body是yellow, 他们也依旧是黑色!

因此需要`inherit`, 他们就会inherit最近的parent element的color

```css
button,input {
    color:inherit;
}
```











