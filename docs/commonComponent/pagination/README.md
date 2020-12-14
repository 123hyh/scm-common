<!--
 * @Author: huangyuhui
 * @Date: 2020-09-29 09:55:53
 * @LastEditors: huangyuhui
 * @LastEditTime: 2020-09-29 11:18:21
 * @Description: 
 * @FilePath: \SCM 2.0\docs\commonComponent\pagination\README.md
-->
# 分页组件

  ```javascript
    import Pagination from '@/components/common/Table/component/Pagination'
  ```
 - ### 1、Props:

 | 属性名 | 类型 | 必传 | 默认值 | 备注 |
 | ------------ | ------------ | ------------ | ------------ |------------ |
 | total | number | 是 | - | 总条数
 
 -----
 - ### 2、Events：
 | 事件名 | 回调参数 | 备注 |
 | ------------ | ------------ | ------------ |
 | change | ({ page: number, limit: number }) | | 

 ```javascript 
/**
 * 分页事件（page、size 变化时触发）
 * @param { object } data 
 * @param { number } data.page 当前分页下标 
 * @param { number } data.limit 当前分页size数 
 **/
change({
  page: 1,
  limit: 10
})
 ```
 ----

 ## demo：
 ```html
 <Pagination 
    :total="total" 
    @change="handlerChange">
 </Pagination>
 ```

