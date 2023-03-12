<template>
  <div>
    <hw-card title="Delete Button">
      <hw-panel></hw-panel>
      <hw-button></hw-button>
    </hw-card>
  </div>
</template>

<script>
import Card from '@components/layout/card/Card.vue'
import Panel from '@components/layout/panel/Panel.vue'
export default {
  name: 'hw-panel-demo',
  components: {
    'hw-panel': Panel,
    'hw-card': Card
  }
}
</script>

<style lang="less" scoped></style>