<!--
 * @Author: your name
 * @Date: 2020-12-27 17:26:39
 * @LastEditTime: 2020-12-27 18:13:38
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \scm_frontend_common\docs\directives\validate\README.md
-->
# 校验表单指令

```js 
import {
  /* 指令 */ 
  validate,
  /* 收集器 */
  useCollertor 
} from 'scm-common/src/vue-component/Form/FormValidate/directive.ts';
```
::: tip
  校验规则 rules 参考 validate 包
:::
::: warning
  指令必须绑定在组件上,例如 Element-ui 的 input组件
:::

```vue
<template>
  <div>
    <ElInput v-validate="{
      collertor: collertor,
      rules,
      field:'name'
    }"/>
  </div>
</template>
<script>
export default{
  directives: {
    validate
  },
  data: () => ({
    /**
     * 收集器
     * */
    collertor: useCollertor(),
    /**
     * 校验规则（参考 validate 包）
     * */
    rules:{
      required: true,
      length: { min: 3, max: 4 },
      use: {
        /**
         * 自定义校验方法
         * @param { any } value 表单的值
         * @return { boolean }
         * */
        checkInt(value){
          return /^[0-9]+$/.test(v)
        }
      }
      message: {
        required: '必填',
        /**
         * 自定义校验方法错误提示语
         * */
        checkInt:'不是整数'
      }
    }
  })
}
</script>
```
