## SQL vs NoSQL 

SQL: relational database, prefine a schema of table before insert anything

<font color = grape>**Relational Database, 多个table间有关系, 比如一个table是post, 另一个table是comments, 通过post_id 两个表可以联系起来**</font>

NoSQL: can put any types of data into it, including document, key-value and graph.

<img src="/Users/parallax/Library/Application Support/typora-user-images/image-20210526153441652.png" alt="image-20210526153441652" style="zoom:50%;" align = "left"/>



## MongoDB

[documentation](https://docs.mongodb.com/manual/)

```bash
brew services start mongodb-community@4.4
brew services stop mongodb-community@4.4
// 每次开机输入一次
mongod --config /usr/local/etc/mongod.conf --fork
```

然后输入mongo进入mongo shell, 此时可以使用javascript

```bash
cls - 清除页面
show dbs - 显示系统里的databses
use somedb - 切换or创建 somedb
db.dropDatabase() - 删除当前database
```

mongoDB用的是binary JSON - 即为BSON

<img src="https://live.staticflickr.com/65535/51204259333_598c1ac091_o.png" alt="image-20210526172721258" style="zoom:70%;" />



### CURD operation

#### Insert

```bash
db.collection.insertOne() - 插入single document
db.collection.insert() - 输入一个或者多个都可以
```

insert的时候会自动创建collection, insert的是一个js object

```bash
db.dogs.insertOne({name: "Khan", age: 3, catFriendly: true})
db.dogs.insert([{name:"wen", age:4, catFriendly: true}, {name:"ff", age:2, catFriendly: false}])
```

此时创建了dogs这个collections, 可以用db.dogs.find() 查看其中储存的documents

#### Find

也可以根据条件查询

```bash
db.dogs.find({catFriendly: true}) - 也可以是多个条件
db.dogs.find({}) - return all
```

#### Update

可以update一个或者多个, 三个argument分别是filter, update, options

```bash
db.dogs.updateOne({name:"Khan"}, {$set: {age:10}}) - 这里的$set是update的operator
```

也可以set后面加新的key-value pair, 会insert到这条record里面

``` bash
db.dogs.updateMany({catFriendly: true}, {$set: {age:1}}) - update 多个
```

operator还有currentDate, 可以给改动的record增加一个time stamp, 且可以自命名

```bash
 db.dogs.updateOne({name:"Khan"}, {$set:{age:11}, $currentDate:{lastChanged: true}})
 然后得到
 { "_id" : ObjectId("60ae15bec8ebd89c373acc5b"), "name" : "Khan", "age" : 11, "catFriendly" : true, "lastChanged" : ISODate("2021-05-26T10:27:08.095Z") } - 代表了最后update的时间
```

replaceOne() 语法一样, 但是会抹除原来的替换成新的argument

#### Delete

当然filter也可以有多个或者单个条件

```bash
db.dogs.deleteOne({name: "wen"}) - 删除一个record
db.dogs.deleteMany({catFriendly: false}) - 删除多个不满足的record
db.dogs.deleteMany({}) - 清空当前collection
```

#### Nested filter

```bash
db.dogs.find({'personality.childFriendly': true}) - personality 有多个性格, childFriendl只是其一
```

#### Operators

$gt代表大于, gte代表大于等于, <font color = grape>**记住所有的operator都要在单独的bracket里面!**</font>

```bash
db.dogs.find({age: {$gt: 8}}) - 查找所有age > 8
db.dogs.find({size: {$in : ['small', 'medium']}}) - 查找size为small或者medium的狗
db.dogs.find({age: {$gt: 8}}, {size: {$in : ['small', 'medium']}}) - 当然可以combine条件
db.dogs.find({$or: [{age: {$lte: 8}}, {'personality.childFriendly': true}]}) - 二者满其一即可
```







