<!--
 * @Author: huangyuhui
 * @Date: 2020-10-16 17:32:21
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-12-14 23:32:23
 * @Description: 
 * @FilePath: \SCM 2.0\docs\commonComponent\tabs\README.md
-->
# tabs 

  该组件默认点击会跳转到对应的 path
  ```js
    import ScmTabs from 'scm-common/src/vue-component/Tbas'
  ```
  
  - ## Props:
    | 属性名| 类型 | 是否必传 | 默认值 | 备注 |
    | ------------ | ------------ | ------------ | ------------ | ------------ |
    | list | Array\<object\> | 是 | - | tabs 集合 | 
    
    ```javascript
    const list = [
         {
           /* item 文字 */
           label: '显示的文字',
           /* router path  */
           path: 'routePath',
           /* 是否禁用 */
           disabled: Boolean,
           /* 当有该参数时自行匹配高亮，否则按照 path 匹配  */
           reg: RegExp
         }
         ...
      ] 
    ```

  - ## Event：
    | 事件名 | 回调参数 |  备注 | 
    | ------------ | ------------ | ------------ |
    |  click | Function( path: string) | 点击 tabs item 事件 | 

  
    - ### click 点击 tabs item 事件
    ```javascript
    /**
    * tabs 点击事件
    * @param { string } path item 的 path 
    */
    click(path)
    ```

  ::: details 点击查看 example 代码
  <<< @/docs/commonComponent/tabs/example.vue
  :::