<template>
  <ul class="hw-breadcrumb">
    <hw-breadcrumb-item
      v-for="(item, index) in data"
      :key="index"
      :data="item"
      :index="index"
      :current="localIndex"
      :labelKey="labelKey"
      @click="onCurrentChanged"
    ></hw-breadcrumb-item>
  </ul>
</template>

<script>
import BreadcrumbItem from './BreadcrumbItem.vue'
export default {
  name: 'hw-breadcrumb',
  components: {
    'hw-breadcrumb-item': BreadcrumbItem
  },
  props: {
    currentIndex: {
      type: Number,
      default: 0
    },
    data: {
      type: Array,
      default: () => []
    },
    /** 类型: button: 只有点击功能,切换需要自己处理. router: 使用路由
     * 暂时未做路由的逻辑
     */
    type: {
      type: String,
      default: 'button',
      validator: (item) => ['button', 'router'].indexOf(item) >= 0
    },
    /** 改变模式: manual:手动改变index才会切换, auto: 只要总长度变化就会改变
     */
    changeType: {
      type: String,
      default: 'auto',
      validator: (item) => ['manual', 'auto'].indexOf(item) >= 0
    },
    labelKey: {
      type: String,
      default: 'label'
    },
    beforeChange: {
      type: Function,
      default: null
    }
  },
  data() {
    return {
      localIndex: 0
    }
  },
  emits: ['update:currentIndex', 'change'],
  computed: {
    breadcrumbLength() {
      return this.data.length
    }
  },
  watch: {
    breadcrumbLength(newVal) {
      if (this.changeType === 'auto') {
        this.localIndex = newVal - 1
      }
    },
    currentIndex: {
      immediate: true,
      handler: function (newVal) {
        this.localIndex = newVal
      }
    },
    localIndex(newVal) {
      this.$emit('update:currentIndex', newVal)
      if (newVal < this.data.length && newVal >= 0) {
        this.onCurrentChanged(this.data[newVal], newVal)
      }
    }
  },
  methods: {
    onCurrentChanged(data, index) {
      const brfore =
        this.beforeChange && typeof this.beforeChange === 'function'
          ? this.beforeChange(data, index)
          : true
      if (brfore) {
        this.data.splice(index + 1)
        this.$emit('change', { data, index })
      }
    }
  }
}
</script>

<style lang="less" scoped>
ul.hw-breadcrumb {
  width: 100%;
  flex: 1;
  list-style: none;
  display: flex;
  height: 70px;
  max-height: 70px;
  line-height: 70px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
