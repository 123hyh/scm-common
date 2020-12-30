<!--
 * @Author: your name
 * @Date: 2020-12-25 23:14:15
 * @LastEditTime: 2020-12-30 18:01:40
 * @LastEditors: huangyuhui
 * @Description: In User Settings Edit
 * @FilePath: \scm_frontend_common\src\example\Modal.vue
-->
<template>
  <div>
    <ElTbas/>
    <ScmModal
      :visible="visible"
      :width="800"
      :height="600"
      @close="closeModal"
      >
      <template #title>
        合同审批
      </template>
      <div class="content-wrap-a">
        <CombinationTable/>
      </div>
      <template #footer>
        <ElButton @click.stop="visible = false">
          取消
        </ElButton>
        <ElButton
          type="primary"
          @click.stop="visible = false"
          >
          确认
        </ElButton>
      </template>
    </ScmModal>
    <button @click.stop="hanlderCick">
      测试
    </button>
  </div>
</template>

<script>
import ScmModal from '@/vue-component/ModalWindow/ScmModal';
import CombinationTable from './CombinationTable.vue';
import { Button } from 'element-ui';
import Tbas from '@/vue-component/Tbas';
export default {
  components: {
    ElTbas:Tbas,
    ScmModal,
    ElButton: Button,
    CombinationTable
  },
  data() {
    return {
      visible: false
    };
  },
  methods: {
    hanlderCick() {
      this.visible = !this.visible;
    },
    closeModal() {
      this.visible = false;
    }
 
  }
};
</script>

<style scoped lang='scss'>
::v-deep .content-wrap-a {
  height: 150vh;
}
</style>