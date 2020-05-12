# 数据驱动

Vue是**MVVM**框架, **数据驱动**是vue的核心思想, Vue倡导数据驱动视图渲染, 这一点与传统的js库如JQuery不同, JQuery需要对页面dom进行操作, 才能使得视图得到更新. Vue这一类MVVM框架的出现, 无疑是大大减少了工程师对dom的操作, 而专注于对数据逻辑的处理, 使代码更清晰, 进而提高代码可维护度.

```js
// index.html
<div id="app">
  {{message}}
</div>

// main.js
new Vue({
  el: '#app',
  data: {
    message: 'hello, world'
  }
})

```
当前的例子就是一个简单的vue项目的hello world. 浏览index.html可以看到页面上显示了hello, world字样. vue的视图更新, 并不需要通过dom操作去更改, 而是使用数据驱动的方式, 使得视图得到渲染. 不难看出, 要一探其中究竟, 还需要先弄清楚 new Vue到底做了些什么?
