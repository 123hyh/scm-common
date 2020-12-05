/*
 * @Author: your name
 * @Date: 2020-10-23 23:56:26
 * @LastEditTime: 2020-12-05 22:11:36
 * @LastEditors: Please set LastEditors
 * @Description: 列表编辑 组件
 * @FilePath: /scm/src/components/common/Table/component/Column/Edit.js
 */
import './edit.scss';
import CombinationForm from '../../../Form/CombinationForm';
import { ButtonGroup, Button } from 'element-ui';
export default {
  name: 'ScmTableColumnEdit',
  components: {
    ElButtonGroup: ButtonGroup,
    ElButton: Button,
    CombinationForm
  },
  props: {
    field: {
      type: String,
      required: true
    },
    schema: {
      type: Object
    },

    /* 列源数据 */
    sourceData: {
      type: [ String, Number ]
    }
  },
  data() {
    return {
      value: this.sourceData
    };
  },
  render( h ) {
    return h(
      'div',
      {
        class: [ 'scm-table-column-edit-wrap' ]
      },
      [
        h( 'CombinationForm', {
          props: {
            schema: { [ this.field ]: this.schema }
          },
          ref: 'form'
        } ),

        /* 操作按钮 */
        h( 'el-button-group', [
          h( 'el-button', {
            props: {
              type: 'primary',
              icon: 'el-icon-check'
            },
            on: {

              /* 点击确定向上 emit */
              click: async () => {
                const data = await this.$refs.form.validate();
                this.$emit( 'updateColumn', {
                  field: this.field,
                  value: data[ this.field ]
                } );
              }
            }
          } ),
          h( 'el-button', {
            props: {
              icon: 'el-icon-close'
            },
            on: {
              click: () => {
                this.value = this.sourceData;
                this.$emit( 'update:editble' );
              }
            }
          } )
        ] )
      ]
    );
  }
};
