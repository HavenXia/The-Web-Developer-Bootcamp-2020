# AJAX

Asynchronous JavaScript and XML, 异步的JavaScript和XML

在website, request之后从服务器return回来的其实是Json

#### API

user向web api发送request, 返回的是json, 比如订阅weather网站的api, 就可以在自己的code里面实现查天气的功能

#### AJAJ

实际上不怎么用XML, 都是用JSON- java script object notation

json读取到js里面是一个string, 需要parse, <font color = grape>**然后return一个JS Object!**</font> 

```javascript
const parsedData = JSON.parse(data);
```

#### PostMan

一个可以方便测试api request的application

#### Fetch API

New way of making request via JS, IE不支持, support promises!

<font color = grape>**fetch 一个api, 然后用.then得到promise resolve value, 然后再用`res.json` return Promise of JSON**</font> 

```javascript
fetch('https://api.cryptonator.com/api/ticker/btc-usd')
    .then(res => {
        console.log("RESPONSE, WAITING TO PARSE...", res)
        return res.json()
    })
    .then(data => {
        console.log("DATA PARSED...")
        console.log(data.ticker.price)
    })
    .catch(e => {
        console.log("OH NO! ERROR!", e)
    })
```

用async和await进行优化, 这里必须await, <font color = grape>**不然data没有value!**</font>

```javascript
const fetchBitcoinPrice = async () => {
    try {
        const res = await fetch('https://api.cryptonator.com/api/ticker/btc-usd');
        const data = await res.json();
        console.log(data.ticker.price)
    } catch (e) {
        console.log("SOMETHING WENT WRONG!!!", e)
    }
}
```

#### Header

有些网站可以直接request url本身(<font color = grape>**正常情况下return的是html**</font>), 但是加上特定的header, 比如 `Accept: 'application/json'`, 就可以return json!

#### AXIOS

A library to make http requests, <font color = grape>**复制并放在自己的script前面**</font>, [DEMO](/Users/parallax/Documents/CIT&CIS/The Web Developer Bootcamp 2020/code/10 AJAX_CODE/Axios/index.html)

```html
<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
```

<font color = grape>**用`axios.get(api)` 得到的promise result已经自动有了data等property, 不需要再用`res.json()`**</font>

```javascript
const fetchBitcoinPrice = async () => {
    try {
        const res = await axios.get('https://api.cryptonator.com/api/ticker/btc-usd')
        console.log(res.data.ticker.price)
    } catch (e) {
        console.log("ERROR!", e)
    }
}
```

加上header, 可以实现获取网站content, 然后每次获取得到text然后作为li 插入到ul里面

```javascript
const getDadJoke = async () => {
    try {
        const config = { headers: { Accept: 'application/json' } }
        const res = await axios.get('https://icanhazdadjoke.com/', config)
        return res.data.joke;
    } catch (e) {
        return "NO JOKES AVAILABLE! SORRY :("
    }
}
```

然后通过之前学过的DOM内容, 实现每点击button一次, 就加一条text在页面上

#### TV Search Mini Project

+ 首先要用axios, script在自己的js上面, <font color = grape>**input现在有一个form了! 当然还是需要preventDefault()**</font>

+ Remember form可以用`form.element.name.value` 来获取具体的input value, 这里是得到了search的text

+ 现在search term变成了variable, 所以不能直接用hardcode的api了

  ```javascript
  / 方法一: 直接替代最后的searchTerm
  const res = await axios.get(`http://api.tvmaze.com/search/shows?q=${searchTerm}`);
  / 方法二: 用param加在后面
  const config = { params: { q: searchTerm } }
  const res = await axios.get(`http://api.tvmaze.com/search/shows`, config);
  ```

+ 接着需要把`res,data` 做成图片列出来, 首先确定当前的result有img, 有的话就创建img element, 然后设置src, 并插入body

  ```javascript
  for (let result of res.data) {
      if (result.show.image) {
          const img = document.createElement('IMG');
          img.src = result.show.image.medium;
          document.body.append(img)
      }
  }
  ```

+ 最好记得reset form value, `form.elements.query.value = '';`





# OOP

Array这样的object, 当call js的method的时候, 其实用的是`array._proto_`里面的method, 这就是<font color = grape>**Prototype Object**</font>

事实上是all array have reference to this <font color = grape>**Prototype Object**</font>, 可以用`Array.prototype` 查看, <font color = grape>**这里的Array是class Array**</font>

作用:一旦为整个String/Array.prototype添加了method, 所有的string和array都有这个method, <font color = grape>**本质就是修改了String和Array的Prototype**</font>

#### OOP

a computer programming model that organizes software design around data, or [objects](https://searchapparchitecture.techtarget.com/definition/object), rather than functions and logic

<font color = grape>**比如让color成为一个class, 通过hex(), rgb()等method让其return不同的string!**</font>

#### Factory Function(Constructor的劣化版)

不同于java, JS的object不需要field, 可以直接`a = {}` construct, 然后直接用`a.b=c` 来assign property

<font color = grape>**注意: 这里的line7是之前说的destructure, 取出this(也就是当前color)的r,g,b(可以rename)然后存在variable里**</font> 

缺点, 新创建的color会覆盖前面的color!

```javascript
function makeColor(r, g, b) {
    const color = {};
    color.r = r;
    color.g = g;
    color.b = b;
    color.rgb = function() {
        const { r, g, b } = this;
        return `rgb(${r}, ${g}, ${b})`;
    };
    return color;
}
```

####  Constructor

更明智的做法: object里面只设置其property, <font color = grape>**所有的method设计在`object.prototype`里面! 然后用new来创建新的object!**</font>

```javascript
function Color(r, g, b) {
	this.r = r;
	this.g = g;
	this.b = b;
} // 直接把function加在prototype里面!
Color.prototype.rgba = function(a = 1.0) {
	const { r, g, b } = this;
	return `rgba(${r}, ${g}, ${b}, ${a})`;
};
const color1 = new Color(40, 255, 60);
```

#### Class

Class里定义的function自动就是prototye的,其他和java一样

```javascript
class Color {
	constructor(r, g, b, name) {
		this.r = r;
		this.g = g;
		this.b = b;
		this.name = name;
	}
	innerRGB() {
		const { r, g, b } = this;
        this.c = r + g + b;
		return `${r}, ${g}, ${b}`;
	}
}
const red = new Color(255, 67, 89, 'tomato');
```

<font color = grape>**特殊: JS Class里的method可以为constructor添加新的property, 不需要field也不需要提前声明, 可以直接在method里面 `a.b = c`**</font> 

#### Extend/Super Keyword

Class用**extends**来继承, subClass的constructor用**super()**来call parentClass的constructor

<font color = grape>**不写constructor默认继承, override也存在**</font> 

```javascript
class Cat extends Pet {
    constructor(name, age, livesLeft = 9) {
        console.log('IN CAT CONSTRUCTOR!');
        super(name, age);
        this.livesLeft = livesLeft;
    }
    meow() {
        return 'MEOWWWW!!';
    }
}
```















