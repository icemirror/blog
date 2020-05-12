# promisify解决异步回调地狱

在node.js中常常会出现一些异步回调的情况, 尤其是文件系统(**file system**), 大量的回调用法, 使代码优雅度降低. 我们可以尝试使用```promisify```来解决部分异步回调的问题.

```js
const fs = require('fs');

const readFiles = (path) => {
  fs.stat(path, (err, stats) => {
    if (err) throw err;
    if (stats.isFile()) {
      // 如果是文件
    } else if (stats.isDirectory()) {
      // 如果使文件夹
    }
  });
};
readFiles('./test');
```

### 使用promisify优化代码

<kbd>promisify</kbd>是nodejs工具, 它可以让一个遵循异常优先的回调风格的函数. 配合```async```, ```await```关键字, 可以让我们用近似同步的方式来编写异步代码, 使代码更加优雅, 增强代码可读性.

```js
const fs = require('fs');
const promisify = require('util').promisify;

const stat = promisify(fs.stat);

const readFiles = async (path) => {
  const stats = await stat(path);
  if (stats.isFile()) {
    // 如果是文件
  } else if (stats.isDirectory()) {
    // 如果是文件夹
  }
};
readFiles('./test');
```