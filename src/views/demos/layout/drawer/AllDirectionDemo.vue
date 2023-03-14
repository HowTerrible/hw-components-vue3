<template>
  <Card title="Drawer">
    <template v-for="item in allDirections" :key="item">
      <input class="direction-button" type="button" :value="item" @click="onOpenClick(item)" />
    </template>
    <Drawer :title="`${direction} Drawer`" v-model:open="open" :direction="direction">
      safwaeg</Drawer
    >
  </Card>
</template>

<script>
import Drawer from '@components/layout/drawer/Drawer.vue'
import Card from '@components/layout/card/Card.vue'

const allDirections = [
  'top-left',
  'top',
  'top-right',
  'right-top',
  'right',
  'right-bottom',
  'bottom-right',
  'bottom',
  'bottom-left',
  'left-bottom',
  'left',
  'left-top'
]
export default {
  components: {
    Drawer,
    Card
  },
  created() {
    this.allDirections = allDirections
  },
  data() {
    return {
      open: false,
      direction: 'left'
    }
  },
  methods: {
    onOpenClick(direction) {
      if (this.open) {
        this.open = false
        if (this.direction !== direction) {
          setTimeout(() => {
            this.direction = direction
            this.open = true
          }, 500)
        }
      } else {
        this.direction = direction
        this.open = true
      }
    }
  }
}
</script>

<style lang="less">
.direction-button {
  margin: 5px 10px;
}
</style>