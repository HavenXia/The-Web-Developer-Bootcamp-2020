# Terminal

+ `ls` 列出当前directory所有文件
+ `pwd` show当前working directory
+ `cd` 进入文件夹, 一个单词可以不加double quote
+ `cd ..` 返回上一级directory
+ `mkdir` 创建directory
+ `man ls`, 可以查看ls可以使用的flag
+ `touch` 创建file, 可以一次创建多个
+ `rm` 用来remove files
+ `rmdir` remove empty directory
+ `rm -rf` remove whole directory

# NodeJs

`node` 可以进入node REPL, <font color = grape>**没有window也没有document, 只有global, 此时可以直接用内置method**</font> 

`node app.js` 可以在没进入node的情况下run app.js

`process` 代表当前node 的process, <font color = grape>**有working directory, version, release等很多信息**</font>

`process.argv` 返回两个param分别是node的路径,和js的路径

<font color = grape>**如果输入`node app.js a b`**</font> 那么a和b会以string的形式作为process.argv接在前两个param后面, ==在jsfile里面可以通过process.argv获取!==

这样就实现了从terminal传参数到js里! 比如这里就能print fuck

```javascript
console.log(process.argv[2])
node app.js fuck
```

##### File System

可以实现在js里control file system, 需要用到File System

+ `const fs = requre('fs')` <font color = grape>**首先需要require才能获得**</font>, 不能直接像process一样用

+ `fs.mkdir` 可以用来创建directory, 具体查看documentation! <font color = grape>**这是async的做法, 需要callBack**</font>

+ `fs.mkdirSync` 这是sync的做法, 不需要任何callBack, 直接`fs.mkdirSync('a')`

  可以通过`process.argv[2] || "Project"` 这样的方法来实现在terminal命名

+ `fs.writeFileSync()`<font color = grape>**可以实现在folder里面加file**</font> , 比如

  ```javascript
  try {
      fs.mkdirSync(folderName);
      fs.writeFileSync(`${folderName}/app.js`)
  } catch(e) {
      console.log(e)
  }
  ```

  

# Modules

在x.js file里写上 `module.exports.a = sth` , <font color = grape>**此时运行其他js file内的`require(x)` 就会得到对应的内容**</font>

如果在x.js写了多个exports, 那么在其他y.js file里得到的就是一个object, 可以用`const {a,b} = require(x)` 来获取对应的property

Shortcut: 可以省略modules`exports. a= b`, <font color = grape>**并且直接写成一个object**</font> 

```javascript
module.exports = {
    name: 'sadie',
    color: 'black'
}
```

同样也可以Require a Directory! 

### NPM

既是A library of thounds of packages, 也是a command line tool to easily install and manage packages in Node projects

`npm` 用来安装package, 会生成node-modules文件夹, <font color = red>**完全不要动它!!!!**</font> 安装的syntax是先`npm init` 再 `npm i xxx`

然后可以直接用<font color = grape>**`require(packageName)` 来获取它, 并且用`console.dir()` 来查看, 同样read json也可以用这个**</font>

```javascript
let jokes = require("give-me-a-joke")
//这是一个call back function
jokes.getRandomDadJoke(function (joke) {
    console.log(joke);
})
```

#### Package.json

`npm.init` 可以直接创建一个package.json, <font color = grape>**record of what we are using**</font> 

注意: `package-lock.json` gets automatically created with the newest versions of npm, currently. 

​		All it does is "lock-in" the versions of the dependencies you installed.  <font color = grape>**方便别人使用**</font> 

#### Dependencies

<font color = grape>**如果直接用别人的代码, `npm install`能够在有package.json的情况下, 自动把dependencies所有的module都下载下来!**</font>



# Frame: Express

建立listen request 的server

```javascript
const express = require("express");
const app = express(); // 对于express需要 return a express() application!
```

<font color = red>注意下面这些call back function不是在定义, 而是在run</font> 

+ `app.listen(port, function)` 设置what to do when listen to port

  ```javascript
  app.listen(8080, () => {
      console.log("LISTENING ON PORT 8080")
  })
  ```

  当用node让它run起来的时候,<font color = grape>**可以在浏览器输入`localhost:port` 来访问!**</font> 

+ `app.use(req, res)` 会在 **每一次收到request的时候** 执行

  ```javascript
  app.use((req, res) => {
      console.log("WE GOT A NEW REQUEST!!")
      res.send('<h1>This is my webpage!</h1>')
  })
  ```

  + request是一个object, 当在`localhost:port` 后面加`/sth`的时候,  <font color = grape>**request里面就会收到这个**</font>

  + response是一个object, 可以`send` 不同的东西to webpage(`console.log()`是print在terminal的!)

    <font color = grape>**此处send html是可以在webpage里面实现的!**</font>

    ```javascript
    res.send('<h1>This is my webpage!</h1>')
    ```

+ 如何针对different request have different response? 

### Get Request: app.get(), app.post()

Catch different request and make different response

+ `app.get('/sth',(req, res))` <font color = grape>**会exact 根据收到的request作出回应**</font>

==如果此处只有斜杠没有sth, 那么就等同什么都没加, 但是这不等于use!! use是在任意的request的时候都会执行!==

+ `app.get('*',(res,res))` 代表为所有的get request都设置了一种, <font color = grape>**适合作为找不到时的通用回答, 必须放在最后!**</font>

+ `app.get('/a/:b',(res,res))` <font color = grape>**可以match 所有格式为`/a/sth`的格式, 注意, 如果是`/a/b/c`就不能match, 是根据`/:`来决定的**</font>

  <font color = gree>同时可以用`req.params`来获取b的string 内容, 所以可以直接用`const{b} = req.params` 来获取!</font> 

  ```javascript
  app.get('/r/:subreddit', (req, res) => {
      const { subreddit } = req.params;
      res.send(`<h1>Browsing the ${subreddit} subreddit</h1>`)
  })
  ```

+ ``app.get('/a/:b/:c',(res,res))``  <font color = grape>**可以match 所有格式为`/a/sth/sth`的格式, 从而可以实现各种request**</font>

  ```javascript
  app.get('/r/:subreddit/:postId', (req, res) => {
      const { subreddit, postId } = req.params;
      res.send(`<h1>Viewing Post ID: ${postId} on the ${subreddit} subreddit</h1>`)
  })
  ```

app.post() 是get的升级版, may involve anything, like storing or updating data, or ordering a product.

### Query String

就是查询网址时`/search` 后面跟着的`?q=sth`, <font color = grape>**注意这样的也会被`get('/search')` catch到! 可以用`res.query`获取**</font> 

```javascript
app.get('/search', (req, res) => {
    const { q } = req.query; / 这里其实是把search term存到了q里, 当然本身的key也是q
    if (!q) {
        res.send('NOTHING FOUND IF NOTHING SEARCHED!')
    } else {
        res.send(`<h1>Search results for: ${q}</h1>`)
    }
})
```



## Deal with input

在某个web, 输入任何input, <font color = grape>**都会被存储到当前form的request里, 可以通过req.body.name获取, 这个name就是每个input element的name**</font>

想要form能够pair with js, 必须在form里声明正确的<font color = grape>**action和method!**</font> 

```ejs
<form class="userInput" action="/your-schools" method="post">
```



































