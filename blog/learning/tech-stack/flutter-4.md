# 项目结构、资源、依赖和本地化

- flutter项目结构
- 归档图片资源及分辨率的处理
- 归档strings资源及处理多语言
- 添加flutter项目所需的依赖

### 项目结构

```js
--------------------------------------------------
| android/      android部分的工程文件
| build/        项目构建输出目录 
| ios/          ios部分的工程文件
| lib/          项目中的dart源文件
|  | src        包涵其他源文件
|  | main.dart  自动生成的项目入口文件(⭐)
| test/         测试相关 
| pubspec.yaml  项目依赖配置文件，类似于package.json(⭐)
--------------------------------------------------
```

### 归档多分辨率的图片资源

在flutter中，图片等资源会放到```assets```中去管理。记得在```pubspect.yaml```文件中声明 ```assets```:

```js
// pubspec.yaml
assets:
  - my-assets/1.jpeg
  - my-assets/2.jpeg
  - my-assets/data.json // 数据类型并不仅限于图片等
```

在代码中我们可以通过```AssetBundle```来放问它：

```js
import "dart:async" show Future;
import "package:flutter/services.dart" show rootBundle;

Future<String> loadAsset() async {
  return await rootBundle.loadString('assets/data.json');
}
```

对于图片的分辨率，image assets可能是 1.0x, 2.0x, 3.0x或其他的倍数。

android不同像素密度的图片和flutter的像素比率的对应关系：

```
ldpi    0.75x
mdpi    1.0x
hdpi    1.5x
xhdpi   2.0x
xxhdpi  3.0x
xxxhdpi 4.0x
```

如果想要把```1.jpeg```的图片放到flutter的工程中，你需要将它放到my-assets文件夹中，把图片1.0x放到文件夹下，再需要创建2.0x、3.0x的文件夹，分别将2倍、3倍图片放到对应的文件夹中。

```js
// project
my-assets/1.jpeg
my-assets/2.0x/1.jpeg
my-assets/3.0x/1.jpeg

// pubspec.yaml 声明图片资源
assets:
 - my-assets/1.jpeg

 // 使用AssetImage来放问它
 return AssetImage('my-assets/1.jpeg');

 // 也可以通过Image widget来直接使用
 @override
 Widget build(BuildContext, context) {
   return Image.asset('my-assets/1.jpeg');
 }
```

### 如何归档strings资源及如何处理多语言

flutter目前没有专门的字符串资源管理系统，可以将strings资源作为静态字段保存到类中。

```js
class Strings {
  static String welcome = "welcome to Flutter";
}

// 使用
Text(Strings.welcome); // welcome to Flutter
```

对于多语言的处理，默认情况下flutter只支持美式英语字符串，如果需要其他语言，需要引入```flutter_localizations```。你可能也引入 ```intl```包来支持其他的i10n机制，比如日期/时间格式化。

```js
dependencies:
  # ...
  flutter_localizations:
    sdk: flutter
  intl: "^0.15.6"
```

需要使用```flutter_localizations```包，还需要在app widget中指定```localizationsDelegates```和```supportedLocales```。

```js
import "package:flutter_localizations/flutter_localizations.dart";

MaterialApp(
  localizationsDelegates: [
    GlobalMaterialLocalizations.delegate,
    GlobalWidgetsLocalizations.delegate,
  ],
  supportedLocales: [
    const Locale('en', 'US'),
    const Locale('he', 'IL'),
  ],
)
```

### 项目中如何添加flutter项目所需的依赖

在flutter中使用dart构建系统和pub包管理器来处理依赖。这些工具将android和ios native包装应用程序的构建委派给相应的构建系统。

```js
// pubspec.yarml
dependencies:
  flutter:
    sdk: flutter
  google_sign_in: ^3.0.3
```
