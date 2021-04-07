## Callback & Arrow function

+ forEach function 

  对array用forEach method, 并且 <font color = grape>**在for Each的括号里面定义对于每个element的function.**</font>注意array的每个element也可以是object!

  ```javascript
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
  numbers.forEach(function (el) {
      if (el % 2 === 0) {
          console.log(el)
      }
  })
  ```

+ Arrow function: 可以简化function expression, ==甚至可以省略return keyword, 此时大括号变成小括号并且去掉分号==

  ```javascript
  /正常的function
  function add (x, y) {
      return x + y;
  }
  / arrow function, 以下几种都一样
  const add = (a, b) => {
      return a + b;
  }
  const add = (a, b) => a + b;
  / 如果没有param就直接写()
  const rollDie = () => Math.floor(Math.random() * 6) + 1;
  ```

  <font color = grape>**注意: arrow function里面必须是one line short function**</font>

+ map function: 对array的每个element进行操作并存储在新的array==并返回==

  ```javascript
  const doubles = numbers.map(function (num) {
      return num * 2;
  })
  ```

  用arrow function简化

  ```javascript
  const newMovies = movies.map(movie => (
      `${movie.title} - ${movie.score / 10}`
  ))
  ```

+ 当想delay the exexutation of current function, 可以用setTimeout

  这里其实用到了arrow function, ==且param是()==, 接着内容是print

  ```javascript
  setTimeout(() => {
      console.log("...are you still there?");
  }, 3000)
  ```

  同时还有setInterval可以设置, 设置每2000ms运行一次, 接着用clearInterval来停止

  ```javascript
  const id = setInterval(() => {
      console.log(Math.random());
  }, 2000);
  / 这里param是id,本质上是停止id的interval assignment!
  clearInterval(id);
  ```

+ filter method, 同样是对array的function, 但是不同于map, 是filter一部分东西出来, <font color = grape>**并存到新array中**</font> 

  <font color = grape>**这里的n和map method里面一样, 都是代表array中的每个元素**</font>

  ```javascript
  const smallerThanTen = numbers.filter(n => {
      return n < 10
  })
  const smallerThanTen = numbers.filter(n => n < 10)
  ```

+ Some和Every都接在 array后面, return boolean

  <font color = grape>**every要求全返回true, some要求只要有返回true就行**</font> 

  ```javascript
  exams.every(score => score >= 75)
  movies.some(movie => movie.year > 2015)
  ```

+ Reduce, 把array变成一个variable并return, <font color = grape>**比如求和/最大/最小值**</font> 

  这里的total和min会初始化为第一个element, 然后price从第二个element开始loop, <font color = grape>**这里的return值总是第一个param下一轮的值**</font>

  这里的100是second argument, <font color = grape>**能够initialize first param, 此时total=100, price从第一个element开始loop**</font>

  ```javascript
  const total = prices.reduce((total, price) => total + price)
  const total = prices.reduce((total, price) => total + price, 100)
  const minPrice = prices.reduce((min, price) => {
      if (price < min) {
          return price;
      }
      return min;
  })
  ```

+ <font color = gree>keyword 'this' in arrow functions refers to **the value of 'this' when the function is created**</font>

  总之就是需要通过外层的function keyword来告诉里面的arrow function, 此时的this是object而不是window!

  <font color = grape>**一句话, 有this就别想着省略老实写!**</font>



## Newer Features

#### Default Param

直接在param里设置default param, 如果没有输入这个param就按照default值来做, <font color = grape>**比如这里默认6面**</font> 

```javascript
function rollDie(numSides = 6) {
    return Math.floor(Math.random() * numSides) + 1
}
```

### Spread

+ Function: 比如Math.max(a,b,c) 是对param为number使用的, 但是比如有一个array, 可以用spread来传入, <font color = grape>**符号为`...arr`**</font> 

  ```javascript
  const nums = [13, 4, 5, 21, 3, 3, 1, 2, 7, 6, 4, 2, 53456];
  Math.max(nums) //NaN
  Math.max(...nums) //53456
  ```

  如果是string, `...str` <font color = grape>**会把string拆分成一个一个char然后print出来!**</font>

+ Array Literal: 合并两个small array to big array

  ```javascript
  const allPets = [...cats, ...dogs, "chicken"];
  ```

+ Object: 可以合并两个object, ==但是如果有overlap的key, 会按order取最后一个==

  ```javascript
  const feline = { legs: 4, family: 'Felidae' };
  const canine = { isFurry: true, family: 'Caninae' };
  const catDog = { ...feline, ...canine, id:1};
  // output 的family是Caninae
  ```

+ <font color = grape>**既然可以用spread展开array, 那么也可以输入展开的结果, collect as array!**</font> 比如这里输入一串数字, 把**第一个数字以外**的读取为nums array, 然后就可以用reduce来oneline 完成sum的function了

  ```javascript
  function sum(a, ...nums) {
      return nums.reduce((total, el) => total + el) + a;
  }
  ```

+ Destructing Array: 对存在的array, ==assign每个element to a variable!==

  ```javascript
  const scores = [929321, 899341, 888336, 772739, 543671, 243567, 111934];
  const [gold, silver, bronze, ...everyoneElse] = scores; // everyoneElse 是一个array
  ```

+ Destructing Object: 对存在的object也可以这样assign, <font color = grape>**但是注意object不是按顺序而是按key的value, 读取是也可以rename!**</font>

  ```javascript
  const user2 = {
      email: 'Stacy@gmail.com',
      firstName: 'Stacy',
      lastName: 'Gonzalez',
      born: 1987,
      city: 'Tulsa',
      state: 'Oklahoma'
  }
  // born rename为birthYear, died rename 为deathYear, 如果object没有died, 那么默认为N/A
  const { email, firstName, lastName, city, bio, born: birthYear, died: deathYear = 'N/A'  } = user; 
  ```

+ Destructing Params: 比如一个object有多个property, 但是param只需要object的一部分value, <font color = grape>**take and assign 就够了**</font>

  ```javascript
  function fullName({ firstName, lastName }) {
      return `${firstName} ${lastName}`
  }
  // 如果是array of object也可以这样取用, 这里是取movie array里面每一个movie并且return 一句话
  movies.map(({ title, score, year }) => {
      return `${title} (${year}) is rated ${score}`
  })
  ```

  























