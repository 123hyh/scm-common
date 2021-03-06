/*
 * @Author: huangyuhui
 * @Date: 2020-09-29 09:55:53
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-03-13 13:46:06
 * @Description: 
 * @FilePath: \scm_frontend_common\docs\.vuepress\config.js
 */
module.exports = {
  base:'/',
  title: 'SCM 2.0 Frontend Docs',
  description: '版本 1.1',
  lineNumbers:true,
  themeConfig: {
    nav: [
      { text: '指南', link: '/' },
      { text: '公共组件', link: '/commonComponent/' },
      { text: '了解更多', link: '/form/' },
    ],
    sidebar: [
      {
        title: '指南',
        path: '/',
        initialOpenGroupIndex: 0,
        children: [
          {
            title: '目录介绍',
            path: '/introduction/'
          },
          {
            title: '权限',
            path: '/permission/'
          },
          {
            title:'过滤器',
            path: '/filters/',
            initialOpenGroupIndex: 0,
            children:[
              {
                title: '率转换',
                path:'/filters/radio/'
              },
              {
                title: '日期时间',
                path:'/filters/date/'
              }
            ]
          },
          {
            title:'指令',
            path: '/directives/',
            initialOpenGroupIndex: 0,
            children:[
              {
                title:'表单校验指令',
                path:'/directives/validate/'
              },
              {
                title:'水波纹',
                path:'/directives/ripple/'
              }
            ]
          },
          {
            title:'工具函数',
            path: '/utils/',
            initialOpenGroupIndex: 0,
            children:[
                
            ]
          },
          {
            title: '公共组件',
            path: '/commonComponent/',
            initialOpenGroupIndex: 0,
            children: [
              {
                title:'开始',
                path:'/commonComponent/start/'
              },
              {
                title: '国际化',
                path: '/commonComponent/locale/',
              },
              {
                title: '表单',
                path: '/commonComponent/form/',
              },
              {
                title: '表格',
                path: '/commonComponent/table/',
                children: [
                  {
                    title: '基础表格',
                    path: '/commonComponent/baseTable/'
                  },
                  {
                    title: '组合表格',
                    path: '/commonComponent/combinationTable/',
                  },
                  {
                    title: '查询栏',
                    path: '/commonComponent/queryBar/',
                  },
                  {
                    title: '分页条',
                    path: '/commonComponent/pagination/',
                  },
                ],
              },
              {
                title:'表格Input',
                path:'/commonComponent/TableInput/'
              },
              {
                title: '模态窗',
                path: '/commonComponent/modal/',
              },
              {
                title: 'tabs 页签',
                path: '/commonComponent/tabs/'
              },
              {
                title:'keep-alive 缓存组件',
                path:'/commonComponent/KeepAlive/'
              }
            ],
          },
        ],
      },
      {
        title: '路由配置',
        path: '/router/',
        initialOpenGroupIndex: 0,
      },
    ],
  },
};
