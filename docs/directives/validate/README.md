<!--
 * @Author: your name
 * @Date: 2020-12-27 17:26:39
 * @LastEditTime: 2020-12-28 21:41:20
 * @LastEditors: huangyuhui
 * @Description: In User Settings Edit
 * @FilePath: \scm_frontend_common\docs\directives\validate\README.md
-->
# 校验表单指令

```js 
import {
  /* 指令 */ 
  validate,
  /* 收集器 */
  useCollector 
} from 'scm-common/src/vue-component/Form/FormValidate/directive.ts';
```
::: tip
  校验规则 rules 参考 validate 包
:::
::: warning
  指令必须绑定在组件上,例如 Element-ui 的 input组件
:::

- ## props:
----- 

| 属性名 | 类型  | 是否必传 | 默认值 | 备注 |
| ----------- | ----------- | ----------- | ----------- | ----------- |
| collertor | object | 是 | - | 收集器 |
| rules | object | 是 | - | 表单的校验规则（参考 validate 规则） |
| field | string | 是 | - | 字段名 |
| fixed | boolean | 否 | - | 启用固定定位样式（在el-table中启用，避免层叠bug） |

- ## collertor: 校验收集器

-----
| 方法名 | 参数  |  备注 |
| ----------- | ----------- | ----------- |
| validate | validate(fields: string[] \| undefined)  | 校验表单， 不传入参数则校验所收集的所有字段 |

```vue
<template>
  <div>
    <ElInput v-validate="{
      collertor: collertor,
      rules,
      field:'name',
      fixed:false
    }"/>
    <button @click.stop="handlerValidate">校验</button>
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
    collertor: useCollector(),
    /**
     * 校验规则（参考 validate 包）
     * */
    rules:{
      required: true,
      length: { 
        min: 3, 
        max: 4 
      },
      use: {
        /**
         * 自定义校验方法
         * @param { any } value 表单的值
         * @return { boolean }
         * */
        checkInt(value){
          return  /^[0-9]+$/.test(v)
        }
      }
      message: {
        required: '必填',
        length:'长度3~4'
        /**
         * 自定义校验方法错误提示语
         * */
        checkInt:'不是整数'
      }
    }
  }),
  methods:{
    handlerValidate(){
      /* 校验全部 */
      this.collertor.validate()
      /* 校验部分字段 */
      this.collertor.validate( [ 'name', 'age' ] )

    }
  }
}
</script>
```
