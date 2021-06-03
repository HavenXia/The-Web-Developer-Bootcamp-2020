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

[HTML](05 Bootstrap/Grid/index.html)

<font color = grape>**上面都是elements, grid是真正的layout设计**</font>,<font color = red>Only work inside of container class</font> 

每一行都是row class, <font color = grape>**可以被分成一共12个unit!**</font>

- (xs) — screen width < 576px (This is the “default” tier)
- sm — screen width ≥ 576px
- md — screen width ≥ 768px
- lg — screen width ≥ 992px
- xl — screen width ≥ 1200px

#### Responsive grid

当经过breakpoint的时候, grid的layout会发生变化

`col-breakpoint-units` <font color = grape>**当not reach(大于) breakpoint时, take n units, 当到达breakpoint(<=)时, 占据整行**</font>

也可以写成`<div class="col-12 col-sm-6">Column</div>`, reach breakpoint就take 12 units!

#### 几种Responsive设计

+ Stack To Horizontal, 如果每个div只用了一个col class, 那么当达到breakpoint时会stack起来

+ <font color = grape>**写多个class,实现mix and match, 比如`col-md-6 col-xl-3`**</font>, 小于medium整行,接着6, 最后3

  对于图片也能使用!

+ `image-fluid` 可以让image自动size

+ <font color = grape>**可以有nested row的设计, 比如左边是6, 右边是6*0.8 = 4.8, 需要用justify-content-center来让这个4.8存在于6的中间**</font>

+ <font color = grape>**垂直居中对齐 是在row class后面加align-items-center, 水平居中是text-center**</font>

+ 还有`order` 属性可以设置在不同的breakpoint下,同一个row里面的col出现顺序

#### Useful Grid Utilities(都可以用breakpoints!)

+ Grid Alignment, 每个row都是flex, 直接可以选择`<div class="row align-items-center">` 来align

  同样对于每一row里面的div, 也能设置自己的align, `<div class="col-3 bg-info align-self-end">`

+ <font color = grape>**同样也有justify- content,用来决定每个div的spacing, 和responsive一样选择spacing 关系**</font> 

  `class="row justify-content-center justify-content-lg-start justify-content-xl-between"`

  比如这里就是<font color = gree>大于xl用between, 接着大于lg用start, 最后剩余的用center</font>

+ <font color = red>**记住: row中多个col对齐用align-items-center, 每个col中文字居中用text-center, 整个row让col居中用justify-content-center**</font> 

# Bootstrap Forms

[HTML](/Users/parallax/Documents/CIT&CIS/The Web Developer Bootcamp 2020/code/05 Bootstrap/Forms/index.html)

需要`form-group` class来把label和input wrap起来

当然, form-group这个div也能设置breakpoint, `<div class="form-group col-md-6">`

<font color = grape>**对于input elements, class = form-control 非常重要! 它让普通的html input适配了Bootstrap**</font>

+ set input height, 给form-control加上大小即可, 如 `class="form-control form-control-lg"`

+ Set input width, 这里需要用`form-row` 来wrap一行里需要的divs, 然后为div设置breakpoint

#### CheckBox和Radios不用form-control

<font color = red>首先注意checkbox和radios是多个class在一个form-group里面的!</font>

一种是用`form-check class` 来设置stack或者inline的option

第二种是<font color = grape>**Custom Forms**</font>, 会用到custom-control 和 custom-control-input

```html
<div class="form-group">
    <div class="custom-control custom-checkbox">
        <input type="checkbox" class="custom-control-input" id="tos">
        <label class="custom-control-label" for="tos">Sign Me Up</label>
    </div>
</div>
```

还能实现switch之类很多有意思的东西!

#### Input Group

类似于search bar那样在input左右side 加add-on

此时这个add-on必须是在一个class = prepend/append的div里面, 用来确定add-on在input的哪一边

#### Validator

Bootstrap 有validator可以验证当前的input, 并且可以设置validation feedback, 需要JS的配合





# Bootstrap Navbar

[HTML](05 Bootstrap/Navbars/index.html)

Navbar能够做到在缩到很小的时候 ,直接变成一个dropdown! 

+ Brand: 由nav element wrap的a element, 中间也能有图片, <font color = grape>**Navbar开头的图标**</font>

+ Navs: Navbar的每个nav都是 anchor element, 且`class="nav-item nav-link"`

+ 所有的navs都要被一个div wrap, 且`class="collapse navbar-collapse"`, 让navs collapse

  同时, 在最外围的Nav class需要设置<font color = grape>**navbar-expand-sm**</font>, 实现>= sm, 就展现这些navs, 同时这个class也能设置`fixed-top` , 让navbar固定! `sticky-top` <font color = grape>**则更智能, 当走到这个navbar的时候才开始fixed!**</font> 

#### Toggle Navbar when breakpoints

首先需要一个hamberger button, 点击即可出现下拉菜单

```html
<button class="navbar-toggler" data-toggle="collapse" data-target="#expandme">
    <span class="navbar-toggler-icon"></span>
</button>
```

<font color = grape>**注意: 这里的data target必须是设置nav collaspe的div element的id!**</font>

接着还可以在navbar上加search bar之类的, 都可以直接抄document

注意: 当breakpoint之后,  search bar也会消失, 这是bootstrap css设置好的, 然后展开也只能展开data-toggle的目标!

#### Navbar 从透明到实体

因为一直透明的话, navbar会和走过去的content重合



# Bootstrap Icons

[HTML](05 Bootstrap/Icons/index.html)

直接在bootstrap找到想要的icon, 然后copy code

直接接在需要用的h1, button里面之类的, <font color = grape>**可以通过em设置width and height, 这样方便接在text后面,保证相同size**</font>



# Other Utilities & Components

[HTML](05 Bootstrap/Utilities/index.html)

+ Border: 直接在需要的element class里面加上`border rounded shadow ` 之类的, 还能控制哪一边的border出现

+ Shadow: 也能控制出现的位置, 透明度之类的

+ Spacing: start with m or p, 比如 `p-0 p-1` 之类的就是padding. `mb-5`就是margin-bottom 设置5

  组合`p-0 pt-5` 就是先设置四边的padding, 再单独设置top的padding

  <font color = grape>**甚至这里也能设置breakpoint, `p-0 p-sm-1 p-md-2` 设置不同情况下的padding**</font>

+ Display: 可以设置reach breakpoint的时候直接不显示, `d-none d-sm-block`

+ Card: 卡片状的element
+ Carousel: 网站主页可以左右滑动的slide
+ Spinner / Modal



# Bootstrap Project

Museum of Candy. 值得学习

[代码](/Users/parallax/Documents/CIT&CIS/The Web Developer Bootcamp 2020/code/05 Bootstrap Project/13_Museum_Of_Candy/Starter/index.html)

