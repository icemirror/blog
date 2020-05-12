# cookie、session、localstorage的区别

### 共同点

都可以用于数据存储, 都是保存在浏览器端, 且是同源的.

### 不同点

- **存储方式**

1. cookie是始终在同源的http请求中携带, 用于浏览器与服务器之间进行传递消息.

2. sessionStorage和localStorage是不会自动把数据发给服务器, 仅本地保存.

- **存储大小**

1. cookie数据不能超过 ```4k```, 所以cookie只适合保存一些很小的数据, 比如用户标识.

2. sessionStorage和localStorage也有存储限制, 但是大概会有 ```5M``` 或更大的空间.

- **失效的机制**

1. cookie是通过设置 ```过期时间``` 来控制是否失效.

2. localStorage是本地存储, 可以 ```长期存储```, 没有时间限制, 除非手动清除.

3. sessionStorage是会话存储, 当 ```页面关闭``` 时, 数据就被会清理.

- **共享策略**

1. cookie和localStorage是可以 ```同源窗口``` 共享的.

2. sessionStorage仅在同一个页面共享, 不同浏览器窗口无法共享.

