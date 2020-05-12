# 闭包

**"当函数可以记住并访问所在的词法作用域, 即使函数是在当前词法作用域之外执行, 这时就产生了闭包"**.

一个闭包的观察:

```js
function foo () {
  var a = 2;
  function bar () {
    console.log(a);
  }
  return bar;
}
var baz = foo();

baz(); // 2 闭包的效果
```
在例子中, 可以看出当我们执行了foo函数之后, foo的返回值是bar, 这个函数当作一个值传递给了baz, baz此时拥有对bar函数的引用, 当执行baz时, 正确输出了**2**. 按理说foo函数被执行后, foo的作用域会被摧毁, bar函数在其申明作用域之外执行时, 就体现了**闭包**的作用.

### 循环与闭包

面试中常常会遇见下面这段代码:

```js
for (var i = 1; i <= 5; i++) {
  setTimeout(function timer() {
    console.log(i)
  }, i * 1000)
}
```
Q: 请问输出结果是什么?

A: 每隔1s输出一次6, 一共5次.

Q: 为什么?

A: 延迟函数的回调也就是```timer```会在**循环结束时才被执行**, 循环结束时 ```i``` 的值已经变成6了.

从编程意图来看,是期望输出1 ~ 5, 每一秒输出一次, 但结果却并非如此. 到底是什么底层原理导致了这样的问题呢? 

我们期望在每一次迭代在运行时都会自己“捕获”一个i的副本, 但是根据**作用域的工作原理**, 实际情况下尽管循环中的五个函数是各自迭代中分别定义的, 但是它们都在封闭的一个全局作用域中, 因此实际上只有一个 ```i``` 变量.

Q: 如何解决?

A: 为每一个迭代提供一个闭包作用域

```js
for (var i = 1; i <= 5; i++) {
  (function() {
    setTimeout( function timer() {
      console.log( i );
    }, i * 1000 );
  })(); // IIFE
}
```
通过IIFE立即执行函数来创建一个作用域.

当然, 仅靠这样是无法正常工作的, ```i```变量依然存在于全局作用域中, 需要将变量放到封闭作用域中.

```js
// 将变量放到封闭作用域中
for (var i = 1; i <= 5; i++) {
  (function() {
    var j = i;
    setTimeout( function timer() {
      console.log( j );
    }, j * 1000 );
  })(); // IIFE
}

// 改进一下
for (var i = 1; i <= 5; i++) {
  (function(j) {
    setTimeout( function timer() {
      console.log( j );
    }, j * 1000 );
  })(i); // IIFE
}
```

ES5的阶段解决作用域问题, 通常用此类方法, 但ES6中可以换一种方式来轻松解决:

```js
for (let i = 1; i <= 5; i++) {
  setTimeout(function timer() {
    console.log(i)
  }, i * 1000) // 1, 2, 3, 4, 5
}
```
用 ```let``` 声明的变量会形成**块作用域**: 在循环过程中不止被声明一次, 每次迭代都会被声明.随后的每个迭代都会使用上一个迭代结束时的值来初始化这个变量. 利用块作用域和闭包解决了这个问题.

### 模块

模块是闭包用法的一种应用. 简单描述一下模块的特点:

- 必须有**外部的封闭函数**, 该函数必须**至少被调用一次**(创建新的模块实例).
- 封闭函数至少**返回一个内部函数**, 这个内部函数才能在私有作用域中**形成闭包**, 并且有访问和修改私有状态的能力.

一个模块的观察:

```js
function CoolModule() { // 封闭函数
  var something = "cool";
  var another = [1, 2, 3];
  function doSomething() {
    console.log( something );
  }
  function doAnother() {
    console.log( another.join( " ! " ) );
  }
  // 模块暴露(公共的API)
  return {
    doSomething: doSomething, // 返回内部函数
    doAnother: doAnother
  };
}
var foo = CoolModule(); // 至少被调用一次

foo.doSomething(); // cool
foo.doAnother(); // 1 ! 2 ! 3
```

单例模式的实现:

```js
// 单例模式
var foo = (function CoolModule() {
  var something = "cool";
  var another = [1, 2, 3];
  function doSomething() {
    console.log( something );
  }
  function doAnother() {
    console.log( another.join( " ! " ) );
  }
  return {
    doSomething: doSomething,
    doAnother: doAnother
  };
})(); // IIFE 确保函数只能被调用了1次
foo.doSomething(); // cool
foo.doAnother(); // 1 ! 2 ! 3
```

### 参考资料

- 你不知道的javascript(上) 第五章 作用域闭包
