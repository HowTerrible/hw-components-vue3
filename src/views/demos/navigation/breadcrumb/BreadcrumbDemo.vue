<template>
  <Card title="面包屑">
    <NormalDemo />
  </Card>
  <Card title="搜索框配合面包屑">
    <WithSearchDemoVue />
  </Card>
</template>

<script>
import Card from '@/components/layout/card/Card.vue'
import NormalDemo from './NormalDemo.vue'
import WithSearchDemoVue from './WithSearchDemo.vue'

export default {
  name: 'hw-breadcrumb-demo',
  components: {
    NormalDemo,
    WithSearchDemoVue,
    Card
  }
}
</script>

<style lang="less" scoped>
.breadcrumb-base {
  > * {
    margin: 20px;
  }
}
</style>
