/*
 * @Author: your name
 * @Date: 2020-11-15 14:34:19
 * @LastEditTime: 2020-11-26 11:42:40
 * @LastEditors: huangyuhui
 * @Description: In User Settings Edit
 * @FilePath: \customs\src\components\common\RouterView\index.ts
 */
import { CreateElement } from 'vue';
let id = 0;

function generateBox( h: CreateElement ) {
  return h(
    'router-view',
    {
      class: [ 'scm-paved-wrapper' ]
    }
  );
}

/**
 * 包装 router-view组件
 * @param { string } componentName 组件name
 * @param { boolean | { exclude: string[] } } keepAlive 是否缓存该组件 | 不需要缓存组件的名称
 */

export default function routerView(
  componentName: string,
  keepAlive: { exclude: string[] } | boolean = true ) {
  return {
    name: componentName || `RouterWrapper_${id++}`,
    render( h: CreateElement ) {
      return h(
        'div',
        [
          h(
            'transition',
            {
              props: {
                name: 'side'
              }
            },
            [
              keepAlive
                ? h(
                  'keep-alive',
                  {
                    props: {
                      exclude: typeof keepAlive === 'object' ? keepAlive.exclude : undefined
                    }
                  },
                  [
                    generateBox( h )
                  ]
                )
                : generateBox( h )
            ]
          )
        ]
      );
    }
  };
}
