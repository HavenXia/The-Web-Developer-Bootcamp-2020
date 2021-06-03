Middleware can end the HTTP request by sending back a response with methods like `res.send()`

middleware 可以call下一个middleware

route: 根据url输入分配到不同的handler

### Morgan

[code](/Users/parallax/Documents/CIT&CIS/The Web Developer Bootcamp 2020/code/16 Middleware_Intro)

一个常用的middleware, 使用方式

```javascript
const express = require('express');
const app = express();
const morgan = require('morgan');
// 代表对于每个incoming request都会use morgan(‘tiny’)
app.use(morgan('tiny'));
```

此时的每个request都会在terminal里面打出response time



### Define custom middleware

首先要知道app.use会让每个request都执行其内容, <font color = grape>**如果app.use是一个`res.send("hello")`**那么每个request都会显示hello</font>

但是这样会不执行原本的东西!!! 所以需要next

```javascript
app.use((req, res, next) => {
    console.log(req.method, req.path);
    next();
    console.log("bye");
})
app.use((req, res, next) => {
    console.log("hello");
    next();
})
```

以上的code会让每一个request都print当前时间, 并且在这之后执行本来的任务!

<font color = gree>比如这里每一个request都会打出method和path, 比如`GET \dog`, 然后继续执行下一个middleware - 在这里是打出hello</font>

当middleware走完之后就会执行原来的request, 如果next() 后面还有语句, 会在所有的next()结束之后再执行, <font color = gree>比如这里bye会在hello之后</font>

<font color = grape>**注意: middleware的顺序也很重要, 大多数情况下要确保在handler上面**</font> 

#### More middleware practice

+ 在middleware中给每个request加上request的时间, 同时打出method+path

  ```javascript
  app.use((req, res, next) => {
      // 给req object加上新的property
      req.requestTime = Date.now();
      console.log(req.method, req.path);
      next();
  })
  app.get('/', (req, res) => {
      console.log(`REQUEST DATE: ${req.requestTime}`)
      res.send('HOME PAGE!')
  })
  ```

  这样最后我们能看到

  ```javascript
  App is running on localhost:3000 - 来自listen
  GET / - 来自middleware
  REQUEST DATE: 1622542816268 - 在middleware获取时间, 在get method中print
  GET / 304 - - 3.294 ms - 来自morgan的response time
  ```



+ 如果在**第一个middleware**后加上这条, 那么就会在GET /dogs后打出I love Dogs, 然后才是request data和morgan内容

  ```javascript
  app.use('/dogs', (req, res, next) => {
      console.log("I LOVE DOGS!!")
      next();
  })
  ```



+ <font color = grape>**设置404 route**</font>

  在code的最后写一个middleware, 能走到它的条件必然是上面没有任何render, send之类的东西, <font color = grape>**所有的handler都没有catch到这个request, 所以返回not found**</font>

  比如上面的handler有/, /dogs, /cats, 此时一个request with /birds 就会not found, 因为此时的status就是404 not found!

  ```javascript
  app.use((req, res) => {
      res.status(404).send('NOT FOUND!')
  })
  ```



+ <font color = grape>**密码验证功能**</font>

  首先要知道req.query代表什么, 比如写 `/secret?food=chicken`, <font color = grape>**那么req.query就是`{food: 'chicken'}`**</font>

  因此这里就是验证是否query有password以及是否password正确, 如果正确就通过next() 去handler

  如果错误就直接send 警告!

  <font color = gree>这里的verifyPassword可以让middleware不作用于所有的route, 而是把它assign,并且放在某个method的parameter</font> 

  实现<font color = grape>**specific route**</font>

  ```javascript
  const verifyPassword = (req, res, next) => {
      const { password } = req.query;
      if (password === 'chickennugget') {
          next();
      }
      res.send("YOU NEED A PASSWORD!")
  }
  // 作为这个get method的parameter存在!
  app.get('/secret', verifyPassword, (req, res) => {
      res.send('MY SECRET IS: Sometimes I wear headphones in public so I dont have to talk to anyone')
  })
  ```

  