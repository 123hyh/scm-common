/*
 * @Author: your name
 * @Date: 2020-12-07 23:37:03
 * @LastEditTime: 2020-12-09 14:27:01
 * @LastEditors: huangyuhui
 * @Description: In User Settings Edit
 * @FilePath: \scm_frontend_common\typings\vue-component\CombinationForm.d.ts
 */

import { FormSchema, OptionsItem, OptionsType, SelectType } from './formSchema';

type CombinationFormType =  {
    
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
} & {
  setDictValue(
    schemaItem: SelectType,
    filterCallback: (element: OptionsItem, index: number, array: OptionsType) => boolean
  ): OptionsType
}
export const CombinationForm: CombinationFormType;
