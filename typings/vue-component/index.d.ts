/*
 * @Author: huangyuhui
 * @Date: 2020-12-08 11:11:03
 * @LastEditors: huangyuhui
 * @LastEditTime: 2020-12-09 11:27:10
 * @Description: 
 * @FilePath: \scm_frontend_common\typings\vue-component\index.d.ts
 */
/**
 * 注册 scmCommon 
 * @param {object} options 参数集合
 * @param {string} options.size 组件尺寸（参考element 值）
 * @param {string} options.dictRequest 码值接口
 * @description: 
 * @param {*}
 * @return {*}
 */
export const useScmComponent: (options: {
  size: 'medium' | 'small' | 'mini',
  dictRequest: (dictKeyword: string) => Promise<any> | any[]
}) => {
  install: () => void
}

export * from './CombinationForm'

export * from './CombinationTable'

export * from './RouterView'

export * from './tabs'