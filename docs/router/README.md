<!--
 * @Author: huangyuhui
 * @Date: 2020-10-10 18:38:53
 * @LastEditors: huangyuhui
 * @LastEditTime: 2020-10-27 11:42:03
 * @Description: 
 * @FilePath: \SCM 2.0\docs\router\README.md
-->
# 路由配置

 - ## route：

    | 属性名 | 类型  | 是否必传 | 默认值 | 备注 |
    | ----------- | ----------- | ----------- | ----------- | ----------- | ----------- |
    | hidden | boolean | - | - | 值为真时 菜单栏不显示 该路由 | 
    | inherit | boolean | - | - | 子路由继承权限路由 | 
  
 - ## meta：
 
    | 属性名 | 类型  | 是否必传 | 默认值 | 备注 |
    | ----------- | ----------- | ----------- | ----------- | ----------- | ----------- |
    | breadcrumbTitle | string | - | - | 面包屑显示文字\(i18n\) | 
    | title | string | - | - | tab页签及菜单 显示的title\(i18n\) | 
    | icon | string | - | - | svg 图标名称 | 
    | noCache | boolean | - | - | 是否缓存该路由 | 

    ::: tip
    breadcrumbTitle 在 `/src/components/Breadcrumb/lang.json` 添加
    :::
    ::: details 点击查看详细配置demo
    ```javascript 
    {
      path: '/customer',
      component: Layout,
      redirect: '/customer/business_related',
      hidden: true,
      inherit: true
      meta: {
        title: 'customerManagement',
        icon: 'customer',
        breadcrumbTitle: 'customerManagement',
        noCache: true
      },
    }
    ```
    :::
  