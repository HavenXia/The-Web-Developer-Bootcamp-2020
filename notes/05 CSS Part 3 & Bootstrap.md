# CSS FlexBox

让container能够适应页面的shrink和拉伸, 对应不同的size可以改变container内部的比例 `display:flex;`

[HTML](/Users/parallax/Documents/CIT&CIS/The Web Developer Bootcamp 2020/code/05 Flexbox_And_Responsive/Flexbox Starter/index.html) [CSS](/Users/parallax/Documents/CIT&CIS/The Web Developer Bootcamp 2020/code/05 Flexbox_And_Responsive/Flexbox Starter/app.css)

比如一个container里面有多个div: 不同于把div设置成inline-block, 这里实质上是让div flex的呈现在container里面

<font color = grape>**如果divs的总width/height超过了container的width/height, 会自动适应container, 如果有足够空间就还是按照div自己**</font>

+ `flex-direction` 决定了flex的方向: row(**cross axis is vertical**)  column(**cross axis is horizontal**) row-reverse column-reverse

+ `justify-content`  ==Along Main-Axis==决定了这些**direct child** div是 <font color = grape>**居左,居中还是居右, 注意这还是受制于container的**</font>

  ·比如space-between和space-around, space evenly都是间隔相同, 但是边界分别是无缝, 半个间距,一个间距

+ `flex-wrap`  决定了flex elements 是否force onto one line 还是允许multiple line

  如果设置为wrap-reverse, 会<font color = grape>**改变corss axis 的direction为bottom to top**</font>

+ `align-items`==Along Cross-Axis==决定了alignment of items on the <font color = grape>**Cross Axis(即FlexBox的vertical axis, 另一条叫Main Axis)**</font> 

  如果div里面有text, 并且设置`align-items:baseline;` 那么div会按照text的对齐来排列

+ `align-self` 决定了单独element的`align-item`

+ `align-content` 决定了<font color = grape>**wrap**</font>情况下, 控制不同content之间space的alignment, `center` 就直接贴紧



#### 对于container内部的elements

+ `flex-basis` ==Along Main-Axis== 决定了initial main size of a flex item

+ `flex-grow` 决定了the flex **grow factor** of a flex item's main size(这个size是flex-direction的方向)

  <font color = gree>比如1st div 设为1, last div设为2, 那么他们肯定会填满整个container, 但是last div增长的size必定是1st div的两倍!</font>

+ `flex-shrink` 决定了the flex **grow factor** of a flex item's main size, <font color = grape>**设置为0时可以强制不shrink**</font>

#### Flex Shortand

[HTML](/Users/parallax/Documents/CIT&CIS/The Web Developer Bootcamp 2020/code/05 Flexbox_And_Responsive/Flexbox/index.html) [CSS](/Users/parallax/Documents/CIT&CIS/The Web Developer Bootcamp 2020/code/05 Flexbox_And_Responsive/Flexbox/app.css)

<font color = grape>**Shorthand: `flex`**</font>: 不同参数量代表的不一样, 查阅MDN

```css
/* Two values: flex-grow | flex-basis */
flex: 1 30px;
/* Two values: flex-grow | flex-shrink */
flex: 2 2;
/* Three values: flex-grow | flex-shrink | flex-basis */
flex: 2 2 10%;
```



# Responsive Design: Media Queries

自适应浏览器页面 [HTML](/Users/parallax/Documents/CIT&CIS/The Web Developer Bootcamp 2020/code/05 Flexbox_And_Responsive/MediaQueries/index.html)   [CSS](/Users/parallax/Documents/CIT&CIS/The Web Developer Bootcamp 2020/code/05 Flexbox_And_Responsive/MediaQueries/app.css)

+ 可以根据Viewport的width来设置不同的css样式, 也可以用逻辑词设置更多条件

  ```css
  @media (min-width: 1000px) and (max-width: 1200px){
      h1 {
          color: yellow; 
      }
  }
  ```

+ 也可以根据Viewport的Orientation来设置

  ```css
  @media (orientation: landscape) {
      body {
          background-color: magenta;
      }
  }
  ```

  

# Pricing Panel Mini Project

Reset CSS: 消除浏览器inconsistence的style, [link](https://meyerweb.com/eric/tools/css/reset/)





# Bootstrap

The world's most popular CSS framework!

很多Responsive design根本不需要自己设计, 直接用bootstrap即可, 所以CSS果然不用自己考虑太多!

用bootstrap的时候甚至不需要自己写css, <font color = grape>**直接复制cdn的link贴在html即可! 同时还有几行script也要贴一下**</font>

<font color = gree>然后再这个link下再放一个自己的css link, 就能修改自己想修改的东西了!</font>

#### 使用

只要照着document来, class之类的写对了就可以

#### Buttons

如果用<a>并且用了button的class, 会自动生成botton样式的link

button的大小也能通过class来进行设置, 我猜text也可以这么设置

#### Alignment

直接用text-center, 之类就可以直接放在中间! 没有设计感的福音!

#### Button Group

直接对几个button套个div就能实现!

#### Alert

可以用Dismissing alert, 就是点击完会删掉的那种



# Bootstrap Grid

[CSS](05 Bootstrap/Grid/index.html)

<font color = grape>**上面都是elements, grid是真正的layout设计**</font>

<font color = red>Only work inside of container class</font> 

美一行都是row class, <font color = grape>**可以被分成一共12个unit!**</font>





















