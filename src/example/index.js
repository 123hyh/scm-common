/*
 * @Author: your name
 * @Date: 2020-12-05 12:44:16
 * @LastEditTime: 2020-12-05 17:10:41
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \scm_frontend_common\example\index.js
 */
import Vue from 'vue';
import App from './App.vue';

import useScmComponent from '@/vue-component';

Vue.use( useScmComponent );
new Vue( {
  el: '#app',
  render: h => h( App )
} );