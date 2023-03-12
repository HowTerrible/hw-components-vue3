<template>
  <div>
    <hw-card title="Drawer">
      <hw-button @click="open = true">打开抽屉</hw-button>
      <hw-drawer title="Delete Button" v-model="open" direction="bottom-right"> safwaeg</hw-drawer>
    </hw-card>
  </div>
</template>

<script>
import Drawer from '@components/layout/drawer/Drawer.vue'
import Button from '@components/general/button.vue'
import Card from '@components/layout/card/Card.vue'
export default {
  name: 'hw-drawer-demo',
  components: {
    'hw-drawer': Drawer,
    'hw-button': Button,
    'hw-card': Card
  },
  data() {
    return {
      open: false
    }
  }
}
</script>

<style lang="less" scoped></style>