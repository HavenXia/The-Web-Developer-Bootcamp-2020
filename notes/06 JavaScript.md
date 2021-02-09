JS是前段三件套里面的Action

[Codes](06 Boolean_Logic)

### JS Introduction

<font color = grape>**只有五种:**</font> Number, string, boolean, null, undefined

次方是`**`, 其他和以前相同, ++, += 之类的也依旧存在

NaN代表not a number, 但是typeof(NaN)依旧是number,<font color = grape>**而且每个NaN都不相等**</font> 

undefined是not assigned, 比如`let x`,  <font color = grape>**此时x是undefined!**</font>, `let x = null` , 此时x不是undefined, 是明确的nothing(null)!

`parseInt(str)` 可以convert str to int! <font color = grape>**比如 `parseInt(prompt("please enter a number"))`**</font> , 如果不是数字返回NaN, 可以用<font color = gree>`!parseResult` 来检测!</font>

#### Syntax

+ Variable, `let a = 1` , Constant : `const b = 2` 不能change b, 否则error, <font color = gree>`var c = 2`是以前的用法</font>

  <font color = grape>**Js 支持type change, 可以直接用一个= 改变type!**</font>  Js也一般用CamelCase比较多!

#### String

+ `let a = "a"`

+ string加法存在,  但是string ** number并不存在, empty string存在! <font color = grape>**数字+str会自动convert num to str**</font>

+ Indice: `str[0]`即可, <font color = grape>**可以直接用index访问**</font>, length的syntax是 `str.length`, 没有()

+ `str.toUpperCase()`, **copy** and become uppercase. Also lowerCase

+ `str.trim()` remove white space at start and end

+ `str.indeOf(str2)`, 第一个index of 1st occurence of str2 in str1

+ Slice两种, `str.slice(i) ` <font color = grape>**从包括index 5开始到最后**</font>, `str.slice(i, j)` <font color = grape>**index i 到j,左开右闭**</font> 

  如果i是负数的话, <font color = grape>**就是take倒数几个char**</font>

+ Replace, `str.replace(a,b)` ,<font color = grape>**replace the first a in str as b**</font> , `str.replaceAll(a,b)` <font color = grape>**replace all a in str as b**</font> 

#### Template Literal

embed variable in string. <font color = grape>**注意这里用的是`这个符号!而不是quotos**</font>

`I bug ${quantity} items`, 可以实现在string中embed variable, 甚至可以直接用func, <font color = gree>`my name is ${name.toUpperCase()}`</font>

#### Math Object

+ `Math.floor()` 向下取整, `Math.ceil()` 向上取整
+ `Math.random()` 获得0-1decimal, 和floor和组合得到0-99所有值, `Math.ceil(Math.random() * 5)` <font color = grape>**得到1-5的随机值**</font> 

#### Boolean Operation

+ `===` strict equality, `!==` strict non-equality, <font color = grape>**char的比较也是用ascii 来比较的**</font> 
+ `==` <font color = grape>**只检查value,不检查type, 比如`1=='1', 0 == false`**</font>, 但是 `1 !== '1'`
+ `console.log()` print string, `console.warning()`和`console.error()` 都打出警告和错误
+ `alert(str)` <font color = grape>**不在console, 而是在website上打出警告 **</font>
+ `let a = prompt(str)` <font color = grape>**在web上抛出输入框, 然后a读取userInput as String**</font>
+ 比较primitive是比较值/type, 比较**object**的时候比的是reference, 所以[1] != [1]

#### If statement

+ <font color = gree>注意Js这里的print就是`console.log()`,  scan就是`prompt("xxxx")`</font>

  ```javascript
  const dayOfWeek = prompt('ENTER A DAY').toLowerCase();
  if (dayOfWeek === 'monday') {
      console.log("UGHHH I HATE MONDAYS!")
  } else if (dayOfWeek === 'saturday') {
      console.log("YAY I LOVE SATURDAYS!")
  } else if (dayOfWeek === 'friday') {
      console.log("FRIDAYS ARE DECENT, ESPECIALLY AFTER WORK!")
  } else {
      console.log("MEH")
  }
  ```

+ 也存在nested loops

#### Truthy and Falsy Values

有一些value默认是false的, 他们是<font color = grape>**`false, 0, "", null, undefined, NaN`**</font> , 所有剩下的都是inherit truthyness!

在用if 判定时会起到作用!

#### Arrays

`let a = [1, 2, 3]` 最普通的声明方式, `arr.length`也存在, <font color = grape>**Js的array可以different type!!很重要**</font>

+ Access的时候如果outofbound会==get undefined, but not error==

+ <font color = grape>如果给一个length为3的array设置`arr[10] = 1`, **arr会在中间填充多个undefined直到arr[10], 这点和其他都不一样!!!** </font>

+ `push`: add to end(可以push多个), return new length;  `pop():` remove from end and return it

+ `unshift` : add to start, `shift()` remove from start and return it

+ `arr1.concat(arr2)` 把arr2接在arr1后面, `a.inclueds(1)` 返回boolean, 类似contains

+ `a.indecOf(1)` return index of 1, `a.reverse()` <font color = grape>**in-place reverse order**</font>

+ `slice` 功能和python相同, <font color = grape>**不改变原array, return new array**</font>

+ `splice(startIndex, numberOfElement)`, <font color = grape>**从start Index开始In-place 删除! 可以方便做到删除array的一部分! **</font> 

  ==并且return从startIndex开始的一共element个数为numberOfElement 的array==

+ `splice(startIndex, numberOfElement, elem1, elem2)`, <font color = grape>**inplace删除后替换成new elements**</font>  

+ `arr.sort()` compare UTF-16 encoding, 并不是按大小来排

+ const的array是可以进行操作的, <font color = grape>**const是确保reference unchanged, 所以`a=[1]` 是不行的, 这是直接改变refernce!**</font>

+ <font color = grape>**JS是没有arr[-1]的, 只能用arr[arr.legnth - 1]**</font> 

#### Objects

Objects可以理解成collections of properties, each property is ==a key-value pair.==

```javascript
const person = {firstName: "Haven", lastName: "Xia"}
```

如何access 这些data? 和dict一样, 直接用bracket获取即可, 或者直接用dot即可

```javascript
person["fisrtName"]
person["fisrt" + "Name"]
person.firstName
```

underhood, every key is converted to ==String==

+ Modify objects, 直接`object.property = newValue` 即可,<font color = grape>**既可以modify existing property也可以create new property!**</font>

+ objects的property可以是array, 也可以是其他objects

+ <font color = grape>**甚至还可以是array of objects!**</font> 这个array的每个element都是一个object!

  ```javascript
  const comments = [
      {username: "a", text:"b", votes:9},
      {username: "c", text:"d", votes:10},
  ]
  ```



### JS Loops

和java的for loop几乎一样

```javascript
for (let num = 1; num <= 10; num += 1) {
    console.log(num);
}
```

itrate array, ==这个和其他语言不一样==

```javascript
for (let row of seatingChart) {
    for (let student of row) {
        console.log(student);
    }
}
```

String也可以用这个方法来遍历

```javascript
for (let char of "hello world") {
    console.log(char);
}
```

<font color = grape>**Iterate over objects!**</font>  需要用key value pair的形式来打

 ```javascript
for (let key in obj) {
    console.log(`${key} scored ${obj[key]}`);
}
 ```

可以用`let set = Object.values(obj)` 获取<font color = grape>**value set!**</font>, 然后可以直接loop on the value set.

[Todo list 小练习](06 Loops_CODE/TodoListProject/todos.js)

### Js Functions

Syntax

```javascript
function func(param1, param2) {
    // do sth
    return value;
}
```

Function Expression, <font color = grape>**这里的add是存储function name的variable, 但是不影响**</font>

```javascript
const add = function (x, y) {
    return x + y;
}
```

<font color = grape>**JS的function可以返回不同的type!这点非常特别! 比如这里可以做到xy得到不同的return value**</font> 

```javascript
function add(x, y) {
    if (typeof x !== 'number' || typeof y !== 'number') {
        return false;
    }
    return x + y;
}
```

#### Function Scope

==JS的function可以影响到function外的variable==

```javascript
let animal = "Giant Pacific Octopus";
function observe(){
    let animal = "Pajama Squid";
    console.log(animal);
}
observe();
```

<font color = grape>**这样会改变function内animal的value, 但是如果function内没有animal, 就会改变out of function的animal value!**</font>

如果一个variable is defined in one block, 那么就不能在==block 外access它, 但是its child block can access it==

#### Nested Function

如果要用nested function, 那要注意在parent function call child function

```javascript
function bankRobbery() {
    const heroes = ['Spiderman', 'Wolverine', 'Black Panther', 'Batwoman']
    function cryForHelp() {
        let color = 'purple';
        function inner() {
            for (let hero of heroes) {
                console.log(`PLEASE HELP US, ${hero.toUpperCase()}`)
            }
        }
        // 需要call inner
        inner();
    }
    cryForHelp();
}
```

#### High Order Function

JS的function可以作为param 传入其他function, <font color = gree>不加() 的时候function是作为param传入的, 加了()就是return value</font>

```javascript
function callTwice(func) {
    func();
    func();
}
function rollDie() {
    const roll = Math.floor(Math.random() * 6) + 1
    console.log(roll);
    return roll;
}
callTwice(rollDie); / 这样会call两次rollDie()
callTwice(rollDie()); / 这样会run一次rollDie()并且传入value
```

#### Return a Function

可以用一个variable来承接, 然后作为其他func运用!

```javascript
function makeBetweenFunc(min, max) {
    return function (num) {
        return num >= min && num <= max;
    }
}
const ifBetween = makeBetweenFunc(1,10);
ifBetween(2); / return true!
```



### JS Methods

JS里面methods是指object里面的functions! 这一点很奇特! 

<font color = grape>**可以在objects 中加上functions 作为property, 其实此时的object就是class!**</font>

Syntax有两种如下, <font color = gree>function的property是 name: function(param){}, 或者是name(param){}</font> 

```javascript
const myMath = {
    PI: 3.14159,
    square: function (num) {
        return num * num;
    },
    cube(num) {
        return num ** 3;
    }
}
myMath.square(2); /4
myMath.cube(2);  /8
```

既然是class了, 那么在定义内部function的时候自然就要用到**this**了!

```javascript
const cat = {
    name: 'Blue Steele',
    color: 'grey',
    breed: 'scottish fold',
    meow: function () {
        console.log("THIS IS:", this)
        console.log(`${this.name} says MEOWWWW`);
    }
}
cat.meow(); /会打出name
const meow() = cat.meow()l 
meow2(); /this会变成empty, 因为没有设置
```

这里meow2()的本质是 `window.meow2()`, window就是最外层的object, 所以不会有这些property!



### JS Try Catch

JS的不用单独说明是什么error, 直接try catch(e) 就行, 很方便

```javascript
function yell(msg) {
    try {
        console.log(msg.toUpperCase().repeat(3));
    } catch (e) {
        console.log("Please pass a string next time!")
    }
}
```

























