# uni-app 框架

uni，读 ```you ni```，是统一的意思. 是由dcloud开发的“开发一次, 多端覆盖”的应用开发框架.

## 开发规范

- 页面文件遵循vue单文件组件规范 [Vue单文件组件SFC规范](https://vue-loader.vuejs.org/zh/spec.html)
- 组件标签靠近小程序规范 [uni-app 组件规范](https://uniapp.dcloud.io/component/README)
- 接口能力靠近小程序规范, 使用方式 ```uni.xxxx```, [uni-app接口规范](https://uniapp.dcloud.io/api/README)
- 数据绑定、事件处理同vue.js规范
- 考虑到兼容性问题, 布局使用 ```flex```

## 目录结构

```
┌─components            uni-app组件目录
│  └─comp-a.vue         可复用的a组件
├─hybrid                存放本地网页的目录
├─platforms             存放各平台专用页面的目录
├─pages                 业务页面文件存放的目录
│  ├─index
│  │  └─index.vue       index页面
│  └─list
│     └─list.vue        list页面
├─static                存放应用引用静态资源（如图片、视频等），注意：静态资源**只能**存放于此
├─wxcomponents          存放小程序组件的目录
├─main.js               入口文件
├─App.vue               应用配置，用来配置App全局样式以及监听 应用生命周期
├─manifest.json         配置应用名称、appid、logo、版本等打包信息
└─pages.json            配置页面路由、导航条、选项卡等页面类信息
```

## 页面样式与布局

uni-app中使用rpx布局单位:

```1px / 设计稿基准宽度 = 1rpx / 750rpx```

所以, uni-app中的宽度计算公式:

```750 * 元素设计稿宽度 / 设计稿基准宽度 = 1rpx```

eg:

1. 设计稿宽度为750px, 元素A宽度为100px, 在uni-app中的宽度为: 750 * 100 / 750 = 100rpx;
2. 设计稿宽度为375px, 元素B宽度为200px, 在uni-app中的宽度为: 750 * 200 / 375 = 400rpx;

