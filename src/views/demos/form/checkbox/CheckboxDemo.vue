<template>
  <div>
    <hw-card title="Multiple check checkbox">
      <hw-checkbox
        v-for="item in checkboxTestData"
        :true-value="item"
        :key="item"
        v-model="multipleCheck"
        >{{ item }}</hw-checkbox
      >
    </hw-card>
    <hw-card title="Single check checkbox">
      <hw-checkbox
        v-for="item in checkboxTestData"
        :true-value="item"
        :false-value="''"
        :key="item"
        v-model="singleCheck"
        >{{ item }}</hw-checkbox
      >
    </hw-card>
  </div>
</template>

<script>
import Checkbox from '@components/form/checkbox/Checkbox.vue'
import Card from '@components/layout/card/Card.vue'
export default {
  name: 'hw-checkbox-demo',
  components: {
    'hw-card': Card,
    'hw-checkbox': Checkbox
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