# flutter入门基础知识

- 创建flutter项目
- 运行flutter项目
- 如何导入widget
- 写一个hello world
- 使用widget并将其嵌套形成widget树
- 创建可复用的widget

### 创建一个flutter项目

```js
flutter create <name>
```
在vscode中还可以用命令工具来创建项目:

- command + p
- \>Flutter: new project

### 运行flutter项目

切换到项目目录下，运行 ```flutter run```

在vscode中还可以用命令工具来创建项目:

```Debug -> Start Debugging -> Start IOS Similator / Create Android emulator```

### 如何导入Widget

```js
// main.dart
import 'package:flutter/material.dart'; // 导入系统material widget
import 'package:flutter/cupertino.dart'; // 导入ios样式widget
import 'package:flutter/widget.dart'; // 基本的窗口widget集
import 'package:flutter/my_widgets.dart'; // 自定义的widget
```

### hello world

```js
import 'package:flutter/material.dart';
void main() {
  runApp(
    Center(
      child: Text(
        'hello world',
        textDirection: TextDirection.ltr,
      ),
    ),
  );
}
```

### 如何构建widget树

在flutter中，几乎所有的东西都是由widget组成的。

widget是用户界面的基本构建单元，你可以将widget组成一个层次结构，调用widget树。每个窗口widget都嵌套在父级窗口widget中，可以从父级继承属性。

#### 什么是widget

- 结构元素 （比如按钮、菜单等）
- 文体元素 （像字体或颜色主题）
- 类似于布局的填充或对齐的一个方向

```js
// 官方的hello world
import 'package:flutter/material.dart';

void main() => runApp(new MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return new MaterialApp(
      title: 'Welcome to Flutter',
      home: new Scaffold(
        appBar: new AppBar(
          title: new Text('Welcome to Flutter'),
        ),
        body: new Center(
          child: new Text('Hello World'),
        ),
      ),
    );
  }
}
```
可以看到MyApp中嵌套了widget，而widget树嵌套在materialApp的根widget中。

### 如何创建可复用的widget

在flutter中，同样需要定义一个类来创建自定义widget，然后再复用widget。

```js
class CustomCard extends StatelessWidget {
  CustomCard({
    @required this.index, // 必需 @required前缀
    @required this.onPress
  }); // 配置可选参数
  final index;
  final Function onPress;

  @override
  Widget build(BuildContext, context) {
    return Card(
      child: Column(
        children: <Widget>[
          Text('Card $index'),
          FlatButton(
            child: const Text('Press'),
            onPressed: this.onPress,
          ),
        ],
      ),
    );
  }
}
```