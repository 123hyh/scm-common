/*
 * @Author: your name
 * @Date: 2020-11-08 00:24:12
 * @LastEditTime: 2020-12-22 23:37:43
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \SCM_2.0\src\views\example\src\formvalidate\collector.js
 */

/**
 * rules 收集器
 * @description:
 * @param {*}
 * @return {*}
 */
export default function useCollector() {
  const rules = {};
  return {
    subscribe( itemValidate, field ) {
      rules[ field ] = itemValidate;
    },
    unSubscribe( field ) {
      rules[ field ]?.reset();
      delete rules[ field ];
    },

    /**
     * 校验字段方法
     * @description: 如果传入空参数则校验所有，否则校验 fields中的 字段
     * @param {*} field
     * @return {*}
     */
    validate( fields = [] ) {
      return new Promise( ( resolve, reject ) => {
        Promise.allSettled(
          (

            /* 如果 fields 是空 则校验所有 */
            fields.length ? fields : Object.keys( rules )
          ).reduce(
            ( prev, rulesKey ) => {
              prev.push(
                rules[ rulesKey ].validateCb()
              );
              return prev;
            }, []
          )
        ).then( result => {
          let isAllPass = true;
          let errorFields = [];
          result.forEach( item => {
            if ( item.status === 'rejected' ) {
              const { fields } = item.reason;
              isAllPass = false;
              debugger;
              errorFields = [ ...errorFields, ...Object.keys( fields ) ];
            } else if ( item.status === 'fulfilled' ) {
              const { value: field } = item;
              rules[ field ].reset();
            }
          } );

          isAllPass ? resolve( true ) : reject( errorFields );
        } );
      } );
    },

    /**
     * 重置校验信息
     * @description:
     * @param {*}
     * @return {*}
     */
    resetValidate( fields = [] ) {
      ( fields.length ? fields : Object.keys( rules ) ).forEach( rulesKey => {
        const { reset } = rules[ rulesKey ];
        reset();
      } );
    }
  };
}
