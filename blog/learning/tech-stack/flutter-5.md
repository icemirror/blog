# 认识视图（Views）

- 什么是view
- 更新widget
- 布局
- 在布局中添加或删除组件
- 在widget中做动画
- 绘图（canvas draw / paint）
- 构建自定义widgets
- 设置widget的透明度

### view

在flutter中widget就是视图，但widget与view又有一些区别：

- 首先，widget具有不同的生命周期，这些周期是不可变的，它们存在于状态被改变之前。每当widget发生改变时，flutter会创建一个新的widget实例树;
- 另外，flutter中的widget很轻，它本身不是视图，并且不是直接绘制任何东西，而是对UI及其语义的描述。flutter包含了material组件库，这些widgets遵循了material设计规范;

### 如何更新widget



