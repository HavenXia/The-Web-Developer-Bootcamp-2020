## Connect Mongo with Mongoose

Mongoose is a Object Document Mapper, map documents from databse to usable Javascript objects.

[document](https://mongoosejs.com/docs/index.html)

Mongoose 默认port是27017

#### 建立connection

```javascript
const mongoose = require('mongoose');
// 这里的movieApp是自定义的, 在mongo里database就是叫这个名字
// 后面的parameter照抄即可
mongoose.connect('mongodb://localhost:27017/movieApp', { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
  	console.log("CONNECTION OPEN!!!")
})
  .catch(err => {
  	console.log("OH NO ERROR!!!!")
    // err就是error信息
  	console.log(err)
})
```

<font color = grape>**接在后面的then和catch是error handling! 好习惯记住**</font>

#### Model - Schema

With Mongoose, everything is derived from a [Schema](https://mongoosejs.com/docs/guide.html).

Each schema maps to a MongoDB collection and defines the shape of the documents within that collection.

```javascript
// 创建一个名为movieSchema的schema
// 这里的type都是javascript的type
const movieSchema = new mongoose.Schema({
    title: String,
    year: Number,
    score: Number,
    rating: String
});
```

根据schema创建model

<font color = grape>**这里的‘Movie’很重要, 必须是首字母大写, 这句话会create a collection named 'movies'**</font>, 自动降首字母并且复数化

```javascript
// 并且给这个model class命名为Movie
const Movie = mongoose.model('Movie', movieSchema);
```

此时整个database叫movieApp, 其中有个collection叫movies!

此时可以直接用model的语法了, <font color = grape>**以下的运行环境都是node shell, (cd到文件夹之后, node, 然后.load xxx.js 进入node shell)而上一章都是mongo shell**</font>, 每个model的instance就是一个documents

```javascript
// 这样就可以在movieApp.movies里insert一条documents
const amadeus = new Movie({ title: 'Amadeus', year: 1986, score: 9.2, rating: 'R' });
amadeus.save();
// 也可以用之前学过的语法, insert & insertMany
Movie.insertMany([
    { title: 'Amelie', year: 2001, score: 8.3, rating: 'R' },
    { title: 'Alien', year: 1979, score: 8.1, rating: 'R' },
    { title: 'The Iron Giant', year: 1999, score: 7.5, rating: 'PG' },
    { title: 'Stand By Me', year: 1986, score: 8.6, rating: 'R' },
    { title: 'Moonrise Kingdom', year: 2012, score: 7.3, rating: 'PG-13' }
])
    .then(data => {
        console.log("IT WORKED!")
        console.log(data);
    })
```

#### Finding with Mongoose

[Models的各种api](https://mongoosejs.com/docs/api/model.html)

model.find之后return的是Queries, 必须用then获取data

这里的Movie代表的就是movieApp.movies这个collection

```javascript
Movie.find({}).then(data => console.log(data))
```

#### Updating with Mongoose

Model.update是不需要用到$set的, 和mongo shell不一样

```javascript
// 这里的res打出来就是之前db里提示的nModified那些数据
Movie.updateOne({title: "Amadeus"}, {year: 1984}).then(res => console.log(res))
// 但是filter里面的operator还是保留了的
// 修改title在这个array里面的电影评分为10分
Movie.updateMany({title: {$in: ['Amadeus', 'Stand by me']}}, {score: 10})
```

对于findAndUpdate, 需要加上第三个option, new = true代表返回修改后的document

```javascript
Movie.findOneAndUpdate({title: "Amadeus"}, {year: 1984}, {new: true}}
```

#### Deleting with Mongoose

```javascript
Movie.removeMany({title: 'Amelie'}).then(res => console.log(res))
```



### Mongoose Schema Validation

schema可以写的很复杂, <font color = gree>required 代表这一项必须存在(否则save会error), 以下还有些其他的validation</font> 

```javascript
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        // maxlength 决定了这个string的最长度
        maxlength: 20
    },
    price: {
        type: Number,
        required: true,
        // 代表最小值以及err时return的res
        min: [0, 'Price must be positive ya dodo!']
    },
    onSale: {
        type: Boolean,
        // 如果create documents的时候没有define, 就按照default来设置
        default: false
    },
    // type是array of strings
    categories: [String],
    // nested type, 比如只写了online, inStore就会默认为0
    qty: {
        online: {
            type: Number,
            // 默认为0
            default: 0
        },
        inStore: {
            type: Number,
            default: 0
        }
    },
    size: {
        type: String,
        // enum代表只能在这个array里面选择!!!
        enum: ['S', 'M', 'L']
    }
});
```

<font color = grape>**但是这里的validation只对创建并存储的时候有效, 如果是update的话就无效了!**</font>

**所以需要在update的method的 option中选上runValidators!!!**

```javascript
Movie.findOneAndUpdate({title: "Amadeus"}, {year: 1984}, {new: true, runValidators: true}}
```

**设置validation error message**

```javascript
min: [0, 'Price must be positive ya dodo!'] // err的时候会默认return后面的作为res
```



### Instance method

Movie是model class, 每个Movie的instance也可以定义通用的method, 比如save(), <font color = grape>**这些method是定义在schema里面的**</font>

```javascript
// 修改是否onSale
productSchema.methods.toggleOnSale = function () {
    this.onSale = !this.onSale;
    return this.save();
}
// 添加新category
productSchema.methods.addCategory = function (newCat) {
    this.categories.push(newCat);
    return this.save();
}
// 所有的product都onsale且price=0
// 这里是static method
productSchema.statics.fireSale = function () {
    return this.updateMany({}, { onSale: true, price: 0 })
}
// 当然也可以写async function
// async + await会明确code先后执行顺序
const findProduct = async () => {
    // foundProduct就是一个instance
    const foundProduct = await Product.findOne({ name: 'Mountain Bike' });
    console.log(foundProduct)
    // 这里的await是因为save需要一定时间
    await foundProduct.toggleOnSale();
    console.log(foundProduct)
    await foundProduct.addCategory('Outdoors')
    console.log(foundProduct)
}

// static method可以直接从Product 来call
Product.fireSale().then(res => console.log(res))
```

<font color = gree>async function返回的是一个Promise, await关键词能够在收到Promise的时候暂停后面的code, 对这个promise进行resolve, 所以这里的toggleOnSale会在log之前完成</font>



### Mongoose Virtuals

定义virtual property, 不出现在database里面

```javascript
personSchema.virtual('fullName').get(function () {
    return `${this.first} ${this.last}`
})
```

在添加了instance之后确实可以用 xxx.fullName来获取这个property, <font color = grape>**这里define的是get function, 所以fullName会有返回值**</font>



### Middleware

这就是middleware function, 当创建了instance并且save的时候, <font color = grape>**会先执行pre的middleware function再执行post的function**</font>

```javascript
personSchema.pre('save', async function () {
    // 会在save之前修改当前instance的first和last!
    this.first = 'YO';
    this.last = 'MAMA';
    console.log("ABOUT TO SAVE!!!!")
})
personSchema.post('save', async function () {
    console.log("JUST SAVED!!!!")
})
```

