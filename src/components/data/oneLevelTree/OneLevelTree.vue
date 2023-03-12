<template>
  <ul class="one-level-tree-base">
    <tree-item
      v-for="(item, index) in parentLevel"
      :key="item[uniqueKey] || `parent-one-level-tree-item-${index}`"
      :data="item"
      :index="index"
      :labelKey="labelKey"
      :selectedItem="selectedItem"
      type="parent"
      @select="onParentSelected"
    ></tree-item>
    <tree-item
      v-for="(item, index) in currentLevel"
      :key="item[uniqueKey] || `child-one-level-tree-item-${index}`"
      :data="item"
      :index="index"
      :labelKey="labelKey"
      :selectedItem="selectedItem"
      :type="item.type ? item.type : 'normal'"
      @select="onItemSelected"
    ></tree-item>
  </ul>
</template>

<script>
import TreeItem from './OneLevelTreeItem.vue'

function generateRoot(labelKey) {
  return {
    [labelKey]: 'root',
    key: '0',
    root: true
  }
}

export default {
  name: 'one-level-tree',
  components: {
    TreeItem
  },
  props: {
    data: {
      type: Array,
      default: () => []
    },
    labelKey: {
      type: String,
      default: 'label'
    },
    uniqueKey: {
      type: String,
      default: 'key'
    },
    lazy: {
      type: Boolean,
      default: false
    },
    lazyLoader: {
      /** 参数分别为 上级节点，数据加载器函数，筛选文本 */
      type: Function,
      default: null
    },
    /** 可筛选 */
    filterable: {
      type: Boolean,
      default: false
    },
    /** 由外部提供筛选字符串 */
    filterOutside: {
      type: Boolean,
      default: false
    },
    /** 外部筛选字符串, 外部筛选时需要注意为筛选后的结果创建trace，用于树形组件还原其父级结构 */
    filterText: {
      type: String,
      default: ''
    },
    /** 用于筛选后的节点，根据此属性还原该节点及之前的树形结构 */
    filterTraceKey: {
      type: String,
      default: 'trace'
    }
  },
  data() {
    return {
      parentLevel: [],
      currentLevel: [],
      selectedItem: null,
      selectedLevel: 0
    }
  },
  emits: ['select'],
  mounted() {
    this.currentLevel = this.data
    if (this.lazy) {
      if (typeof this.lazyLoader !== 'function') {
        console.error('lazy mode must set lazyLoader')
      } else {
        this.lazyLoader(null, this.dataLoader)
      }
    }

    // 备份用
    this.parentLevelBackup = null
    this.currentLevelBackup = null
  },
  watch: {
    filterText(newValue) {
      if (this.filterable && this.filterOutside) {
        this.filter(newValue)
      }
    }
  },
  methods: {
    filter() {
      if (this.lazy) {
        this.lazyLoader(
          this.selectedItem && this.selectedItem.root ? null : this.data,
          this.dataLoader,
          this.filterText
        )
      } else {
        // 需要自己递归
      }
    },
    dataLoader(childNodes, filterText) {
      if (filterText) {
        // 如果两个备份有一个为空，才备份
        if (!this.parentLevelBackup || !this.currentLevelBackup) {
          this.parentLevelBackup = this.parentLevel
          this.currentLevelBackup = this.currentLevel
        }
        // 筛选文本不为空, 则备份并展现筛选结果
        this.parentLevel = []
        this.currentLevel =
          childNodes && childNodes.length
            ? childNodes.map((item) => ({
                ...item,
                type: 'filted'
              }))
            : []
      } else {
        // 如果筛选字符串为空，则判断有没有备份。有备份则还原。
        if (this.parentLevelBackup || this.currentLevelBackup) {
          // 筛选文本清空后，如果有选中筛选后的内容，需要还原筛选后选中项目的树形
          // 有选中项且选中项有trace，才回复选中项的同级及父级结构
          if (this.selectedItem && this.selectedItem[this.filterTraceKey]) {
            // 筛选后选中项目的父级就是根节点+trace
            this.parentLevel = [
              generateRoot(this.labelKey),
              ...this.selectedItem[this.filterTraceKey]
            ]

            // 筛选后选中项目的当前级就是trace最后一项(即父节点)的children
            this.currentLevel =
              this.selectedItem[this.filterTraceKey][
                this.selectedItem[this.filterTraceKey].length - 1
              ].children
          } else {
            // 筛选文本为空字符串，则还原
            this.parentLevel = this.parentLevelBackup
            this.parentLevelBackup = null
            this.currentLevel = this.currentLevelBackup
            this.currentLevelBackup = null
          }
        } else {
          // 没有筛选的情况，直接使用外面的数据
          this.currentLevel = childNodes && childNodes.length ? [...childNodes] : []
        }
      }
    },
    onParentSelected(data, index) {
      this.$emit('select', data)
      this.selectedItem = { ...data }
      // splice +1 是因为要算上root
      data.root ? (this.parentLevel = []) : this.parentLevel.splice(index + 1)

      if (this.lazy) {
        if (data.root) {
          this.lazyLoader(null, this.dataLoader)
        } else {
          this.lazyLoader(data, this.dataLoader)
        }
      } else {
        if (data.root) {
          this.currentLevel = [...this.data]
        } else {
          this.dataLoader(data.children)
        }
      }
    },
    onItemSelected(data) {
      this.$emit('select', data)
      this.selectedItem = { ...data }

      // 展示筛选值的情况下不能进入深层内容
      if (this.filterText) return

      if (this.parentLevel.length === 0) {
        this.parentLevel.push(generateRoot(this.labelKey))
      }
      this.parentLevel.push(data)

      if (this.lazy) {
        this.lazyLoader(data, this.dataLoader)
      } else {
        this.dataLoader(data.children)
      }
    }
  }
}
</script>

<style>
</style>