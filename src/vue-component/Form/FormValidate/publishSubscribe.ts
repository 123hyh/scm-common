/*
 * @Author: your name
 * @Date: 2020-12-22 23:33:35
 * @LastEditTime: 2020-12-22 23:35:54
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \scm_frontend_common\src\vue-component\Form\FormValidate\publishSubscribe.ts
 */

interface PublishSubscribeMethod {

  /**
   * 订阅
   */
  subscribe: ( key: string, handler: () => any ) => PublishSubscribe['unSubscribe'],

  /**
   * 取消订阅
   */
  unSubscribe: ( key: string, handler: () => any ) => boolean,

  /**
   * 发布
   */
  publish: ( key: string, handler: <T>( cbs: Array<() => any> ) => T ) => any
}
abstract class SubscribeCenter {
  protected topics: { [prop: string]: Array<() => any> };

  constructor() {
    this.topics = Object.create( null );
  }

}

/**
 * 发布订阅
 */
export class PublishSubscribe extends SubscribeCenter implements PublishSubscribeMethod {
  constructor() {
    super();
  }

  subscribe( key: string, handler: () => any ) {
    const currentTopics = this.topics[ key ];
    if ( currentTopics?.length === undefined ) {
      this.topics[ key ] = [];
      this.topics[ key ].push( handler );
    } else {
      const index = currentTopics.findIndex( currentHandler => currentHandler === handler );
      if ( ~index ) {
        return () => this.unSubscribe( key, handler );
      } else {
        this.topics[ key ].push( handler );
      }
    }
    return () => this.unSubscribe( key, handler );
  }

  unSubscribe( key: string, handler: () => any ) {
    this.topics[ key ] = this.topics[ key ].filter( item => item !== handler );
    return true;
  }

  publish( key: string, handler: <T>( cbs: Array<() => any> ) => T ) {
    return handler( this.topics[ key ] ?? [] );
  }
}
