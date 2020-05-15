module.exports = {
  base: '/',
  dest: '/dist',
  title: 'Can You..',
  description: '',
  head: [
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }]
  ],
  serviceWorker: true,
  themeConfig: {
    docsDir: 'blog',
    editLinks: false,
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Blog', link: '/learning/basics/javascript-1' }
    ],
    sidebar: {
      '/learning/': [
        {
          title: '基础知识',
          collapsable: false,
          path: '/learning/basics/',
          children: [
            {
              title: 'HTML + CSS',
              collapsable: false,
              children: [
                'basics/css-1'
              ]
            },
            {
              title: 'Javascript基础',
              collapsable: false,
              children: [
                'basics/javascript-1',
                'basics/javascript-2',
                'basics/javascript-3',
                'basics/javascript-4',
                'basics/javascript-5',
                'basics/javascript-7'
              ]
            },
            {
              title: '前端性能优化',
              collapsable: false,
              children: [
                'basics/javascript-6'
              ]
            },
            {
              title: '前端工程化实践',
              collapsable: false,
              children: []
            },
            {
              title: '计算机网络知识',
              collapsable: false,
              children: []
            },
            {
              title: '数据结构与算法',
              collapsable: false,
              children: [
                'basics/leetcode-1'
              ]
            },
            {
              title: '服务端常识',
              collapsable: false,
              children: [
                'basics/service-1',
                'basics/service-2'
              ]
            }
          ]
        },
        {
          title: '技术栈 / 框架',
          collapsable: false,
          children: [
            {
              title: 'Vue',
              collapsable: false,
              children: [
                'tech-stack/vue-1'
              ]
            },
            {
              title: 'Typescript',
              collapsable: false,
              children: [
                'tech-stack/typescript-1',
              ]
            },
            {
              title: 'React',
              collapsable: false,
              children: []
            },
            {
              title: 'Flutter',
              collapsable: false,
              children: [
                'tech-stack/flutter-1',
                'tech-stack/flutter-2',
                'tech-stack/flutter-3',
                'tech-stack/flutter-4',
                'tech-stack/flutter-5'
              ]
            },
            {
              title: 'Node',
              collapsable: false,
              children: [
                'tech-stack/node-4',
                'tech-stack/node-1',
                'tech-stack/node-2',
                'tech-stack/node-3'
              ]
            },
            {
              title: '小程序',
              collapsable: false,
              children: [
                'tech-stack/uni-app'
              ]
            },
            {
              title: 'Mysql',
              collapsable: false,
              children: [
                'tech-stack/mysql-1'
              ]
            },
            {
              title: 'Docker',
              collapsable: false,
              children: [
                'tech-stack/docker-1'
              ]
            },
            {
              title: 'WebAssembly',
              collapsable: false,
              children: []
            },
            {
              title: 'Serverless',
              collapsable: false,
              children: []
            },
            {
              title: 'GraphQL',
              collapsable: false,
              children: []
            }
          ]
        },
        {
          title: '组件库设计',
          collapsable: false,
          children: [
            {
              title: 'win-design',
              collapsable: false,
              children: [
                'ui-design/2',
                'ui-design/3',
                'ui-design/1'
              ]
            }
          ]
        },
        {
          title: '源码阅读',
          collapsable: false,
          children: [
            {
              title: 'Vue.js',
              collapsable: false,
              children: [
                'source-code/vue-code-1',
                'source-code/vue-code-2',
                'source-code/vue-code-3',
                'source-code/vue-code-4'
              ]
            },
            {
              title: 'Vuex',
              collapsable: false,
              children: []
            },
            {
              title: 'Vue-router',
              collapsable: false,
              children: []
            },
            {
              title: 'Axios',
              collapsable: false,
              children: []
            },
            {
              title: 'Vue-next',
              collapsable: false,
              children: []
            }
          ]
        },
        {
          title: '前端工程化',
          collapsable: false,
          children: [
            {
              title: 'Git',
              collapsable: false,
              children: []
            },
            {
              title: 'Npm',
              collapsable: false,
              children: []
            },
            {
              title: 'Webpack',
              collapsable: false,
              children: []
            },
            {
              title: 'Gitlab',
              collapsable: false,
              children: []
            },
            {
              title: 'Mock',
              collapsable: false,
              children: []
            }
          ]
        },
        {
          title: '试题集锦',
          collapsable: false,
          children: [
            {
              title: 'Javascript',
              collapsable: false,
              children: [
                'qa-set/q2'
              ]
            },
            {
              title: '浏览器',
              collapsable: false,
              children: [
                'qa-set/q1'
              ]
            }
          ]
        },
        {
          title: '课程学习',
          collapsable: false,
          children: [
            {
              title: '基于typescript重构axios',
              collapsable: false,
              children: [
                // 'courses/c-1',
                'courses/c-2',
                'courses/c-3',
                'courses/c-4',
                'courses/c-5',
                'courses/c-6',
                'courses/c-7',
                'courses/c-8',
                'courses/c-9',
                'courses/c-10',
                'courses/c-11',
                'courses/c-12',
                'courses/c-13'
              ]
            },
            {
              title: '前端性能优化原理与实践',
              collapsable: false,
              children: [
                'courses/c2-1',
                'courses/c2-2'
              ]
            }
          ]
        },
        {
          title: '招聘信息',
          collapsable: false,
          children: [
            'jd/jd-1'
          ]
        }
      ]
    },
    lastUpdated: '最近更新'
  }
}
