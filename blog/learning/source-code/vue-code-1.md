# 源码核心目录结构

今天抽空翻看了vue源码, 不得不惊叹尤大优雅的目录结构设计: 结构清晰、语义化强. 十分值得吾辈学习、致敬 : D

在一级目录结构中, 找到 **/src** 文件夹. 在该目录结构下包含了vue的核心实现, 这部分内容也是今后需要重点研读的内容. 当然, 主要还是会抓住的vue核心实现原理, 分门别类地在源码中寻找答案.

### src

本次源码学习vue核心实现src目录下的全部内容, 重点分析**compiler、core、platforms**等内容.

| 目录名称 | 重点分析 | 说明 | 
| --- | --- | --- |
| compiler | 是 |  编译相关的内容 |
| core | 是 | 核心内容, 主要包括components、global-api、instance、observer、util、vdom、config等内容 |
| platforms | 是 | 平台方面的内容, 主要是针对web和weex两个平台的分别处理 |
| server | - | 服务端渲染 | 
| sfc | - | - |
| shared | - | 公共方法 | 
