/*
 * @Author: huangyuhui
 * @Date: 2020-09-21 15:55:42
 * @LastEditors: huangyuhui
 * @LastEditTime: 2021-01-25 14:01:21
 * @Description: 查询栏组件
 * @FilePath: \scm_frontend_common\src\vue-component\QueryBar\index.js
 */
import { cloneDeepWith, debounce } from 'lodash-es';
import './index.scss';
import SCMForm from '../Form/index';
import { Button, Link } from 'element-ui';
import { getScmMsg } from '../../locale';
import { getSize } from '../index';
export default {
  name: 'SCM_QueryBar',
  components: {
    SCMForm,
    ElButton: Button,
    ElLink: Link
  },

  computed: {

    /* 查询栏表单数据 */
    formData: {
      get() {
        return cloneDeepWith( this.$refs.form.formData );
      }
    },
    resetFormData: {
      get() {
        return this.$refs.form.resetFormData;
      }
    }
  },
  props: {

    /* 表单配置 */
    schema: {
      type: Array,
      required: true
    }
  },
  data() {
    return {

      /**
       *  展开/收起 查询栏 标识
       */
      hideMore: true,      

      /**
       * 是否存在更多查询，用于隐藏 更多按钮
       */
      hasMore: true
    };
  },
  render( h ) {
    return h(
      'div',
      {
        class: [
          'scm_query-bar-container'
        ]
      },
      [

        /* 表单组件 */
        h(
          'SCMForm',
          {
            ref: 'form',
            class: [ 'query-bar-form-block' ],
            props: {
              schema: this.schema
            },
            on: {
              change: data => {
                this.formDataChange( data );
              }
            }
          },
          [
            h( 
              'div',
              {
                class:[ 'query-operation' ],
                slot: 'operation',
                ref:'queryOperation'
              }, 
              [
                h( 'el-button', {
                  props:{
                    size: getSize()
                  },
                  on:{
                    click:( e ) => {
                      e.stopPropagation();

                      /* 重置表单内容 */
                      this.resetFormData();
                      this.handlerButtonClick( {
                        trigger: 'search',
                        formData: {}
                      } );
                    }
                  }
                }, getScmMsg( 'button.reset' ) ),
                h( 'el-button', {
                  props:{
                    type: 'primary',
                    size: getSize()
                  },
                  on:{

                    /**
                     * 点击查询按钮
                     * @param {*} e 
                     */
                    click: ( e ) => {
                      e.stopPropagation();
                      this.handlerButtonClick( {
                        trigger: 'search',
                        formData: this.formData
                      } );
                    }
                  }
                }, getScmMsg( 'button.query' ) ),
                h( 'el-button', {
                  style:{
                    display: this.hasMore ? 'inline-flex' : 'none'
                  },
                  class: [ 'collapse-button' ],
                  props:{
                    type:'text',
                    size: getSize(),
                    icon: `el-icon-arrow-${this.hideMore ? 'down' : 'up'}`
                  },
                  on:{
                    click: ( e ) => {
                      e.stopPropagation();
                      this.hideMore = !this.hideMore;
                      if ( this.hideMore === true ) {
                        return this.handlerHide();
                      }
                      this.handlerShow();
                    }
                  }
                }, getScmMsg( `button.${this.hideMore ? 'expand' : 'collapse'}` ) )
              ] 
            )
          ]
        )
      ]
    );
  },
  methods: {

    /* 显示 form Item 溢出元素 */
    handlerShow() {
      const formRef = this.$refs.form.$el;
      const children = formRef?.children;
      children?.forEach( item => {
        const top = item.offsetTop;
        if ( top === 0 && item.style.display === 'none' ) {
          item.style.display = '';
        }
      } );
    },

    /* 隐藏 form 溢出元素 */
    get handlerHide() {

      /* 用于初次赋值 */
      let useFlag = false;
      return function () {
        this.$nextTick( () => {
          const formElem = this.$refs.form.$el;
          const children = formElem.children;

          /* 暂存 溢出的Elem */
          let overflowElems = [];

          /* 1、收集溢出元素 */
          children?.forEach( ( () => {
            let prevTop = null;
            return ( item, index ) => {
              const top = item.offsetTop;
              const nextTop = children[ index + 1 ]?.offsetTop;
              if (
                prevTop &&
                ( top > prevTop  || nextTop > top ) && 
                item.classList.contains( 'query-operation' ) === false 
              ) {
                overflowElems.push( item );
              } else {
                prevTop = top;
              }
            };
          } )() );

          /* 1.1 是否 显示展开按钮 */
          if ( useFlag === false ) {
            this.hasMore = overflowElems.length > 0;
            useFlag = true;
          }

          /* 2、对溢出元素 进行一次性的隐藏 */
          overflowElems.forEach( elem => { elem.style.display = 'none'; } );
          overflowElems = [];

          /* 3、给 formBox 固定宽度 */
          // eslint-disable-next-line no-constant-condition
          if ( false && formElem?.offsetWidth ) {

            /* 之所以加 1px 是避免 实际有小数，获取的是个整数，导致换行 */
            formElem.style.width = formElem.offsetWidth + 1 + 'px';
          }
        } );
      };
      
    },

    /**
     * form change 事件
     * @description:
     * @param { object } data
     * @param { string } data.field 触发的字段
     * @param { object } data.data 修改的数据
     * @param { object } data.formData 携带的表单数据
     */
    get formDataChange() {
      return debounce(
        function ( data ) {
          this.$emit( 'change', data );
        }, 200
      );
    },

    /**
     * 查询栏点击按钮事件
     * @description:
     * @param { object } data
     * @param { string } data.trigger 触发的类型
     * @param { object } data.formData 携带的表单数据
     */
    get handlerButtonClick() {
      return debounce(
        function ( data ) {
          this.$emit( 'opration', data );
        },
        100
      );
    }
  },
  mounted() {

    const handler = debounce( () => {
      if ( this.hideMore === true ) {
        this.handlerHide();
      }
    }, 100 );
    const unWatch = this.$watch( 'hideMore', handler );

    /* 首次加载先隐藏一次 */
    this.handlerHide();
    this.$once( 'hook:beforeDestroy', unWatch );
  }
};
