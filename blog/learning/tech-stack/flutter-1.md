# Dart基础语法

- 程序入口
- 控制台输出
- 变量
- 检查null或零
- Functions
- 异步编程
  - Futures
  - async 和 await

### 程序入口

在dart中每个app中都会存在一个```main()```函数作为应用程序的入口。

```js
main () {}
```

### 控制台输出

要在Dart要打印到控制台需要使用 ```print```:

```js
print('hello world');
```

### 变量

**dart是类型安全的** - 它使用了静态类型检查和运行时组合， 检查以确保变量值始终与变量的静态值类型匹配。

#### 创建和分配变量

```js
String name = 'dart'; // 显示声明string类型
var otherName = 'Dart'; // 推断为string类型
```

#### 默认值

在dart中，数据的初始值是 ```null```

> 注意： 在dart中数字也会被视为对象类型， 所以数字类型的数据初始值为null

```js
var name; // null
int x; // null
```

### 检查null或零

#### null检查最佳实践

从dart1.12开始， ```null-aware``` 运算符可以用来做null检查.

```js
bool isConnected (a, b) {
  bool outConn = outgoing[a]?.contains(b) ?? false;
  bool inConn = incomming[a]?.contains(b) ?? false;
  return outConn || inConn;
}
```

```?.``` 运算符在左边为null的情况下会阻断右边的继续调用。 ```??```运算符主要的作用是左侧的表达式为null时为其设置默认值。

### Functions

dart中函数与javascript类似。

### 异步编程

#### Futures

与js一样， dart也支持单线程执行。 在js中， Promise对象表示异步操作的最终完成及其结果， dart中使用 ```Future```来表示异步操作：

```js
_getIPAddress () {
  final url = 'http://xxxx';
  HttpRequest.request(url).then((value) {
    print(json.decode(value.responseText)['origin]);
  }).catchError(error => print(error));
}
```

#### async 和 await

在dart中， async函数会返回一个```Future```， 函数的主体是稍后执行。 ```await```运算符用于等待```Future```。

```js
// 注意async的位置， 与javascript中有所不同
_getIPAddress async () {
  final url = 'http://xxxx';
  var res = await HttpRequest.request(url);
  String ip = json.decode(request.responseText)['origin'];
  print(ip);
}
```
