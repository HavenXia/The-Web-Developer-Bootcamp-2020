## EJS

如何能让搜索什么结果都展现一样的界面? Template, 用EJS来让返回的数据直接放在里面.

#### 在JS中必须做的environment configuration

```javascript
const express = require('express');
const app = express();
const path = require('path');
app.set('view engine', 'ejs'); // 其实就是set name 'new engine' to value 'ejs'
app.set(express.static(__dirname)); // 一定要做! 然后ejs里面就正常按照relative path就行了
```

<font color = grape>**`res.render('a.ejs')`**</font> 会默认发送同level下views 文件夹里的a.ejs to client, ==之前都是发送value,现在发送views==

##### 如果在directory外面启用

```javascript
const path = require('path');
app.set('views', path.join(__dirname, '/views')) //__dirnam代表ejs locate所在的文件夹路径
```

### EJS Syntax

+ 首先是在ejs file里使用javascript code,  code will run when render to client

```html
<%= 这里写javascript code %>
```

+ 接着是从js file里发送ejs到client, <font color = grape>**这里的home对应的是views 文件夹里面的home.ejs**</font> 

```javascript
app.get('/', (req, res) => {
    res.render('home')
})
```

+ <font color = gree>从js file 发送ejs到client, **并且向ejs传info**, 这里是rename num as rand</font>

```javascript
app.get('/rand', (req, res) => {
    const num = Math.floor(Math.random() * 10) + 1;
    res.render('random', { rand : num }) // 当然也可以就写个{num}
})
```

接着在ejs file里, 用` <%= rand %>` 来接收这个value!, 也可以用`<%= rand%2===0 ? 'EVEN' : 'ODD' %>` 来选择Even和Odd

+ Conditional in EJS, 实现if statement

非常诡异, <font color = grape>**ejs file中所有用`<% %>` wrap 起来的就是js, 完全不影响html本身**</font>

```html
<% if(rand % 2===0){ %>
	<h2>That is an even number!</h2>
<% } else { %>
	<h2>That is an odd number!</h2>
<% } %>
```

+ Loop in EJS

首先在js file里render a cat list, 然后在ejs里面同样很诡异的用for loop, <font color = grape>**注意这里定义的cat在inline js也能用!**</font> 

```ejs
<% for(let cat of cats) { %>
            <li>
                <%= cat %>
            </li>
            <% } %>
```

+ JS render json to ejs

同样也是可以完成的, <font color = grape>**首先读取subreddit, 然后获取json, render**</font>

```javascript
app.get('/r/:subreddit', (req, res) => {
    const { subreddit } = req.params;
    const data = redditData[subreddit];
    console.dir(data)
    if (data) {
        res.render('subreddit', { ...data });
    } else {
        res.render('notfound', { subreddit })
    }
})
```

### Partials

多个EJS通用的header, footer, navbar是可以<font color = grape>**存放在单独的directory以供使用的!**</font>

注意: navbar里点击link的href, 是在localhost:xxx后面加的内容!

<font color = grape>**多个ejs共用的部分可以单独做成ejs, 然后在views 文件夹创建partial 文件夹并放进去**</font>

```ejs
<%- include('partials/head')%>
<%- include('partials/navbar')%>
```

然后就可以用 include 语法来获取了, <font color = grape>**这里不用加`.ejs`**</font>



### ejs-mate (package to 实现partial)

让header和footer通用,比如写一个boilerplate.ejs(模板)

```ejs
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>BOILERPLATE!!!!</title>
</head>

<body>
    <h1>BEFORE</h1>
    <%- body %>
        <h1>AFTER</h1>
</body>

</html>
```

这样的话在其他的ejs里面, 就不需要这些header和footer了, 只需要在第一句写上

```ejs
<% layout('layouts/boilerplate') %>
```

然后这个ejs的内容就会自动在前面和后面加上`<%- body %>` 上下的内容, 这样每个ejs都只要写主体部分就好了!



<font color = grape>**接着对于这个boilerplate.ejs也可以在其中加入其他partial, 比如把navbar的code单独拿出来, 然后用**</font>

```ejs
<!-- include the navbar -->
<%- include('../partials/navbar') %>
```

来在boilterplate中加入navbar, 这样所有用这个layout 的ejs也都会有navbar, 好处是**让boilerplate不那么臃肿!**

