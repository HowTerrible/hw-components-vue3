<template>
  <li
    class="one-level-tree-item"
    :class="[
      {
        selected: data[uniqueKey] === (selectedItem && selectedItem[uniqueKey])
      },
      type
    ]"
    @click="onItemClicked"
  >
    <span class="tree-item-arrow tree-item-left-arrow">&lt;</span>
    <span class="tree-item-content">{{ data[labelKey] }}</span>
    <span class="tree-item-arrow tree-item-right-arrow">&gt;</span>
  </li>
</template>

<script>
export default {
  name: 'one-level-tree-item',
  props: {
    data: {},
    selectedItem: {},
    index: {
      type: Number,
      default: 0
    },
    type: {
      type: String,
      default: 'normal',
      validator: (item) => ['normal', 'parent', 'filted'].indexOf(item) >= 0
    },
    labelKey: {
      type: String,
      default: 'label'
    },
    uniqueKey: {
      type: String,
      default: 'key'
    }
  },
  emits: ['select'],
  methods: {
    onItemClicked() {
      this.$emit('select', this.data, this.index)
    }
  }
}
</script>

<style scoped>
.one-level-tree-item {
  position: relative;
  list-style: none;
  padding: 0 40px;
  cursor: pointer;
}
.one-level-tree-item:hover {
  opacity: 0.8;
}

.one-level-tree-item > * {
  display: inline-block;
}
.one-level-tree-item.selected {
  background-color: aliceblue;
}
.one-level-tree-item.filted > .tree-item-arrow {
  display: none;
}

.one-level-tree-item > .tree-item-content {
  display: inline-block;
  width: 100%;
}

.one-level-tree-item.selected > .tree-item-arrow {
  display: none;
}
.one-level-tree-item > .tree-item-arrow {
  display: inline-block;
  text-align: center;
  width: 40px;
  position: absolute;
}
.one-level-tree-item > .tree-item-left-arrow {
  left: 0;
}
.one-level-tree-item > .tree-item-right-arrow {
  right: 0;
}
.one-level-tree-item.parent > .tree-item-right-arrow {
  display: none;
}
.one-level-tree-item.normal > .tree-item-left-arrow {
  display: none;
}
</style>