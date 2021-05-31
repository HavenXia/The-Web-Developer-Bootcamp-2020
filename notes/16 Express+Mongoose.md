### PUT ALL Together

[code](/Users/parallax/Documents/CIT&CIS/The Web Developer Bootcamp 2020/code/15 Mongoose_With_Express_CODE)

#### 准备工作

首先是Express的configuration

```javascript
const express = require('express');
const app = express();
const path = require('path');
const methodOverride = require('method-override')

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// rest需要的override和parsing
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'))
// 设置端口
app.listen(3000, () => {
    console.log("APP IS LISTENING ON PORT 3000!")
})

```

然后是Mongoose的configuration

```javascript
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/farmStand', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
    console.log("MONGO CONNECTION OPEN!!!")
})
    .catch(err => {
    console.log("OH NO MONGO CONNECTION ERROR!!!!")
    console.log(err)
})
```

解决端口占用

```bash
lsof -i:3000 // 得到某个进程id 
sudo kill -9 xxxxx 
```

<font color = grape>**这里把model单独写到其他js里面,  并且在其中`module.exports = Product`**</font> 所以同样需要require

```javascript
const Product = require('./models/product');
```

### 

#### <font color = grape>**以下操作都需要async和await!! 因为在database 进行query是需要时间的!**</font>

#### Index operation

这里的find出来之后, products是 **array of product instances**

所以在index.ejs中, 依旧使用 product.id 和product.name即可(<font color = red>这些property是在product.js里定义的schema</font>)

<font color = grape>**如果想要按照category分类怎么办? 无脑的办法是增加products/category/:sth, 但是更聪明的办法是把它和index整合到一起**</font>

req.query可以获取到show.ejs中`/products?category=xxx` 的xxx 并assign给category. 

如果不存在, 那就是普通的回到index界面, 显示所有products,  否则就发送对应的array of instances

```javascript
const categories = ['fruit', 'vegetable', 'dairy'];
app.get('/products', async (req, res) => {
    // category当然是string了!
    const { category } = req.query;
    // category存在, 找出这个category的array of documents 然后发送
    if (category) {
        const products = await Product.find({ category })
        res.render('products/index', { products, category })
    } else {
        // 普通的回到index.ejs, 直接显示所有的product, category被修改成ALL并发送
        const products = await Product.find({})
        res.render('products/index', { products, category: 'All' })
    }
})
```

在index.ejs中,  每一个list element都是一个anchor, 本质是show request

同时在ejs的最后, 如果传进来的category不是all, 那就加一个回到all的request

```ejs
<a href="/products/<%=product._id%>"><%= product.name %></a>
<%if(category !== 'All') {%>
	<a href="/products">All Products</a>
<% } %>
```



#### Show Operation

这里用params用来获取`/:id` 的内容, 同样需要用async和await来获取documents, 然后render到show.ejs

```javascript
app.get('/products/:id', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id)
    res.render('products/show', { product })
})
```

在show.ejs中, 这次的category需要同时显示当前的category并且将其作为一个链接, 注意这里的href是<font color = grape>**`/products?category=xxx`**</font>

这样可以使index option 读取到这个category xxx! <font color = gree>从而实现在index page里面显示category</font> 

```ejs
Category: <a href="/products?category=<%= product.category%>"><%= product.category%></a>
```

并且返回all product和edit product的也要正常放上去



#### New & Create Operation

和之前一样, 首先需要一个form来submit新的product

```javascript
app.get('/products/new', (req, res) => {
    res.render('products/new', { categories })
})
```

New.ejs就是标准的几个输入框, form是`<form action="/products" method="POST">`, 是post request

接着对于post, 此时需要parse req.body, 所以需要require parse method, 

```javascript
app.use(express.urlencoded({ extended: true }));
app.post('/products', async (req, res) => {
    // 直接根据req.body创建new product, 因为parse之后本来就是一个object with properties
    const newProduct = new Product(req.body);
    // await是因为save需要时间
    await newProduct.save();
    // redirect发送show request
    res.redirect(`/products/${newProduct._id}`)
})
```



#### Updating Operation

首先需要进入edit page, 一样是需要一个form

这里用到了override, 所以需要require override的package以及设置override的configuration

```javascript
const methodOverride = require('method-override')
app.use(methodOverride('_method'))
// 同样是async先查找, 然后发送到edit.ejs
app.get('/products/:id/edit', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.render('products/edit', { product, categories })
})
```

对于edit.ejs, <font color = grape>**因为这里选用的是PUT而不是Patch(edit完全覆盖之前的data),所以界面和new.ejs几乎一样, override用的PUT **</font>

并且在列出三个option的时候, 通过判断是否发过来的product.category和当前的相同, 是的话就设置selected, **实现当前product的category被选中!!**

```ejs
<form action="/products/<%=product._id%>?_method=PUT" method="POST">
    <select name="category" id="category">
        <% for(let category of categories){ %>
        // 分别是设置value, 判断selected和option的text本身
        <option value="<%=category%>" <%= product.category === category ? 'selected': '' %>><%=category%></option>
        <% } %>
    </select>
```

接着是put request

<font color = red>注意本来修改的时候, update parameter其实就是一个object, 所以这里的req.body就可以直接拿来替换所有property</font>

```javascript
app.put('/products/:id', async (req, res) => {
    // 获取id, 查找并修改所有property
    const { id } = req.params;
    // validation和new保留也是好习惯, 接着redirect show request
    const product = await Product.findByIdAndUpdate(id, req.body, { runValidators: true, new: true });
    res.redirect(`/products/${product._id}`);
})
```



#### Delete Operation

在show 界面加上delete button, 同样是override post request 为delete

```ejs
<form action="/products/<%=product._id%>?_method=DELETE" method="POST">
```

接着在delete request, 取出id并且删除它

```javascript
app.delete('/products/:id', async (req, res) => {
    const { id } = req.params;
    // 取出id, 用findByIdAndDelete删除
    const deletedProduct = await Product.findByIdAndDelete(id);
    res.redirect('/products');
})
```



