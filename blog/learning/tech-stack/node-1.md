# 第一个Node程序

官方文档中提供了一个最简单的hello world程序:

```js
// src/index.js
const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World\n');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
```

- 启动node程序

```bash
node ./src/index.js
```
使用node + 程序入口即可运行这个简单的demo, 访问http://localhost:3000 即可看到页面中显示了 ```hello world```的文本内容.

- 程序热启动

```bash
npm i -g supervisor
```

使用node运行node程序, 每次修改程序内容都需要重新运行node+入口文件来重新启动服务, 考虑效率问题, 可以安装supervisor依赖, 用于实时监听文件的修改并自动重启服务.
