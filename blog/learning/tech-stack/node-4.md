# 关于 nodejs

> Node.js® is a JavaScript runtime built on Chrome's V8 JavaScript engine.

Nodejs是一个构建在**Chrome V8引擎**上的, **异步事件驱动**的Javascript运行时(runtime), 是运行在**服务端**的Javascript. Node用于构建**可伸缩的网络应用**.

### Node.js的特点

- #### 异步I/O

在Node中, 存在很多异步I/O的api, 这些api的操作都是以异步(asynchronous)的方式进行的, 比如**文件读取**和**网络请求**等. 举一个文件系统(file system)的例子:

```
const fs = require('fs')

fs.readFile('/test.txt', (err, file) => {
    if (err) {
        // 文件读取出错的回调
        console.log('读取文件失败: ', err)
    } else {
        // 正常输出文件内容
        console.log('文件内容: ', file)
    }
})

console.log('读取文件...')

-------------------------------------
=> 读取文件...
=> 文件内容: <Buffer ....>
```
可以看到, “读取文件”的文本信息先于“文件内容”被打印出来, 这个操作跟前端经常接触的**异步请求**很类似, 文件内容需要等待文件读取操作完成之后才能被打印.

异步I/O与同步I/O相较, 异步I/O无需等待之前的操作执行结束,对于I/O密集的网络应用而言,将大大地提升应用的效率.

- #### 异步事件驱动

Node将前端浏览器中很多常见且成熟的事件引入了后端, 以配合异步I/O, 将一些关键事件节点暴露出来, 为业务提供回调函数.

举个HTTP的例子:

```
// 服务端
const http = require('http')
const hostname = '127.0.01'
const port = 2333

// http server实例
http.createServer((req, res) => {
    /**
     * @param {Object} res 请求
     * @param {Object} req 响应
     */
    let postData = ''
    // 监听request的data事件
    req.on('data', () => {
        postData += 'hello world ~'
    })
    // 监听request的end事件
    req.on('end', () => {
        // response data
        res.end(postData)
    })
}).listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`)
})

=> Server running at http://127.0.0.1:2333/

---------------------------------------------------

// 前端请求接口
axios.({
    baseURL: 'http://127.0.0.1:2333/',
    data: {},
    method: 'post',
    url: '/',
    ...
}).then(res => {
    console.log(res)
})

=> hello world ~
```

在上面这个简单的HTTP例子中, 一共暴露了2个事件: **data**, **end**事件, 并且为事件提供了回调函数, 可以用于处理业务逻辑.

- #### 单线程

> **单线程就是进程只有一个线程**, 一个进程专注于一件事情.

**单线程**在程序执行时, 无法与其他线程共享状态, 它所走的程序路径按照顺序连续的排列, 只有当前面的处理好之后, 才能继续处理下面的程序, 没有状态同步问题, 不存在死锁情况.

单线程的弱点:

- 无法利用多核CPU
- 错误会引起整个应用退出, 应用的健壮性经受考验
- 大计算量占用CPU会导致后续的异步I/O无法调用

Node采用了与Web Workers同样的思路来解决单线程中大计算量的问题: child_process.

**子进程**可以将大计算量的任务分解, 充分利用硬件资源, 提升了运算效率, 可以解决因长时间的CPU占用造成的阻塞UI渲染的问题.

- #### 跨平台

Node基于**libuv**的架构, 实现了大部分C++模块的跨平台兼容.


### Node的应用场景

- #### I/O密集型

Node具有事件循环(Event loop)的处理能力, 在处理异步I/O请求上表现优秀, 有效地组织硬件资源, 资源占用极少, 因此极适合I/O密集的网络应用.

- #### 分布式应用

先简单了解一下**分布式应用**: 就是将一个完整的应用, 按照业务功能拆分成一个个独立的子系统, 在分布式结构中, 每个子系统就被称为“服务”, 这些子系统独立运行在web容器中, 它们之间通过远程过程调用RPC(Remote Procedure Call)方式通信.

##### 分布式的好处

- 降低系统间耦合度
- 系统易于扩展
- 服务的复用性高

Node也十分适用于分布式应用, Node事件循环(Event loop)机制使其具有高效处理**并行I/O**的能力. 利用这个能力, 在分布式应用中可以实现: 一个查询任务可以在多个数据库中并行地进行然后将最终结果合并再返回, 这个过程大大地提升了查询效率.



---

### 参考资料

- [《深入浅出Nodejs》 - 朴灵](http://www.ituring.com.cn/book/1290)
- [《Node.js：浅析高并发与分布式集群》](https://zhuanlan.zhihu.com/p/41118827)
- [单线程--百度文库](https://baike.baidu.com/item/%E5%8D%95%E7%BA%BF%E7%A8%8B)
- [分布式系统--百度文库](https://baike.baidu.com/item/%E5%88%86%E5%B8%83%E5%BC%8F%E7%B3%BB%E7%BB%9F)
- [Node.js官方文档](https://nodejs.org/en/docs/)