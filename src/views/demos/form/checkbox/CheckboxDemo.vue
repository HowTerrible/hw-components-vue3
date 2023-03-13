<template>
  <div>
    <Card title="Multiple check checkbox">
      <Checkbox
        v-for="item in checkboxTestData"
        :true-value="item"
        :key="item"
        v-model="multipleCheck"
        >{{ item }}</Checkbox
      >
    </Card>
    <Card title="Single check checkbox">
      <Checkbox
        v-for="item in checkboxTestData"
        :true-value="item"
        :false-value="''"
        :key="item"
        v-model="singleCheck"
        >{{ item }}</Checkbox
      >
    </Card>
  </div>
</template>

<script>
import Checkbox from '@components/form/checkbox/Checkbox.vue'
import Card from '@components/layout/card/Card.vue'
export default {
  name: 'Checkbox-demo',
  components: {
    Card,
    Checkbox
  },
  data() {
    return {
      multipleCheck: [],
      singleCheck: ''
    }
  },
  created() {
    this.checkboxTestData = ['文本', '日期', '数字', '正则']
  }
}
</script>

<style lang="less" scoped></style>