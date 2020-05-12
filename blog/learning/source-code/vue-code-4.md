# 初始化状态数据 initState

### Vue原型上的初始化函数

在上一篇中，分析了new Vue做了些什么，在```core/instance/index```文件中得到了答案，发现实例化Vue的时候会调用一个```_init```函数，该函数做了一系列Vue原型上的初始化工作，例如初始化生命周期、事件、render函数、inject、state、provide等内容。这一篇内容，着重分析一下初始化状态数据函数initState到底做了些什么工作，这里涉及到Vue的响应式原理、及依赖收集等内容：

```js
// core/instance/init.js

export function initMixin (Vue: Class<Component>) {
  Vue.prototype._init = function (options?: Object) {
    // ...
    callHook(vm, 'beforeCreate') // 调用beforeCreate生命钩子
    // ...
    initState(vm) // 初始化状态数据(data / props / methods / computed / watch等...)
    // ...
    callHook(vm, 'created') // 调用created生命钩子
    // ...
  }
}

```

### 初始化data

大致了解init.js文件内容后，发现初始化的数据包括：data、props、methods、computed、watch等，这一篇内容，主要以初始化data为例来说明初始化过程：

```js
function initData (vm: Component) {
  let data = vm.$options.data
  data = vm._data = typeof data === 'function'
    ? getData(data, vm) // 非根实例data必须为function类型，否则是对象类型
    : data || {}
  // ...
  // proxy data on instance
  const keys = Object.keys(data)
  // ...
  let i = keys.length
  while (i--) {
    const key = keys[i]
    if (process.env.NODE_ENV !== 'production') {
      if (methods && hasOwn(methods, key)) {
        // ...
      }
    }
    if (props && hasOwn(props, key)) {
      // ...
    } else if (!isReserved(key)) {
      proxy(vm, `_data`, key) // 代理_data ⭐
    }
  }
  // observe data ⭐
  observe(data, true /* asRootData */)
}

export function getData (data: Function, vm: Component): any {
  // #7573 disable dep collection when invoking data getters
  pushTarget()
  try {
    return data.call(vm, vm) // 执行data函数
  } catch (e) {
    handleError(e, vm, `data()`)
    return {}
  } finally {
    popTarget()
  }
}
```

从initState函数内容，可以回答第一个问题：为什么Vue实例除了根实例以外必须要求是函数？

主要是考虑到根实例只有一个，组件可以创建多个实例。如果 data 仍然是一个纯粹的对象，则所有的实例将共享引用同一个数据对象！这样会造成数据污染。**如果通过提供 data 函数，每次创建一个新实例后，我们能够调用 data 函数，从而返回初始数据的一个全新副本数据对象，每个实例可以维护一份被返回对象的独立的拷贝，从而避免了共享对象造成的副作用**。

### 代理 _data

```js
// proxy(vm, `_data`, 'message') 调用proxy函数

export function proxy (target: Object, sourceKey: string, key: string) {
  Object.defineProperty(vm, 'message', {
    get: () => {
      return this._data.message
    }
    set: (val) => {
      this._data.message = val
    }
  })
}

```

proxy函数建立了vm.xx 与 vm._data.xx之间的映射关系，通过Object.defineProperty来实现了响应式数据。正因为如此，才能让我们在开发过程中，可以简单直接地使用this.message来读写data数据。
