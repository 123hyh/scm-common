declare const _default: {
    install: (_Vue: any, options: {
        size: 'medium' | 'small' | 'mini';
        dictRequest: (dictKeyword: string) => Promise<any> | any[];
    }) => void;
};
export default _default;
export declare function getSize(): string;
export declare function getCodeDict(keyword: string): any[] | Promise<any>;
/**
 * 表单组件
 * @description:
 * @param {*}
 * @return {*}
 */
export { default as CombinationForm } from './Form/CombinationForm';
/**
 * 表格组件
 * @description:
 * @param {*}
 * @return {*}
 */
export { default as CombinationTable } from './table/CombinationTable';
/**
 * 包装路由组件
 * @description:
 * @param {*}
 * @return {*}
 */
export { default as routerView } from './RouterView';
/**
 * tab 组件
 * @description:
 * @param {*}
 * @return {*}
 */
export { default as ScmTabs } from './Tbas';
