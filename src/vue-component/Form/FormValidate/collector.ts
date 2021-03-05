/*
 * @Author: your name
 * @Date: 2020-12-26 22:01:32
 * @LastEditTime: 2021-03-05 18:28:20
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \scm_frontend_common\src\vue-component\Form\FormValidate\collector.ts
 */
import { forEachObject } from '../../../utils/index';
import Schema, { SchemaDefinition } from 'validate';
import { cloneDeep } from 'lodash-es';

abstract class CollectorMeth {
  private validates: {
    [props: string]: () => { value: any; rules: SchemaDefinition };
  };

  constructor() {
    this.validates = Object.create( null );
  }

  validate( fields: string[] = [] ) {
    const set = new Set( fields.length ? fields : Object.keys( this.validates ) );
    const values = Object.create( null );
    const rulesObj: any = Object.create( null );
    const errCbs: any = Object.create( null );
    const succCbs: any = Object.create( null );

    forEachObject(
      this.validates,
      (
        key,
        rulesCb: () => {
          value: any;
          rules: SchemaDefinition;
          succCb: () => void;
          errCb: ( ...args: any[] ) => void;
        }
      ) => {
        if ( set.has( key ) ) {
          const { value, rules, errCb, succCb } = rulesCb();
          rulesObj[ key ] = rules;
          values[ key ] = value;
          errCbs[ key ] = errCb;
          succCbs[ key ] = succCb;
        }
      }
    );
    const post = new Schema( rulesObj );

    //  (引用类型需克隆，否则会被清空的 bug，object 类型数据需 转为json 字符串，否则无法 传入到自定义校验方法中)
    const errs = post.validate( objToJson( cloneDeep( values ) ) );

    /* 通知错误信息 */
    errs.length &&
      errs.forEach( ( err ) => {
        errCbs[ err.path ]( ( <any>err ).message );
      } );

    /* 通知成功信息 */
    forEachObject(
      succCbs,
      ( () => {
        const errFields = new Set( errs.map( ( { path } ) => path ) );
        return ( key: string, cb: () => void ) => {
          if ( errFields.has( key ) === false ) {
            cb();
          }
        };
      } )()
    );
    return errs.length === 0 ? Promise.resolve( true ) : Promise.reject( false );
  }

  addValidate(
    field: string,
    rulesCb: () => { value: any; rules: SchemaDefinition }
  ): boolean {
    this.validates[ field ] = rulesCb;
    return true;
  }

  unValidate( field: string ): boolean {
    delete this.validates[ field ];
    return true;
  }

  resetValidate( fields: string[] = [] ) {
    const set = new Set( fields.length ? fields : Object.keys( this.validates ) );
    forEachObject(
      this.validates,
      (
        key,
        rulesCb: () => {
          value: any;
          rules: SchemaDefinition;
          succCb: () => void;
          errCb: ( ...args: any[] ) => void;
        }
      ) => {
        if ( set.has( key ) ) {
          const { value, rules, errCb, succCb } = rulesCb();
          succCb();
        }
      }
    );
  }
}
export class Collector extends CollectorMeth {
  constructor() {
    super();
  }
}

/**
 * 对象 转 json 字符串
 * @description:
 * @param {T} obj
 * @return {*}
 */
function objToJson<T>( obj: T ) {
  forEachObject( obj, ( key, value ) => {
    const isObjType =
      Object.prototype.toString.
        call( value ).
        slice( 8, -1 ).
        toLocaleLowerCase() === 'object';
    if ( isObjType ) {
      ( obj as { [prop: string]: any } )[ key ] = JSON.stringify( value );
    }
  } );
  return obj;
}
