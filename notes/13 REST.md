## GET vs POST Request

[code](/Users/parallax/Documents/CIT&CIS/The Web Developer Bootcamp 2020/code/13 RESTful_Routes_CODE)

在html 里对应的form要拥有对应的method

```html
<form action="http://localhost:3000/tacos" method="get">
    <input type="text" name="meat">
    <input type="number" name="qty">
    <button>Submit</button>
</form>
```

GET request的data是send via query string, 而POST request的data是send via request body

且get请求只用于查询, 不修改数据, 但是post请求还可以向服务器提交数据

在js file里面先require express框架, 监听端口, 然后写get和post

```javascript
const express = require('express');
const app = express();
// 监听
app.listen(3000, () => {
    console.log("ON PORT 3000!")
})
// 
app.get('/tacos', (req, res) => {
    res.send("GET /tacos response")
})

// 设置parse middleware, 这两句只要用post的req.body就必须写!
// To parse form data in POST request body:
app.use(express.urlencoded({ extended: true }))
// To parse incoming JSON in POST request body:
app.use(express.json())


// 可以取出req.body
app.post('/tacos', (req, res) => {
    // 此时的body是一个object, 读取其内容
    const { meat, qty } = req.body;
    res.send(`OK, here are your ${qty} ${meat} tacos`)
})
```

<font color = grape>**这里可以看出, POST可以parse the request body! **</font> 且必须choose middleware to parse request

如果req.body是json格式的话需要`app.use(express.json())` 来parse



## REST

[code](/Users/parallax/Documents/CIT&CIS/The Web Developer Bootcamp 2020/code/13 RESTful_Routes_CODE)

Represenetional State Transfer: guideline for how client+server communicate

有四种Http Verbs: GET/POST/DELETE/PATCH(更新) <font color = grape>**对象一般是数据库, 假定我们有个comments数据库**</font> 

<img src="https://live.staticflickr.com/65535/51201320122_87bfcf1705_o.png" alt="image-20210525190540839" style="zoom:40%;" />

#### Index 功能

GET /comments - list all comments, <font color = grape>**直接在地址栏输入然后回车发送的是GET request**</font>

<font color = grape>**comments/index指的是js同level的views/comments/index.ejs, 向这个ejs发送comments**</font>

```javascript
app.get('/comments', (req, res) => {
    res.render('comments/index', { comments });
})
```

然后在ejs里面用for loop 打出每个comment, **注意可以用anchor element来call 其他的request, 比如每个comment后加一个detail**

<font color = gree>注意: anchor element 的request is **GET**</font>

```html
<a href="/comments/<%= c.id %>">details</a>
```



#### New功能(相当于点击new, 去往一个填写comments的地方)

就像发布新的回复一样, 需要先点击回复按钮, 然后用get发送给client一个form to create new comment (比如回复框)

GET /comments/new - render form, 注意这里发送过去的ejs里的form element, 必须是写成接下来post用的action和method

```javascript
app.get('/comments/new', (req, res) => {
    res.render('comments/new'); // 其实发送的是views/comments/news.ejs
})
```

```html
<form action="/comments" method="post">
```



#### Create功能, 处理new.ejs的form提交的内容

POST /comments, <font color = grape>**和GET是分开的! 根据form的method来决定**</font> 

POST需要parse request body, 所以需要写上两个parse middleware, 这里的username和comment是ejs里定义的id

```javascript
app.post('/comments', (req, res) => {
    const { username, comment } = req.body;
    comments.push({ username, comment, id: uuid() })
    res.redirect('/comments');
})
```

一般post之后, 我们会redirect到之前的页面(这里是指new comment之前的页面), <font color = grape>**同样这里也是GET Request**</font>



#### SHOW 功能, detail of a comment

GET /comments/:id - get one comment with 对应id

```javascript
app.get('/comments/:id', (req, res) => {
    // req.params获取query string不需要parse
    const { id } = req.params;
    // 取出id的string,查找到comment object(uuid是string所以用===)
    const comment = comments.find(c => c.id === id);
    res.render('comments/show', { comment })
})
```

但是这里的id是用uuid() 随机生成的, 所以在comments的ejs里直接在每个comment后面接上

`<a href="/comments/new">New Comment</a>`, 这样就可以发送show request, 并且显示这个comment



#### EDIT功能(点击edit进入edit的form)

同样是get request, 这里id是query string, 查大奥comment之后发送edit.ejs以及comment即可

```javascript
app.get('/comments/:id/edit', (req, res) => {
    const { id } = req.params;
    const comment = comments.find(c => c.id === id);
    res.render('comments/edit', { comment })
})
```

<font color = grape>**但是注意, 对于patch request, 在edit.ejs里不能直接写成 `method = "patch"`**</font>, 因为html只有post和get

<font color = red>因此我们需要Override! 把post override成其他method, 通过在后面加**?_method=PATCH**来实现</font>

```javascript
const methodOverride = require('method-override') // 这是javascript
app.use(methodOverride('_method'))
```

```html
<form method="POST" action="/comments/<%=comment.id%>?_method=PATCH"> // 这是html
```

但这只是对于form而言, 一般的a href还是可以直接 `<a href="/comments/<%= comment.id%>/edit">` 的



#### UPDATE功能(提交edit的内容到server)

patch和put不同, put是整个替换!

<font color = grape>**这里foundComment是在database里的, newCommentText是来自req.body(也就是form里面的新comment)**</font> 

```javascript
app.patch('/comments/:id', (req, res) => {
    const { id } = req.params;
    const foundComment = comments.find(c => c.id === id);

    //get new text from req.body
    const newCommentText = req.body.comment;
    //update the comment with the data from req.body:
    foundComment.comment = newCommentText;
    //redirect back to index (or wherever you want)
    res.redirect('/comments')
})
```



#### DESTROY功能

直接在show.ejs加上了一个delete button, 同样也是使用了override

```html
<form method="POST" action="/comments/<%= comment.id %>?_method=DELETE">
    <button>Delete</button>
</form>
```

也是取出id, 然后用<font color = grape>**filter来从comments中取出所有不等于id到comment, 放入new array然后再assign给comments**</font>

```javascript
app.delete('/comments/:id', (req, res) => {
    const { id } = req.params;
    comments = comments.filter(c => c.id !== id);
    res.redirect('/comments');
})
```

