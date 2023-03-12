<template>
  <ul class="hw-list">
    <template><slot name="header"></slot></template>
    <template v-if="type === 'normal'">
      <template v-for="(item, index) in data" :key="item.key || index">
        <list-item v-bind="$attrs" @click="onItemClicked" :data="item" :index="index"></list-item>
      </template>
    </template>
    <template v-else-if="type === 'group'">
      <template v-for="(group, index) in data" :key="group.key || `list-group-${index}`">
        <ul class="list-group">
          <div class="list-group-title">{{ group.name }}</div>
          <template
            v-for="(item, index) in group[groupKey]"
            :key="item.key || `list-item-${index}`"
          >
            <list-item
              v-bind="$attrs"
              @click="onItemClicked"
              :data="item"
              :index="index"
            ></list-item>
          </template>
        </ul>
      </template>
    </template>
    <template> <slot name="footer"></slot></template>
  </ul>
</template>

<script>
import ListItem from './ListItem.vue'
export default {
  name: 'hw-list',
  components: {
    'list-item': ListItem
  },
  props: {
    type: {
      type: String,
      default: 'normal',
      validator: (item) => ['normal', 'group'].indexOf(item) >= 0
    },
    groupKey: {
      type: String,
      default: 'children'
    },
    data: {
      type: Array,
      default: () => []
    }
  },
  emits: ['item-click'],
  methods: {
    onItemClicked: function (data, index) {
      this.$emit('item-click', data, index)
    }
  }
}
</script>

<style lang="less" scoped>
.hw-list {
  list-style: none;

  .list-group {
    list-style: none;
    cursor: default;

    .list-group-title {
    }

    li {
      padding-left: 10px;
    }
  }
}
</style>
