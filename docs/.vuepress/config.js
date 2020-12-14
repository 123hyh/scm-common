/*
 * @Author: huangyuhui
 * @Date: 2020-09-29 09:55:53
 * @LastEditors: huangyuhui
 * @LastEditTime: 2020-10-16 17:34:43
 * @Description: 
 * @FilePath: \SCM 2.0\docs\.vuepress\config.js
 */
module.exports = {
  title: 'SCM 2.0 Frontend Docs',
  description: '版本 1.1',
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
            title: '公共组件',
            path: '/commonComponent/',
            initialOpenGroupIndex: 0,
            children: [
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
                title: '模态窗',
                path: '/commonComponent/modal/',
              },
              {
                title: 'tabs 页签',
                path: '/commonComponent/tabs/'
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
