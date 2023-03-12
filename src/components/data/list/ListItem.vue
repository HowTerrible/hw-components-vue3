<template>
  <li class="hw-list-item" @click.stop.prevent="onItemClicked">{{ text }}</li>
</template>

<script>
export default {
  name: ' hw-list-item',
  props: {
    data: {},
    index: {
      type: Number,
      defualt: 0
    },
    textKey: {
      type: String,
      default: 'text'
    }
  },
  emits: ['click'],
  computed: {
    text() {
      let result = ''
      if (/^(string|number)$/.test(typeof this.data)) {
        result = this.data
      } else {
        result = this.data[this.textKey]
      }
      return result
    }
  },
  methods: {
    onItemClicked() {
      this.$emit('click', this.data, this.index)
    }
  }
}
</script>

<style lang="less" scoped>
.hw-list-item {
  cursor: pointer;
  &:hover {
    opacity: 0.6;
    background-color: @backcolor-gray-light;
  }
}
</style>