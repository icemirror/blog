# v-if 与 v-show

```v-if```, ```v-show```都属于vue条件渲染部分的内容，是vue内置指令。

### v-if

```v-if```指令用于条件渲染某块内容，只有当指令的表达式返回 **truthy**值的时候会被渲染，否则不会被渲染。

```js
<span
  v-if="isTruthy">Hello</span>
```
```v-if```也可以与```v-else```组合使用，也可以使用```v-else-if```来形成嵌套if-else结构。

- v-if
- v-else-if (v2.1.0)
- v-else

