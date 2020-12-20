
/*
 * @Author: your name
 * @Date: 2020-11-06 22:12:55
 * @LastEditTime: 2020-11-08 01:01:25
 * @LastEditors: Please set LastEditors
 * @Description: FormItem 组件(带校验)
 * @FilePath: \SCM_2.0\src\views\example\src\formvalidate\Validate.js
 */
import AsyncValidator from 'async-validator'
import { debounce } from 'lodash'
import './validate.scss'

export { default as useCollector } from './collector.js'

export default {
  name: 'ScmFormItem',
  componentName: 'ElFormItem',
  props: {
    label: {
      type: String
    },
    /* value 值 用于监听 change 事件 */
    value: [String, undefined, Number, Boolean, null],
    /* 检验规则，参考 element-ui 表单 rules */
    rules: {
      type: [Array, Function],
      required: true
    },
    /* 字段名 */
    field: {
      type: String,
      required: true
    },
    /* 校验 rules 收集器 */
    collector: {
      type: Object,
      required: true
    }
  },
  data: () => ( {
    /* 是否校验通过 */
    validateData: {
      isPass: true,
      /* 校验错误文字 */
      errorMsg: ''
    }
  } ),
  computed: {
    triggers() {
      return Array.of( ...new Set( this.rules.reduce( ( prev, rule ) => {
        if ( rule.trigger ) {
          prev.push( ...typeof rule.trigger === 'string' ? [rule.trigger] : rule.trigger )
        }
        return prev
      }, [] ) ) )
    }
  },
  mounted() {
    this.registerRulesHook()
    /* 注册 element input 下的事件 */
    this.$on( 'el.form.blur', debounce( ( e ) => {
      if ( this.triggers.some( item => item === 'blur' ) ) {
        this.selfValidate()
      }
    }, 70 ) )
    this.$on( 'el.form.change', debounce( ( e ) => {
      this.$emit( 'change', this.value )
    }, 70 ) )
  },
  methods: {
    /**
     * 重置 校验 信息
     * @description:
     * @param {*}
     * @return {*}
     */
    resetCurrentValidateMessage() {
      const currentData = this.validateData
      currentData.isPass = true
      currentData.errorMsg = ''
    },
    /**
     * 注册 rules
     * @description:
     * @param {*}
     * @return {*}
     */
    registerRulesHook() {
      /* 1、收集rules */
      this.$watch( 'rules', ( currenRules = [] ) => {
        /* 4、change 事件 另行处理 */
        this.changeHook( this.triggers.some( item => item === 'change' ) )
        if ( currenRules.length ) {
          const validator = new AsyncValidator( { [this.field]: currenRules } )

          this.collector.subscribe(
            {
              validateData: this.validateData,
              reset: this.resetCurrentValidateMessage.bind( this ),
              /* 调用 publish 执行该方法进行校验 */
              validateCb: () => {
                return new Promise(
                  ( resolve, reject ) => {
                    validator.validate(
                      { [this.field]: this.value }
                    )
                      .then(
                        resolve.bind( null, this.field )
                      )
                      .catch(
                        errors => {
                          const { errors: currentError } = errors
                          /* 校验失败 修改当前组件 状态 */
                          const currentData = this.validateData
                          currentData.isPass = false
                          currentData.errorMsg = currentError[0].message
                          reject( errors )
                        }
                      )
                  }
                )
              }
            },
            this.field
          )
        } else {
          /* 注销 该字段 的 校验 */
          this.collector.unSubscribe( this.field )
        }
      }, {
        deep: true,
        immediate: true
      } )
      /* 2、销毁时 删除 当前组件 rules */
      this.$on( 'hook:beforeDestroy', () => {
        this.collector?.unSubscribe( this.field )
      } )
    },

    /** 组件自调 校验方法
     * @description:
     * @param {*}
     * @return {*}
     */
    get selfValidate() {
      return debounce( function selfValidate() {
        console.log( `${ this.field }: 触发校验` )
        this.collector.validate( [this.field] )
      }, 150 )
    },
    /**
     * 注册 value 变化时 触发 change 事件
     * @description:
     * @param {*}
     * @return {*}
     */
    get changeHook() {
      // eslint-disable-next-line no-unused-vars
      let unwatch = null
      return function changeHook( isRegister = true ) {
        if ( isRegister && unwatch === null ) {
          unwatch = this.$watch( 'value', ( val ) => {
            this.$emit( 'el.form.change', val )
            this.selfValidate()
          }, { deep: true } )
        } else {
          unwatch && unwatch()
          unwatch = null
        }
      }
    }
  },
  render( h ) {
    return <div class='scm-validate-wrap' data-validate-field={this.field}>
      <label
        for={this.field}
        class={`scm-validate-label ${ this.rules.some( rule => rule.required ) ? 'scm_required' : '' }`}
      >
        {
          this.label ? this.label : this.$scopedSlots?.label()
        }
      </label>
      <div class='scm-validate-content'>
        {
          this.$scopedSlots?.default()
        }
        {
          this.validateData.isPass === false && (
            <div class={`scm-validate-error scm-validate-error_${ this.field }`}>{
              this.validateData.errorMsg
            }</div>
          )
        }
      </div>
    </div>
  }
}
