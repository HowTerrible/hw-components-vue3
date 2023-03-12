<template>
  <div class="hw-tree-base">
    <ul class="hw-tree">
      <template v-for="item in data" :key="item[idKey]">
        <hw-tree-item
          @select="onTreeItemSelected"
          :data="item"
          :textKey="textKey"
          :idKey="idKey"
          :childrenKey="childrenKey"
          v-bind="$attrs"
        ></hw-tree-item>
      </template>
    </ul>
  </div>
</template>

<script>
import TreeItem from './TreeItem.vue'
export default {
  inheritAttrs: false,
  name: 'hw-tree',
  components: {
    'hw-tree-item': TreeItem
  },
  props: {
    data: {
      type: Array,
      default: () => []
    },
    idKey: {
      type: String,
      default: 'id'
    },
    textKey: {
      type: String,
      default: 'text'
    },
    childrenKey: {
      type: String,
      default: 'children'
    },
    selectedItem: {},
    multiply: {
      type: Boolean,
      default: false
    }
  },
  model: {
    prop: 'selectedItem',
    event: 'item-select'
  },
  emits: ['item-select'],
  data() {
    return {
      localSelected: this.selectedItem
    }
  },
  watch: {
    selectedItem(newValue) {
      this.localSelected = newValue
    },
    localSelected(newValue) {
      this.$emit('item-select', newValue)
    }
  },
  methods: {
    onTreeItemSelected(item) {
      this.localSelected = item
    }
  }
}
</script>

<style lang="less" scoped></style>