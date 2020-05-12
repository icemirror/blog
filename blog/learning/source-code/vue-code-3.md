# new Vue做了些什么

首先, 我们打开 **/src/platforms/web/** 文件, 该文件是以不同方式开发时所需要依赖的入口文件. 点击查看 **entry-runtime-with-compiler.js**:

```js
// entry-runtime-with-compiler.js
import Vue from './runtime/index'
```

追溯到 **./runtime/index**:

```js
// ./runtime/index.js
import Vue from 'core/index'
```

追溯到 **core/index**:

```js
// core/index.js
import Vue from './instance/index'
```

追溯到 **./instance/index**:

```js
// ./instance/index.js
import { initMixin } from './init'
import { stateMixin } from './state'
import { renderMixin } from './render'
import { eventsMixin } from './events'
import { lifecycleMixin } from './lifecycle'
import { warn } from '../util/index'

function Vue (options) {
  if (process.env.NODE_ENV !== 'production' &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword')
  }
  // 执行初始化函数 _init
  this._init(options)
}
// 初始化一系列 mixin
initMixin(Vue)
stateMixin(Vue)
eventsMixin(Vue)
lifecycleMixin(Vue)
renderMixin(Vue)

export default Vue
```

终于看到了Vue的庐山真面目~ 可以看到, Vue实体文件中暴露了一个Vue方法, 该方法内会执行```this._init(options)```对Vue进行初始化. 当然, 除此之外, 还**初始化了一系列的Mixin**, mixin这部分内容, 之后会详细展开. 首先我们需要搞清楚, ```this._init```方法到底做了些什么?

根据查找发现, _init方法是在 ```initMixin```方法被调用时挂载到**Vue.prototype**上的. 因此, 我们需要查看```./init.js```文件来查看这个初始化函数到底干了些什么(部分代码展示):

```js
// core/instance/init.js

export function initMixin (Vue: Class<Component>) {
  Vue.prototype._init = function (options?: Object) {
    // ...
    // 首先在非component时，会合并options到vm.$options上
    vm.$options = mergeOptions(
      resolveConstructorOptions(vm.constructor),
      options || {},
      vm
    )
    //...
    vm._self = vm
    initLifecycle(vm) // 初始化生命周期
    initEvents(vm) // 初始化事件
    initRender(vm) // 初始化渲染函数
    callHook(vm, 'beforeCreate') // 调用beforeCreate生命钩子
    initInjections(vm) // 初始化injections
    initState(vm) // 初始化状态数据
    initProvide(vm) // 在data/props之后初始化provide
    callHook(vm, 'created') // 调用created生命钩子
    // ...
    // 挂载dom
    if (vm.$options.el) {
      vm.$mount(vm.$options.el)
    }
  }
}
```

从init.js文件中可以看出，其主要任务是：

- 合并参数到$options中
- 初始化生命周期
- 初始化事件
- 初始化渲染函数
- 调用 ```beforeCreate```生命钩子
- 初始化injections
- 初始化状态数据
- 初始化provide
- 调用```created```生命钩子
- 挂载dom

这里看出来，**created**及之前尚未挂载dom，无法访问到dom结构，**beforeCreated**之前，无法访问到data、methods、props等数据。
