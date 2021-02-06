JS是前段三件套里面的Action

[Codes](06 Boolean_Logic)

### JS Introduction

<font color = grape>**只有五种:**</font> Number, string, boolean, null, undefined

次方是`**`, 其他和以前相同, ++, += 之类的也依旧存在

NaN代表not a number, 但是typeof(NaN)依旧是number,<font color = grape>**而且每个NaN都不相等**</font> 

undefined是not assigned, 比如`let x`,  <font color = grape>**此时x是undefined!**</font>, `let x = null` , 此时x不是undefined, 是明确的nothing(null)!

`parseInt(str)` 可以convert str to int!

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

+ 

















