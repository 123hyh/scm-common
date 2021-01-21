/*
 * @Author: huangyuhui
 * @Date: 2021-01-21 18:01:05
 * @LastEditors: huangyuhui
 * @LastEditTime: 2021-01-21 18:53:33
 * @Description: 组合模式
 * @FilePath: \scm_frontend_common\src\utils\designPatterns\Combination.ts
 */
import { remove } from 'lodash-es';

type BaseFn = ( ...args: any[] ) => void;
type BaseComposites = { composites?: Composites, exec: BaseFn }
type Composites = Array<BaseComposites>;

class Composite {
  private composites: Composites

  constructor() {
    this.composites = [];
  }

  /**
   * 执行命令
   * @description: 
   * @param {*}
   * @return {*}
   */
  exec() {
    for ( const commondItem of this.composites ) {
      commondItem.exec();
    }
  }


  /**
   * 删除
   * @description: 
   * @param {BaseComposites} item
   * @return {*}
   */
  remove( item: BaseComposites | BaseFn ) {
    remove( this.composites,  citem  => citem === item );
  }

  /**
   * 添加任务
   * @description: 
   * @param {BaseComposites} commond
   * @return {*}
   */
  add( commond: BaseComposites | BaseFn ) {
    this.composites.push(
      typeof commond === 'function' ?
        { exec: commond } :
        commond
    );
    return this;
  }
}

/**
 * 创建组合模式实例
 * @description: 
 * @param {*}
 * @return {*}
 */
export const useComposites = () => new Composite();