## Async JavaScript

+ Call Stack: 就是一个function的stack, 最先call的function在stack最下面, 如果里面call了其他func, 就继续往stack上放, 一旦完成就pop掉, <font color = grape>**可以直接在chrome的source里面看到**</font>

+ Single Threaded: JS 永远只能process one line code at a time

+ Web API: Brower 会帮js做一些task, 比如`setTimeCount` 就是web API做的, js会继续执行下一行code

+ Callback Hell: 多层nested callback function, 实现一些奇怪的function

+ Promises: 难以解释, just use then and catch

  注意这里的data和err是作为param来<font color = grape>**catch Promise里面的两句string**</font> <font color = gree>**这里每一步return的都是promise! 必须用.then才能获取content**</font>

  ```javascript
  const fakeRequestPromise = (url) => {
      return new Promise((resolve, reject) => {
          const delay = Math.floor(Math.random() * (4500)) + 500;
          setTimeout(() => {
              if (delay > 4000) {
                  reject('Connection Timeout :(')
              } else {
                  resolve(`Here is your fake data from ${url}`)
              }
          }, delay)
      })
  }
  
  fakeRequestPromise('yelp.com/api/coffee/page1')
      .then((data) => {
      console.log("IT WORKED!!!!!! (page1)")
      console.log(data)
      return fakeRequestPromise('yelp.com/api/coffee/page2')
  })  // 这里的then承接的是return的page2
      .then((data) => {
      console.log("IT WORKED!!!!!! (page2)")
      console.log(data)
      return fakeRequestPromise('yelp.com/api/coffee/page3')
  })  // 这里的then承接的是return的page3
      .then((data) => {
      console.log("IT WORKED!!!!!! (page3)")
      console.log(data)
  })  // 一旦reject, catch err
      .catch((err) => {
      console.log("OH NO, A REQUEST FAILED!!!")
      console.log(err)
  })
  ```

#### Create Promise

首先写一个promise function, <font color = grape>**注意特点是return一个promise, 其param是reslove和reject**</font>

```javascript
const fakeRequest = (url) => {
    return new Promise((resolve, reject) => {
        const rand = Math.random();
        setTimeout(() => {
            if (rand < 0.7) {
                resolve('YOUR FAKE DATA HERE');
            }
            reject('Request Error!');
        }, 1000)
    })
}
```

有的可能只有一层, 如果resolve也就一次print

```javascript
fakeRequest('/dogs/1')
    .then((data) => {
    console.log("DONE WITH REQUEST!")
    console.log('data is:', data)
})
    .catch((err) => {
    console.log("OH NO!", err)
})
```

<font color = gree>如果想要nested, 每次.then里面就需要在call一次callback function</font>

```javascript
const delayedColorChange = (color, delay) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            document.body.style.backgroundColor = color;
            resolve();
        }, delay)
    })
}
delayedColorChange('red', 1000) // 这里用的arrow, 实际上每次都是return了function
    .then(() => delayedColorChange('orange', 1000))
    .then(() => delayedColorChange('yellow', 1000))
    .then(() => delayedColorChange('green', 1000))
    .then(() => delayedColorChange('blue', 1000))
    .then(() => delayedColorChange('indigo', 1000))
    .then(() => delayedColorChange('violet', 1000))
```

#### Async Function: 美化promise

+ Async keyword会让function自动return Promise, <font color = grape>**不需要单独创建了! 且return 的value自动作为resolve, throw的value自动作为reject!**</font> 当然这里, throw必定会先于return, 所以.then永远不会执行

  ```javascript
  const sing = async () => { 
      throw "OH NO, PROBLEM!" // 自动作为reject的err
      return 'LA LA LA LA' // 自动作为resolve的data
  } 
  
  sing()
      .then(data => {
      console.log("PROMISE RESOLVED WITH:", data)
  })
      .catch(err => {
      console.log("OH NO, PROMISE REJECTED!")
      console.log(err)
  })
  ```

+ 具体应用, password, 先测试是否没填, 在测试password!

  ```javascript
  const login = async (username, password) => {
      if (!username || !password) throw 'Missing Credentials'
      if (password === 'corgifeetarecute') return 'WELCOME!'
      throw 'Invalid Password'
  }
  
  login('todd', 'corgifeetarecute')
      .then(msg => {
      console.log("LOGGED IN!")
      console.log(msg)
  })
      .catch(err => {
      console.log("ERROR!")
      console.log(err)
  })
  ```

#### Await Keyword

await能够简化.then, 让async function 按顺序运行, 和普通function的区别? <font color = grape>**普通function是做不到让这些code明确做完一行在做下一行的,特别是带上了时间!**</font> 如果普通的设置背景, 那么每一条都会覆盖上一条, 而async和await能够实现一条接一条!























