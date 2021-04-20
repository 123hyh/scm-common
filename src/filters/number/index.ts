/*
 * @Author: your name
 * @Date: 2021-03-18 12:17:27
 * @LastEditTime: 2021-04-20 10:04:57
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \scm-common\src\filters\number\index.ts
 */
/**
 * 金额 转 大写汉字
 * @description:
 * @param { number | string } amount 金额
 * @return { string }
 */
export function amountToUpperCase( amount: number | string ) {
  if ( !/^(0|[1-9]\d*)(\.\d+)?$/.test( amount as string ) ) {
    return '数据非法';
  }
  let unit = '千百拾亿千百拾万千百拾元角分';
  let str = '';
  amount += '00';
  const p = ( amount as string ).indexOf( '.' );
  if ( p >= 0 ) amount =
      ( amount as string ).substring( 0, p ) + ( amount as string ).substr( p + 1, 2 );
  unit = unit.substr( unit.length - ( amount as string ).length );
  for ( let i = 0; i < ( amount as string ).length; i++ ) {
    str +=
      '零壹贰叁肆伍陆柒捌玖'.charAt( ( amount as any ).charAt( i ) ) + unit.charAt( i );
  }
  return str.
    replace( /零(千|百|拾|角)/g, '零' ).
    replace( /(零)+/g, '零' ).
    replace( /零(万|亿|元)/g, '$1' ).
    replace( /(亿)万|壹(拾)/g, '$1$2' ).
    replace( /^元零?|零分/g, '' ).
    replace( /元$/g, '元整' );
}

/**
 *  数字 千分位处理
 *  1234567 -> 1,234,567 
 * @description 移动端 Number.toLocaleString 处理存在兼容性
 */
export  function thousands( value = '' )  {
  value = value === null ? '' : value;

  const [ integer, decimal ] = ( value + '' ).split( '.' );
  const regexp = /\d{1,3}(?=(\d{3})+(\.\d*)?$)/g;
  return `${integer.replace( regexp, '$&,' )}${decimal ? ( '.' + decimal ) : ''}`;
}
