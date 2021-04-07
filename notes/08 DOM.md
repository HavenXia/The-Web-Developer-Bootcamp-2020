Document Object Model

在任意一个website, 都可以用`console.dir(document)` 来获取document object

document object的`all` property是一个array of all html object, 可以继续获取其中的innerText之类的property

### Select and Manipulate

+ `document.getElementById()`, 通过html里面的id获取某个object, 然后用`console.dir` 查看其property

+ `getElementsByTagName` 和 `getElementsByClassName`, <font color = grape>**html中相同tag的有很多个, 同时选择, return 一个HTML Collection, 不是array, 但是也可以通过index获取对应的Element**</font> , 但是不能用map之类的method

+ `document.querySelector()`, ==只return first match element!==  <font color = gree>但是也可以用a[title = "java"] 这样的restriction来查找first match</font>

+ `document.querySelectorAll()`, 当然就是all match了, <font color = grape>**这两个querySelector的param可以是#id, .class, tag**</font>

  ==所有css selector的规则都可以用==, 比如要求direct child之类的!

  ```javascript
  const links = document.querySelectorAll('p a');
  ```

+ `document.querySelector().innerText`  本质上就是某个element的innerText, 可以进行修改

+ `document.querySelector().textContent` 和innerText的区别就是<font color = grape>**textContent也会return display = none的element的text**</font> 

+ `document.querySelector().innerHTML`, 会把选中的HTML(==input的element内部, 不包括这个element自己的tag==)像string一样返回, 包括里面的`<b>abc</b>` 也会作为string返回,  <font color = grape>**如果改变这里的b 变成i, 会被take as html, 然后原文里的bold变成了italic**</font>

+ `element.getAttribute()` 这里是从html file里直接获取attribute, <font color = grape>**return结果严格和html一致**</font>

  更建议用`setAttribute(attr, value)` 来set attribute, 而不是直接设置

+ `element.style` <font color = grape>**只能选中inline style, link的css没有用!!**</font>  但是也不是不能用, 比如一次性修改所有link的color

+ `element.classList` , 可以直接给element添加class, 用`add/remove/contains` 来进行设置

  用`toggle`, <font color = grape>**如果已经有了就remove, 反之就add**</font>

+ `element.parentElement/children` 可以获取当前**唯一的**parent和children的 **HTML collection**.

+ `element.previousElementSibling/nextElementSibling` 获取当前element的同level next element

+ `docuent.createElement('tag')` 可以创建element, 新创建的在document上, 但是还并没有到body里!

   然后用`element.appendChild()` <font color = grape>**把新创建的element移动到页面上**</font> ,  udemy只能用这个!

+ `element.append/prepend` 也可以加element as a child, 如果要修改text就用innerText
+ `element.insertAdjacnetElement(position, element)` 可以<font color = gree>在当前element后面插入一个新的element(同level)</font>
+ `element.removeChild(child)` 必须找到parent node, 才能remove 当前的node! <font color = grape>**用`element.remove()`更好**</font> 

[Pokemon Mini Project](/Users/parallax/Documents/CIT&CIS/The Web Developer Bootcamp 2020/code/08 DOM_Intro_CODE/Pokemon)

  

## DOM Events

 当hover, click,drag的时候js做出对应的处理, 就是event

##### Inline Event

直接写在html里面, 设置html的onlick即可, 此处使用js

```html
<button onclick="alert('you clicked me!'); alert('stop clicking')">
        Click Me!
</button>
```

##### 在JS里实现

+ `element.onclick` : 点击生效, `element.onmouseenter`: 光标碰到就生效

   首先用query获取当前element, 然后设置function for this event

  ```javascript
  // 方法一: 最普通的no param function
  btn.onclick = function () {
      console.log("YOU CLICKED ME!")
      console.log("I HOPE IT WORKED!!")
  }
  // 方法二: assgin a predefined function
  function scream() {
      console.log("AAAAAHHHHH");
      console.log("STOP TOUCHING ME!")
  }
  btn.onmouseenter = scream;
  // 方法三: arrow function
  btn.onclick = () => alert('you clicked the h1!');
  ```

+ `element.addEventListener(operation, function)` <font color = grape>**给一个element定义不同操作的不同event, 一个操作也可以有多个event**</font> 

  ```javascript
  btn3.addEventListener('click', function () {
      alert("CLICKED!");
  })
  // arrow function
  btn3.addEventListener('click', () => alert("CLICKED!"))
  // 添加两种不会覆盖, 会同时call
  tasButton.addEventListener('click', twist)
  tasButton.addEventListener('click', shout)
  ```

+ <font color = grape>**一个element的event是可以修改其他element的内容的**</font>, 比如这里的rgb 生成器, 可以修改body的background和h1的text

  ```javascript
  const button = document.querySelector('button');
  const h1 = document.querySelector('h1');
  
  button.addEventListener('click', function () {
      const newColor = makeRandColor();
      document.body.style.backgroundColor = newColor;
      h1.innerText = newColor;
  })
  // 这里function是多行的, 所以arrow其实卵用没有, 就省略了一个function keyword
  const makeRandColor = () => {
      const r = Math.floor(Math.random() * 256);
      const g = Math.floor(Math.random() * 256);
      const b = Math.floor(Math.random() * 256);
      return `rgb(${r}, ${g}, ${b})`;
  }
  ```

+ This Keyword: 如果想要修改当前element的内容或者style, 定义function的时候需要用到this

  <font color = grape>**这里的this就是指向当前addEventListener的element**</font> 

  ```javascript
  function colorize() {
      this.style.backgroundColor = makeRandColor();
      this.style.color = makeRandColor();
  }
  h1.addEventListener('click', colorize)
  button.addEventListener('click', colorize)
  ```

  <font color = red>注意: colorize这里就算一行也不能用arrow function, 否则他会永远指向window!</font> 

##### Response to User

+ 当使用`addEventListener(operation, function)`的时候, function的param其实是`event`, 可以自行设定name并且利用

  对于keyboard的输入有keydown和keyup, <font color = grape>**前者按下会一直判定, 后者松开才会判定一次**</font>

  对于keyboard的event, 有一个`code` property 代表真正的操作, 可以通过 判断 `event.code` 来决定执行的code

  ```javascript
  window.addEventListener('keydown', function (e) {
      switch (e.code) {
          case 'ArrowUp': // 如果按上箭头就print up!
              console.log("UP!");
              break;
          case 'ArrowDown':
              console.log("DOWN!");
              break;
          default:
              console.log("IGNORED!")
      }
  })
  ```

##### Form Events

首先要知道整个form对应的行动是submit, <font color = grape>**其中每个input可以用`element.value` 来获取输入的内容**</font> 

在HTML里form element一般都有对应的action, <font color = grape>**可以用`event.preventDefault()`来阻止**</font>

<font color = gree>**注意: 对于form, 如果不同的input element有不同的name, 可以用`form.elements.name.value` 来获取对应的input内容 **</font>

按照常规的也可以用`document.querySelector('input[name = "xxx"]').value` 来获取, 只是form有特殊方式

```javascript
tweetForm.addEventListener('submit', function (e) {
    // prevent html form 的default action
    e.preventDefault();
    / 这里的username和tweet是在html设置的input的name attribute!
    const usernameInput = tweetForm.elements.username;
    const tweetInput = tweetForm.elements.tweet;
    addTweet(usernameInput.value, tweetInput.value)
    usernameInput.value = '';
    tweetInput.value = '';
});
// 在function里需要新建li element然后作为child放在ul里面
const addTweet = (username, tweet) => {
    const newTweet = document.createElement('li');
    const bTag = document.createElement('b');
    bTag.innerText = username
    newTweet.append(bTag);
    newTweet.append(`- ${tweet}`)
    tweetsContainer.append(newTweet);
}
```

##### 其他operation

+ `change`, 只在input 输入完, **mouse click at somewhere outside input box**, change才会生效

+ `input` , 每输入一个东西就是一次input, <font color = grape>**注意其实和keydown和keyup也并不一样! 比如按F1是keydown但不是input!**</font>

+ Bubbling: 当一个child element 执行某个operation时, 其parent element其实也被执行了这个operation, 

  **比如click button, also click parent div!** 但是这样有的时候很麻烦, 比如<font color = gree>click button会变色, 但是click parent div会hide whole div, 这时只想变色怎么办?</font>

  `e.stopPropagation()` 可以stop bubbling, 只让operation发生在当前的element上

  ```javascript
  button.addEventListener('click', function (e) {
      container.style.backgroundColor = makeRandColor();
      e.stopPropagation(); // 此时click不会同时call container的click event
  })
  container.addEventListener('click', function () {
      container.classList.toggle('hide');
  })
  ```

+ Delegation: 比如想通过click删除li element, 但是写js的时候需要query这些element, 怎么办?

  <font color = grape>**可以query parent element, 然后click on child 会bubble to parent element, 只需check 下这些child element特有的property (确保不删掉同level但是不该被删除的内容)然后remove就可以了**</font>

  ```javascript
  // tweetsContainer 是ul element, 但是实际删除的是li element
  tweetsContainer.addEventListener('click', function (e) {
      // 原理是if LHS is false, RHS will never run
      e.target.nodeName === 'LI' && e.target.remove();
  })
  ```

+ 对于button, 可以用`element.disabled = true` 来让element disabled!



## Score Keeper Mini Project

除了bootstrap, 还可以使用[Bulma](https://bulma.io/documentation/overview/start/)

























