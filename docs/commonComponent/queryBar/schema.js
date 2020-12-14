const schema = [
  {
    /* 表单 label */
    label: '名称',
    /*  输入框字段名 */
    field: 'name',
    /* 显示清除按钮 */
    clearable: true,
    /* 禁用表单 */
    disabled: true,
    /* 表单类型 */
    type: 'string',
    /* 下拉 , checkbox 的 选项 */
    options: []
  },
  /* 下拉选择 */
  {
    label: 'age',
    field: 'age',
    type: 'select',
    /* 下拉多选标识 */
    multiple: true,
    options: [
      {
        label: '测试1',
        value: '1'
      },
      {
        label: '测试2',
        value: '2'
      }
    ]
  },
  /* 开关 */
  {
    label: '开关',
    field: 'switch',
    type: 'switch',
    disabled: false
  },
  {
    label: '时间选择',
    field: 'date1',
    type: 'date',
    disabled: false,
    clearable: true,
    dateType: 'date',
    valueFormat: 'yyyy-MM-dd'
  }
]