import { mergeWith } from 'lodash-es';

/*
 * @Author: your name
 * @Date: 2021-03-09 11:07:12
 * @LastEditTime: 2021-03-10 17:58:36
 * @LastEditors: Please set LastEditors
 * @Description: 合并 $listeners 事件
 * @FilePath: \scm-common\src\vue-component\Form\FormItem\utils\index.js
 */
import Vue from 'vue';

const mergeEvent = ( x, y ) => {
  x = Array.isArray( x ) ? x : [ x ];
  y = Array.isArray( y ) ? y : [ y ];
  return x.concat( y ).filter( Boolean );
};

/**
 * 合并 事件
 * @description: 必须绑定 this 调用
 * @param {*}
 * @return {*}
 */

export function mergeCustomEvents() {
  let evs = {};

  /* 必须确保是组件内调用 */
  if ( this && this instanceof Vue ) {
    evs =
    ( this.$listeners.customEvent &&
    typeof this.$listeners.customEvent === 'function'
      ? this.$listeners.customEvent()
      : {} ) ?? {};
  } else if ( process.env.NODE_ENV === 'development' ) {
    console.error( '请确保该方法 显示call 调用，并且 this instancof Vue' );
    return evs;
  }
  return mergeWith(
    {
      input: [
        this.$listeners.input,
        val  => {
          this.emit( val );
        }
      ]
    },
    evs,
    mergeEvent
  );
}
