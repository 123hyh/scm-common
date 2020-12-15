/*
 * @Author: your name
 * @Date: 2020-12-05 12:44:16
 * @LastEditTime: 2020-12-15 13:09:48
 * @LastEditors: huangyuhui
 * @Description: In User Settings Edit
 * @FilePath: \scm_frontend_common\src\example\index.js
 */
import Vue from 'vue';
import App from './App.vue';
import '../locale';
import { useScmComponent } from '@/vue-component';

Vue.use( useScmComponent() );
new Vue( {
  el: '#app',
  render: h => h( App )
} );