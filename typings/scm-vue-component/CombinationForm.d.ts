/*
 * @Author: your name
 * @Date: 2020-12-07 23:37:03
 * @LastEditTime: 2020-12-07 23:37:58
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /scm-common/typings/scm-vue-component/CombinationForm.d.ts
 */
import { ComponentOptions } from 'vue';

import { FormSchema } from './formSchema';

 type CombinationFormType = ComponentOptions<{
  props: {
    /* 表单schema */
    schema: FormSchema;
    size: 'medium' | 'small' | 'mini';
  };
  methods: {
    /* 获取当前表单数据 */
    getAllFormData: () => any;
    /* 修改表单数据 */
    setFormData: (
      setFn: (currentFormComponentData) => { [prop: string]: any }
    ) => Promise<any>;
    /*  校验表单，通过后返回 data */
    validate: () => Promise<{ [prop: string]: any }> | false;
    /* 重置表单 */
    resetFields: () => boolean;
    /* 移除表单校验结果 */
    clearValidate: (fields: string | string[]) => boolean;
  };
}>;
export const CombinationForm: CombinationFormType;