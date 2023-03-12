<template>
  <div>
    <hw-card title="Normal Tree">
      <hw-one-level-tree :data="data[1]" textKey="name" label-key="name"></hw-one-level-tree>
    </hw-card>
    <hw-card title="lazyLoad Tree">
      <hw-one-level-tree
        textKey="name"
        label-key="name"
        lazy
        :lazy-loader="lazyLoader"
        filterable
        filterOutside
        :filterText="searchText2"
        @select="onTree2ItemSelected"
      ></hw-one-level-tree>
      <div class="left-area">
        <input type="text" v-model="search2" @input="search2input" />
      </div>
    </hw-card>
  </div>
</template>

<script>
import OneLevelTree from '@components/data/oneLevelTree/OneLevelTree.vue'
import Card from '@components/layout/card/Card.vue'
import { debounce } from 'lodash'

const data = {
  1: [
    {
      name: 'level-2-1',
      id: 21,
      key: '2-1',
      children: [
        { name: 'level-2-2-1', id: 221, key: '2-2-1' },
        {
          name: 'level-2-2-2',
          id: 222,
          key: '2-2-2',
          children: [
            { name: 'level-1-3-1', id: 231, key: '2-3-1' },
            { name: 'level-1-3-2', id: 232, key: '2-3-2' }
          ]
        }
      ]
    },
    { name: 'level-2-2', id: 22, key: '2-2-2', children: [] },
    { name: 'level-2-3', id: 23, key: '2-2-3', children: [] }
  ],

  2: [
    {
      name: 'level-1-1',
      id: 11,
      key: '1-1',
      data: [{ content: 'active' }],
      children: [
        {
          name: 'level-1-1-1',
          id: 111,
          key: '1-1-1',
          data: [{ content: 'deactive' }, { content: 'activity' }]
        },
        {
          name: 'level-1-1-2',
          id: 112,
          key: '1-1-2',
          data: [{ content: 'moutain' }, { content: 'revier' }],
          children: [
            {
              name: 'level-1-1-2-1',
              id: 1121,
              key: '1-1-2-1',
              data: [{ content: 'heli' }, { content: 'train' }]
            },
            {
              name: 'level-1-1-2-2',
              id: 1122,
              key: '1-1-2-2',
              data: [{ content: 'actor' }, { content: 'act' }]
            },
            {
              name: 'level-1-3-3',
              id: 133,
              key: '1-3-3',
              data: [{ content: 'game' }, { content: 'code' }]
            }
          ]
        }
      ]
    },
    {
      name: 'level-1-2',
      id: 12,
      key: '1-2',
      children: [],
      data: [{ content: 'name' }, { content: 'acc' }]
    }
  ]
}

export default {
  name: 'hw-one-level-tree-demo',
  components: {
    'hw-card': Card,
    'hw-one-level-tree': OneLevelTree
  },
  data() {
    return {
      data: data,
      search2: '',
      searchText2: ''
    }
  },
  created() {
    this.search2input = debounce(() => {
      this.searchText2 = this.search2
    }, 500)
  },
  methods: {
    onTree2ItemSelected(data) {
      console.log(data)
    },
    lazyLoader(data, func, filterText) {
      if (filterText) {
        let result = []
        this.filterTree(JSON.parse(JSON.stringify(this.data[2])), filterText, null, result)
        func(result, filterText)
      } else {
        if (!data) {
          func(this.data[2])
        } else {
          func(data.children)
        }
      }
    },
    filterTree(arr, searchText, trace, result) {
      arr.forEach((item) => {
        // 如果trace为false, 那此项目是根节点, 为了保证每个根节点下的trace唯一, 再此初始化trace
        let tempTrace = trace ? [...trace] : []

        // 筛选出此项目中匹配的内容
        let temp = item.data.filter((i) => {
          return i.content && i.content.indexOf(searchText) >= 0
        })

        // 如果此项目的内容中有匹配的项目, 需要特殊处理
        if (temp && temp.length) {
          // 此项目的data只存放匹配的项目
          item.data = temp
          // 将此项目添加到结果集中
          result.push(item)
          // 在此项目中保存trace
          item.trace = [...tempTrace]
        }
        // 不管有没有匹配项目, 都要记录trace
        tempTrace.push(item)

        // 递归
        if (item.children && item.children.length) {
          this.filterTree(item.children, searchText, tempTrace, result)
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
</style>