
<template>
	<ScmTabs :list="list" />
</template>

<script>

import ScmTabs from '@/components/common/Tbas'

export default {
  data:() => ({
    list:[
      {
        label: '测试1.0',
        disabled: true,
        path: ''
      },
      {
        label: '测试1.1',
        path: '/test1'
      },
    ]
  }),
  components:{
    ScmTabs
  }
}
</script>

<style>

</style>