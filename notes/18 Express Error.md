可以主动抛出error

```javascript
throw new Error("Password required!")
```

### Custom Error Handlers

这样可以catch error并且打出<font color = grape>**前三行以及log(err)打出的trace, next(err)会继续前往下一个error handler, 如果没有了custom error handler就结束了**</font>

```javascript
app.use((err, req, res, next) => {
    console.log("******************************************")
    console.log("*****************ERROR*****************")
    console.log("******************************************")
    console.log(err)
    next(err)
})
```



### Custom Error

可以自定义error, 比如自定义一个AppError并且导出

```javascript
class AppError extends Error {
    constructor(message, status) {
        // call constructor of Error class
        super();
        // set fields
        this.message = message;
        this.status = status;
    }
}
module.exports = AppError;
```

接着在其他js中抛出这个自定义error, 同时<font color = grape>**update了这个error的status,**</font>

```javascript
const AppError = require('./AppError');
throw new AppError('password required', 401);
```



接着<font color = grape>**如果error之前没有set status, 就会default设置成500, 然后发送message; 如果之前error被set过, 比如这里的AppError, 那么status就会设置成之前给定的401, 打出不同的message**</font>

```javascript
app.use((err, req, res, next) => {
    // destructure and set default if not exist
    const { status = 500, message = 'Something Went Wrong' } = err;
    // 如果没有status, 就会设置成500
    res.status(status).send(message)
})
```



### Handing Async Errors

[code](/Users/parallax/Documents/CIT&CIS/The Web Developer Bootcamp 2020/code/17 Express_Errors_CODE/Async_Errors)

代码本身是一个普通的 product db, 然后有增删查改功能, <font color = grape>**并且定义了AppError**</font>

```javascript
// require class
const AppError = require('./AppError');

app.use((err, req, res, next) => {
    console.log(err.name);
    //We can single out particular types of Mongoose Errors:
    if (err.name === 'ValidationError') err = handleValidationErr(err)
    next(err);
})

// 设置status
app.use((err, req, res, next) => {
    const { status = 500, message = 'Something went wrong' } = err;
    res.status(status).send(message);
})
```

首先, 对于非async的handler, 如果throw error, 那么会被catch到并且send message



#### Find Error

但是对于async的handler, 比如在show和edit operation中, 需要查找ID

 `const product = await Product.findById()`, <font color = grape>**为了防止找不到的时候product是undefined, 需要加一句判定, 但是这没用!**</font> 

```javascript
app.get('/products/:id', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id)
    if (!product) {
        throw new AppError('Product Not Found', 404);
    }
    res.render('products/show', { product })
}))
```

<font color = gree>以上还是会render! 不会throw error! **事实上需要pass it to next, 来确保这个error被handle**</font> 

```javascript
app.get('/products/:id', async (req, res, next) => {
    const { id } = req.params;
    const product = await Product.findById(id)
    if (!product) {
        // 用next让error handler设置status并且send message
        return next(new AppError('Product Not Found', 404));
    }
    res.render('products/show', { product })
})
```

注意因为之前说过, next()并不会阻止原来的code运行, 所以需要用return 让next()之后的不运行(指render product)



#### Validation Error

在update和new的post method中, 存在validation error, 所以需要catch 它

<font color = grape>**注意, new的时候validation是直接比对schema, 如果是update, 需要添加runValidation:true这个paramter**</font>

```javascript
app.get('/products/new', async (req, res, next) => {
	try{
        const newProduct = new Product(req.body);
    	await newProduct.save();
    	res.redirect(`/products/${newProduct._id}`)
    }
    // catch validation error 并且发送到error handler
    catch(e) {
    	next(e);
    }
})
```



### Define An Async Utility

define a function来解决所有的async error, 不用给每一个handler都加上try catch, 然后next

```javascript
function wrapAsync(fn) {
    return function (req, res, next) {
        fn(req, res, next).catch(e => next(e))
    }
}

app.post('/products', wrapAsync(async (req, res, next) => {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.redirect(`/products/${newProduct._id}`)
}))

app.get('/products/:id', wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    const product = await Product.findById(id)
    if (!product) {
        // 此时可以直接throw arrow, 然后wrapAsync会catch it并且next(err)
        throw new AppError('Product Not Found', 404);
    }
    res.render('products/show', { product })
}))
```

<font color = grape>**这个wrap function会把async function作为参数, 传进去, 如果catch到error, 就next(e)去error handler**</font> 

但是这样validation error会没有status, 所以可以再加一个err handler来判断, 如果是validation error, <font color = gree>就把当前的error替换成AppError("Validation Error", 400), 这样设置完status, 这个res就是400 error了!</font>

这里的err.name是ValidationError, **err.message就是在schema里定义的 `required=[true, 'this is validation error']`**

```javascript
const handleValidationErr = (err) => {
    console.dir(err);
    // update这个Validation Error为AppError
    return new AppError(`Validation Failed...${err.message}`, 400)
}

app.use((err, req, res, next) => {
    console.log(err.name);
    // Mongoose Error 存在name, 可以通过这些来给这些error custom
    if (err.name === 'ValidationError') err = handleValidationErr(err)
    next(err);
})

app.use((err, req, res, next) => {
    const { status = 500, message = 'Something went wrong' } = err;
    res.status(status).send(message);
})
```

