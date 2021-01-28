# CSS BOX MODEL

Every CSS part can be seen as a BOX, inspect in browser and we will see.

<img src="/Users/parallax/Library/Application Support/typora-user-images/image-20210109203509630.png" alt="image-20210109203509630" style="zoom:57%;" align="left"/>

可以看出不同的box之间有margin, 且内部的content box和和broder之间也存在padding

[html代码](/Users/parallax/Documents/CIT&CIS/The Web Developer Bootcamp 2020/code/04index.html)

[CSS代码](/Users/parallax/Documents/CIT&CIS/The Web Developer Bootcamp 2020/code/04app.css)

+ `width, height`  是<font color = grape>**inner content area 的宽和高**</font>,比如有的时候设置背景颜色,整个一大行都被设置了

  此时可以用width和height来设置**inner content box**的具体范围

+ `border` 有自己的properties, 比如粗细之类的

  + `border-width`,`border-color`,`border-style` 三个==缺一不可, 分别是粗细, 颜色, 样式, 全部存在border才会appear==

    此时整个box的width和height是 inner content box的width和height 加上 2倍的 border-width!
    
    注意: border可以对每个边单独设置, 样式为`border-left-width`这样
    
  + `box-sizing` , <font color = grape>**决定了border的size是加在content外面还是直接适应content**</font> 
  
    如果`box-sizing: border-box` , 会自动往content box内部适应, <font color = grape>**使整个box的width和height等同content box**</font>
  
  + `border` 本身才是遇到最多的,可以同时设置<font color = grape>**width, color and pattern in one go**</font> 
  
    ```css
    border: 4px solid black; 
    ```
  
  + `border-radius` <font color = grape>**设置了圆角border**</font>, 也可以用`border-left-top-radius` 来进行分别设置
  
    <font color = gree>`border-radius = 50%` 得到circle!</font>
  
+ `padding` <font color = grape>**是content box和border之间的距离**</font>, 比如button很多就有四周的padding

  + 可以用`padding-left` 等设置四周的padding

  + 也可以用shorthand `padding` 来<font color = gree>同时设置四边的padding</font>

    <font color = gree>1 parameter: 设置四边; 2 parameter: 先vertical再horizontal; </font>

    <font color = gree>3 parameters: 先top再horizontal再bottom; 4 parameters: top->right->bottom->left</font> 

+ `margin` , <font color = grape>**不同elements之间的距离, inside border的就是padding**</font> 

  + 可以用`margin-left` 等设置四周的padding
  + 也可以用shorthand `margin` 来<font color = gree>同时设置四边的margin, 规则和padding相同!</font>
  + 如果对horizontal和verical设置`auto` , 会自动居中, 比如 `margin: 20px auto`



### CSS Display Property

可以手动控制element的inline, block 或者 inline-block

[html代码](/Users/parallax/Documents/CIT&CIS/The Web Developer Bootcamp 2020/code/04display.html)

[CSS代码](/Users/parallax/Documents/CIT&CIS/The Web Developer Bootcamp 2020/code/04displayapp.css)

+ `display: inline` 可以让default block的element表现成inline的! <font color = grape>**比如h1 以inline显示**</font>
+ `display: block` 可以让default inline的element表现成block的! <font color = grape>**比如span 以block显示**</font>

==对于inline elements, 诸如width, height, margin-vertical都会被ignore, 但是padding和margin-horizontal是可以实现的!==

对于block当然是都可以修改

+ `display:inline-block`  <font color = grape>**可以让elements存在于one line中, 并且width, height, margin-vertical不会被忽视!!!**</font> 

+ `display:none` 直接让element不显示!

  



### CSS Units

如果设置百分比%, 

+ 比如width, 会自动选取当前element的==parent element==的相同parameter作为参考

+ 比如line-height, 会选取 % of the `font-size` of the element itself

#### EMS

首先它是relative units

+ for `font-size`,<font color = grape>**`1em`代表等于font-size of parent elements, `2em`代表两倍**</font> 
+ 其他的property, <font color = grape>**1em等于 font-size of the element itself**</font> , 比如让border-radius按比例改变

#### REM(ROOT EM)

em存在局限性,当存在nested list的时候, 如果直接给ul elements设置em, ==会出现一直增长, 比如每进入一层就大一倍!==

所以rem代表了<font color = grape>**relative to the root html elements's font size**</font>, 所以重点在于root html elements

比如article中的div中的nested lists, 一定会找到最外面的`article`, 取其`font-size`, 然后<font color = gree>2rem就永远等于 article的fontsize的两倍</font>





## Other Useful CSS Properties

### Opacity & Alpha Channel

[HTML](/Users/parallax/Documents/CIT&CIS/The Web Developer Bootcamp 2020/code/04 Other_Properties/Opacity/index.html)

[CSS](/Users/parallax/Documents/CIT&CIS/The Web Developer Bootcamp 2020/code/04 Other_Properties/Opacity/app.css)

**Alpha channel:** 4 channel color, rgba(0-255, 0-255, 0-255, 0-1), <font color = grape>**0代表完全透明, 1代表完全不透明**</font>

**Opacity:** 不同于alpha chennel, opacity是整个element的property, 能够让整个element的透明度受到控制, <font color = grape>**包括text和button**</font>

```css
opacity: 0.3;
```

rgba的hex form一共有八位, 最后一位也是从00-FF表示透明度的变化跨度



### Position

[HTML](/Users/parallax/Documents/CIT&CIS/The Web Developer Bootcamp 2020/code/04 Other_Properties/Position/index.html) [CSS](/Users/parallax/Documents/CIT&CIS/The Web Developer Bootcamp 2020/code/04 Other_Properties/Position/app.css)

+ `position = static`, <font color = grape>**设置为static后, 其他top, left等property不会影响**</font> 

+ `position = relative`, <font color = grape>**设置为relative后, 以自身current position为参考, 比如 `top:50px` 会下移100px**</font>

  ```css
  #relative #middle {
      position: relative;
      top: 50px;
      left: 50px;
  }
  ```

+ `posiiton = absolute`, this element will be removed from document flow, 比如原本有三个square, 设置第二个为absolute, 那么他还存在于那个位置, <font color = red>but take no space, 所以第三个是出现在第二个的位置, 并且被第二个overlap住!</font>

  + absolute会使element自动position relative to <font color = grape>**closest positioned ancestor**</font> , 必须得是positioned的

<font color = red>**注意: 以上三个都必须在设置了top/left/right/bottom之后才会起效果, 如果只设置了一个fixed, 是不会有效果的!但下面两个不用!**</font>    

+ `position = fixed` , always relative <font color = grape>**initial containing block, 即使拖动页面也会一直存在!!!**</font> 
+ `position = sticky`, 一开始不fix to 页面, 一旦拖动超过了它原本的位置, 就会和fixed一样, <font color = grape>**一直存在于页面的某个位置**</font>



### Transition

[HTML](/Users/parallax/Documents/CIT&CIS/The Web Developer Bootcamp 2020/code/04 Other_Properties/Transition/index.html) [CSS](/Users/parallax/Documents/CIT&CIS/The Web Developer Bootcamp 2020/code/04 Other_Properties/Transition/app.css)

Transition可以让element实现动画效果! 比如原本是purple square, when hover, change to blue circle, 但是直接的变化太突兀了,需要动画

`transition: 1s`  <font color = grape>**就可以easily 让color和shape一起在1s内发生transition**</font>

但是实际的syntax 远复杂的多:

```css
Property Name | Duration | Timing Function | Delay
```

+ 首先不同的property name可以设置不同的transition时间, 如果不设置的话那就是immediately

+ 设置delay能够让当前property的transition的发生存在一个delay,  **比如此时总时间两个都是2s**

  ```css
  transition: background-color 1s ease-in 1s, border-radius 2s;
  ```

+ Timing Function 决定了transition的效果, 比如 `ease-in, ease-out, cubic-bezier`, <font color = gree>可以单独用`transition-timing-function` 来设置</font>

  ease-in是先慢后快, ease-out是先快后慢,参见[handy website](https://easings.net/)



### Transfrom

[HTML](/Users/parallax/Documents/CIT&CIS/The Web Developer Bootcamp 2020/code/04 Other_Properties/Transform/index.html) [CSS](/Users/parallax/Documents/CIT&CIS/The Web Developer Bootcamp 2020/code/04 Other_Properties/Transform/app.css)

这里不是transition这样的动画效果, 而是rotate/scale element本身!

+ `rotate(a)`, 这里a代表angle, 有多种单位表达, 比如`deg.grad.rad.turn`

  此处可以用上`transform-origin`, <font color = grape>**可以决定以那个地方进行tranform, 比如以下这样以右下角为旋转点**</font> 

  甚至可以把当前的element看作是3d上的一个平面, 然后就存在了`rotateX(), rotateY()` 甚至 `rotate3d()`, 绕xy轴旋转

  ```css
  transform-origin: bottom right;
  transform: rotate(45deg);
  ```

+ `scale()`, grow or shrink,  如果一个parameter就是倍数, <font color = gree>2个parameter就分别是horizontal和vertical的倍数</font>, 同样存在`scaleX(),scaleY()`

+ `translate()`, 单纯的平移, 需要2个parameter,或者写成`translateX()` 就只需要一个parameter

  ```css
  transform: translate(-100px, 50px);
  ```

+ `skew()` 倾斜element, parameter和rotate类似,都是度数

  <font color = gree>一个parameter默认是逆时针倾斜的程度, 2个paramter是horizontal(逆时针)和vertical(顺时针)倾斜的程度</font>

+ 以上所有都可以combine实现,比如

  ```css
  transform: rotate(-20deg) scale(1.3);
  transform: translateX(-500px) rotate(0.5turn) scaleY(1.5);
  transform: scale(0.7) translateX(500px);
  ```

  如果存在Cascade, 会按顺序发生, 比如在 more specific执行了`translateX(-500)`, 然后在general里面执行了`translateX(500)`, 最后会留在原地



### Hover Button

[HTML](/Users/parallax/Documents/CIT&CIS/The Web Developer Bootcamp 2020/code/04 Other_Properties/HoverButton/Solution/index.html) [CSS](/Users/parallax/Documents/CIT&CIS/The Web Developer Bootcamp 2020/code/04 Other_Properties/HoverButton/Solution/button.css)

实现光标移到button上的效果

```css
button {
    background: none;
    color:#ffa260;
    border: 2px solid;
    padding: 1em 2em;
    font-size: 1em;
    transition: color 0.25s, border-color 0.25s, box-shadow 0.25s,transform 0.25s;
}

button:hover {
    border-color: #f1ff5c;
    color: white;
    box-shadow: 0 0.5em 0.5em -0.4em #f1ff5c;
    transform: translateY(-0.25em);
    cursor: pointer;
}
```

color和 border-color会变化, box-shadow会出现, 整个button会向上移动**0.25 font size**, 具体效果见code



### CSS Background Truth

[HTML](/Users/parallax/Documents/CIT&CIS/The Web Developer Bootcamp 2020/code/04 Other_Properties/Background/index.html) [CSS](/Users/parallax/Documents/CIT&CIS/The Web Developer Bootcamp 2020/code/04 Other_Properties/Background/app.css)

如果background想用图片, 可以用`background-image`, syntax为

```css
background-image: url("https://images.unsplash.com/photo-1564442038901-4f9a19d3d456?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1227&q=80");
background-size: cover;
background-position: top;
```

此处 `background-size` will scale the image, 这里`cover` 会让image适应页面, 还有`contain` 等选择

`background-position` 决定了background starts position, <font color = grape>**就是类似用图片的上半部分还是下半部分**</font> 

==但实际上background本身有这个shorthand可以作为property使用==, syntax为

```css
background: center/cover url("https://images.unsplash.com/photo-1564442038901-4f9a19d3d456?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1227&q=80"), blue;
```

<font color = gree>**注意: `background-size` 必须出现immediately after `background-position`, 且用`/` 分隔开来**</font> 

而且事实上可以不止一个background, 比如可以直接在后面接一个color





### Google Fonts

[HTML](/Users/parallax/Documents/CIT&CIS/The Web Developer Bootcamp 2020/code/04 Other_Properties/GoogleFonts/index.html) [CSS](/Users/parallax/Documents/CIT&CIS/The Web Developer Bootcamp 2020/code/04 Other_Properties/GoogleFonts/app.css)

为了防止fonts的compatibility 问题, 有一个很简单的办法就是==直接在html中link 网上的fonts!==

[Google Fonts](https://fonts.google.com/) 只需选好字体, 然后选择embed就会可以直接复制link的code然后在css里add给定的parameter 

Google甚至对font有paring fonts, 给出了一些搭配组合!

<font color = gree>**注意: 从google fonts获取的font是固定font-weight的,在css里修改不会造成任何改变, 但是font-size这种可以改**</font> 

### PhotoBlog 

[HTML](/Users/parallax/Documents/CIT&CIS/The Web Developer Bootcamp 2020/code/04 Other_Properties/PhotoSite/Solution/photosite.html) [CSS](/Users/parallax/Documents/CIT&CIS/The Web Developer Bootcamp 2020/code/04 Other_Properties/PhotoSite/Solution/photos.css)

为了确保一行有三个image, 设置每个width分别为30%, 这样每一行只剩下10%的space

<font color = gree>三张image一共有6个margin, 所以每个margin是 `calc(10%/6)`, 这里calc会自动计算!</font> 

```css
nav {
    font-family: 'Raleway', sans-serif;
    font-size: 1.5em;
    /* 改成全大写 */
    text-transform: uppercase;
    /* 决定了inner content的宽度*/
    width: 30%;
    /* 由于padding设置了horizontal的为0,从而border width也被确定了 */
    border-bottom: 2px solid #f1f1f1;
    /* 对齐image */
    margin-left: calc(10%/6); 
    /* text到border的距离 */
    padding: 1.2em 0;
}
```

注意这里border width是等于width + horizontal padding = 30%, 再加上左边的`calc(10%/6)` margin, 可以做到和第一张图完全对齐!

