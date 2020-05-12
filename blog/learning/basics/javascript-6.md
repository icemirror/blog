# for等数组遍历方法性能比较

目前, 数组遍历方法有很多: ```for```、```forEach```、```for...in```、```for...of```、```map```、```filter```、```some```、```every```等.除去```filter```、```some```、```every```与```forEach```相似的方法, 本次进行性能比较的方法有:

- for
- forEach
- for...in
- for...of
- map

## 方案

对较高数量级别的数组进行遍历操作, 重复执行并求取执行时间平均时间来作为性能比较的依据.

- 数组

```js
let arr = []
for (let i = 0; i < 100000; i += 1) {
  arr.push(i)
}
```

- 对比函数

```js
const getAverageExecutionTime = (fn) => {
  let _start = +new Date();
  for (let k = 0; i < 20; k += 1) {
    fn()
  }
  return (+new Date() - _start) / 20 + 'ms' // 返回执行20次的平均执行时间
}
```

### for循环

```js
  const example1 = getAverageExecutionTime(function () {
    for (let i = 0; i < arr.length; i++) {
        // ...
    }
  })
  console.log('for', example1) // for 0.15ms
```

### forEach

```js
  const example2 = getAverageExecutionTime(function () {
    arr.forEach(item => {
      // ...
    })
  })
  console.log('forEach', example2) // forEach 1.25ms
```

### for...in

```js
const example3 = getAverageExecutionTime(function () {
  for (let i in arr) {}
})
console.log('for...in', example3) // for...in 8.95ms
```

### for...of

```js
const example4 = getAverageExecutionTime(function () {
  for (let i of arr) {}
})
console.log('for...of', example4) // for...of 1.05ms
```

### map

```js
const example5 = getAverageExecutionTime(function () {
  arr.map(item => {})
})
console.log('map', example5) // map 11.4ms
```

通过简单的比较后, 大致能够得到性能比较结果:

```js
for > for...of > forEach > for...in > map
```

## for...of和for...in的区别

这两种方法都是去迭代一些东西, 它们之间的主要区别在于: 迭代的方式.

- ```for...in```语句以任意顺序迭代对象的可枚举属性(包括```Array```，```Map```，```Set```，```String```，```TypedArray```，```arguments``` 对象等等)
- ```for...of```语句遍历可迭代对象(```String```、```Array```、```TypedArray```、```Map``` 和 ```Set``` 都是内置可迭代对象，因为它们的原型对象都拥有一个 ```Symbol.iterator``` 方法)定义要迭代的数据.

```js
Object.prototype.objCustom = function() {}; 
Array.prototype.arrCustom = function() {};

let iterable = [3, 5, 7];
iterable.foo = 'hello';

for (let i in iterable) {
  // 原型链上可迭代的内容
  console.log(i); // logs 0, 1, 2, "foo", "arrCustom", "objCustom"
}

for (let i in iterable) {
  // 迭代自身可迭代的属性
  if (iterable.hasOwnProperty(i)) {
    console.log(i); // logs 0, 1, 2, "foo"
  }
}

for (let i of iterable) {
  console.log(i); // logs 3, 5, 7
}
```