# 在vue项目中使用typescript

### 创建项目

使用vue/cli创建项目:

```bash
// 创建项目
vue create test
  default (babel, eslint)
❯ Manually select features

// 选择项目所需的依赖
 ◉ Babel
❯◉ TypeScript
 ◯ Progressive Web App (PWA) Support
 ◉ Router
 ◉ Vuex
 ◯ CSS Pre-processors
 ◉ Linter / Formatter
 ◯ Unit Testing
 ◯ E2E Testing

 // 剩余的配置根据实际需求进行配置
 ...
```

### 项目变化
- package.json
```json
"dependencies": {
    "core-js": "^3.4.3",
    "vue": "^2.6.10",
  + "vue-class-component": "^7.0.2",
  + "vue-property-decorator": "^8.3.0",
    "vue-router": "^3.1.3",
    "vuepress": "^1.2.0",
    "vuex": "^3.1.2"
  },
  "devDependencies": {
    "@vue/cli-plugin-babel": "^4.1.0",
  + "@vue/cli-plugin-typescript": "^4.1.0",
    "@vue/cli-service": "^4.1.0",
    "node-sass": "^4.12.0",
    "sass-loader": "^8.0.0",
  + "typescript": "~3.5.3",
    "vue-template-compiler": "^2.6.10"
  }
```
安装了typescript使用相关的依赖: ```vue-class-component```, ```vue-property-decorator```, ```@vue/cli-plugin-typescript```, ```typescript```.

- tsconfig.json

```json
{
  "compilerOptions": {
    "target": "esnext",
    "module": "esnext",
    "strict": true,
    "jsx": "preserve",
    "importHelpers": true,
    "moduleResolution": "node",
    "experimentalDecorators": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "sourceMap": true,
    "baseUrl": ".",
    "types": [
      "webpack-env"
    ],
    "paths": {
      "@/*": [
        "src/*"
      ]
    },
    "lib": [
      "esnext",
      "dom",
      "dom.iterable",
      "scripthost"
    ]
  },
  "include": [
    "src/**/*.ts",
    "src/**/*.tsx",
    "src/**/*.vue"
  ],
  "exclude": [
    "node_modules"
  ]
}

```

- tslint.json

```json
{
  "defaultSeverity": "warning",
  "extends": [
    "tslint:recommended"
  ],
  "linterOptions": {
    "exclude": [
      "node_modules/**"
    ]
  },
  "rules": {
    "indent": [true, "spaces", 2],
    "interface-name": false,
    "no-consecutive-blank-lines": false,
    "object-literal-sort-keys": false,
    "ordered-imports": false,
    "quotemark": [true, "single"]
  }
}
```

- src / main.ts 入口文件(文件后缀 .js -> .ts)

内容无明显变化.

- + src / shims-tsx.d.ts

用于支持jsx语法静态类型检测.

```ts
import Vue, { VNode } from 'vue';

declare global {
  namespace JSX {
    // tslint:disable no-empty-interface
    interface Element extends VNode {}
    // tslint:disable no-empty-interface
    interface ElementClass extends Vue {}
    interface IntrinsicElements {
      [elem: string]: any;
    }
  }
}
```

- + src / shims-vue.d.ts

用于支持vue文件静态类型检测.

```ts
declare module '*.vue' { //  '*.vue' 匹配.vue文件
  import Vue from 'vue';
  export default Vue;
}
```

- components / HelloWorld.vue

组件里template还是熟悉的味道, script已经完全不同了.

```ts

<script lang="ts"> // 语言类型
import { Component, Prop, Vue } from 'vue-property-decorator'; // 装饰器
import ComponentA from '@/components/ComponentA.vue'

// 注册组件
@Component({
  components: {
    ComponentA
  }
})
// Class-Style Vue Components
export default class HelloWorld extends Vue {
  // data
  name = 'marry'
  // props
  @Prop() private msg!: string;
  // computed
  private get getCurrentName () : string {
    return this.name
  }
  // methods
  public setName (name: string) : void {
    this.name = name
  }
  // lifecircle
  private created () : void {}
}
</script>

```

