/*
 * @Author: huangyuhui
 * @Date: 2020-09-21 15:55:42
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-04-23 12:05:43
 * @Description: 查询栏组件
 * @FilePath: \scm_frontend_common\src\vue-component\QueryBar\index.js
 */
import { cloneDeepWith, debounce } from 'lodash-es';
import './index.scss';
import SCMForm from '../Form/index';
import { Button, Link } from 'element-ui';
import { getScmMsg } from '../../locale';
import { getSize } from '../index';
import { findDomNode, isEmpty } from '../../utils';
import yuxStorage from 'yux-storage';

/**
 * 查询栏表单容器 className
 */
const containerClassName = 'query-bar-form-block';

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
    },
    currentEntityName() {
      return isEmpty( this.entityName ) === false ? `${this.entityName}_$$_query_bar_com` : '';
    },

    /**
     * 是否开启拖拽
     * @returns
     */
    draggabled() {
      return isEmpty( this.currentEntityName ) === false;
    },

    /**
     * 新的 schema （从 db 获取 ）
     * @returns 
     */
    newSchema() {
      const s = this.currentSchema;
      return s.length && s.length === this.schema.length  ? 
        s 
        : this.schema;
    }
  },
  props: {

    /* 表单配置 */
    schema: {
      type: Array,
      required: true
    },

    /**
     * 用于保存实体的name
     */
    entityName:{
      type: String,
      required: false
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
      hasMore: true,
      currentSchema:[],
      schemaLoaded: false
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
            props: {
              schema: this.newSchema,
              draggabledClassName: this.draggabled ?  containerClassName : '',
              entityName:`${this.entityName}_query_bar`
            },
            class: [ this.draggabled ? '' : containerClassName ],
            style: {
              width: this.draggabled ?  '100%' : '',
              visibility: this.draggabled ?  this.schemaLoaded ? 'visible' : 'hidden' : 'visible'
            },
            on: {
              draggableEnd: this.draggableEnd.bind( this ),
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

    /**
     * 初始化 schema
     */
    initailizeSchema() {
      if ( this.draggabled ) {
        yuxStorage.getItem( 
          this.currentEntityName,
          ( err, val = [] ) => {
            if (
              err === false && 
               isEmpty( val ) === false 
            ) {
              this.currentSchema = val;
            }
            this.schemaLoaded = true;
            this.$nextTick( () => {

              /* 首次加载先隐藏一次 */
              this.handlerHide();
            } );
            
          } 
        );
      }
    },

    draggableEnd( schema = [] ) {

      // 保存到 indexedDB
      if ( this.draggabled && isEmpty( schema ) === false ) {
        yuxStorage.setItem( 
          this.currentEntityName,
          schema,
          err  => {
            if ( err ) {
              console.log( err );
            }
          } 
        );
      }
    },

    /* 显示 form Item 溢出元素 */
    handlerShow() {
      const formRef = this.$refs.form.$el;
      const children = this.getFormItems( formRef );
      children?.forEach( item => {
        const top = item.offsetTop;
        if ( top === 0 && item.style.display === 'none' ) {
          item.style.display = '';
        }
      } );
    },
    getFormItems( formElem ) {
      return  this.draggabled ? 
        ( () => {
          const [ fistNode ] = findDomNode( 
            formElem,
            e => e.classList.contains( containerClassName )
          );
          return fistNode?.children;
        } )() :
        formElem.children;
    },

    /* 隐藏 form 溢出元素 */
    get handlerHide() {

      /* 用于初次赋值 */
      let useFlag = false;
      return function () {
        this.$nextTick( () => {
          const formElem = this.$refs.form.$el;

          // 拖拽改变 了容器 
          const children = this.getFormItems( formElem );
          if ( isEmpty( children ) )  return; 

          /* 暂存 溢出的Elem */
          let overflowElems = [];

          /* 1、收集溢出元素 */
          children?.forEach( ( () => {
            let firstRowTop = null;
            let prevTop = null;
            return ( item, index ) => {
              const top = item.offsetTop;
              if (
                prevTop &&
                ( top > prevTop  || top > firstRowTop ) && 
                item.classList.contains( 'query-operation' ) === false 
              ) {
                overflowElems.push( item );
              } else {
                firstRowTop = top;
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
    },
    get debounceHandlerHide() {
      return debounce( function () {
        if ( this.hideMore === true ) {
          this.handlerHide();
        }
      }, 100 );
    }
  },
  created() {
    this.initailizeSchema();
  },
  mounted() {

    const unWatch = this.$watch( 'hideMore', this.debounceHandlerHide );

    /* 首次加载先隐藏一次 */
    this.handlerHide();
  
    this.$once( 'hook:beforeDestroy', unWatch );
  }
};
