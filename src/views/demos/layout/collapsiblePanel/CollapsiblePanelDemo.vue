<template>
  <Card title="折叠面板">
    <NormalCollapsiblePanel />
  </Card>
  <Card title="左侧展开按钮">
    <LeftButtonPanel />
  </Card>
  <Card title="外部控制折叠面板展开">
    <OutSideControl />
  </Card>
</template>

<script>
import Card from '@/components/layout/card/Card.vue'
import NormalCollapsiblePanel from './NormalCollapsiblePanel.vue'
import LeftButtonPanel from './LeftButtonPanel.vue'
import OutSideControl from './OutSideControl.vue'
export default {
  name: 'hw-Collapsible-panel-demo',
  components: { Card, NormalCollapsiblePanel, LeftButtonPanel, OutSideControl }
}
</script>

<style lang="less" scoped></style>