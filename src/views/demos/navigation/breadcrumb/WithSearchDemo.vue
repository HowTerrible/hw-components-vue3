<template>
  <div>搜索框 <input v-model="searchInput" @keyup.enter="onSearch" /></div>
  <Breadcrumb v-model:currentIndex="currentBreadcrumb" :data="defaultBreadcrumbs"> </Breadcrumb>
  <div>
    <input type="button" value="增加面包屑" @click="addBreadcrumb" />
  </div>
</template>

<script setup lang="ts">
import Card from '@components/layout/card/Card.vue'
import Breadcrumb from '@components/navigation/breadcrumb/Breadcrumb.vue'
import Input from '@components/form/input/Input.vue'
import { reactive, ref, watch } from 'vue'

let searchInput = ref('')
let currentBreadcrumb = ref(0)
let defaultBreadcrumbs = reactive([{ label: '全部文件', id: '-1' }])

watch(currentBreadcrumb, function (newValue) {
  const current = defaultBreadcrumbs[newValue]
})
function aaa() {
  console.log(12312414)
}

function addBreadcrumb() {
  defaultBreadcrumbs.push({
    label: '文件夹' + currentBreadcrumb.value,
    id: currentBreadcrumb.value + ''
  })
}
function onSearch() {
  console.log(123)

  const searchBreadIndex = defaultBreadcrumbs.findIndex((item) => item.searchVal),
    searchBread = defaultBreadcrumbs[searchBreadIndex]
  if (searchBread) {
    if (searchBread.searchVal !== searchInput.value) {
      defaultBreadcrumbs.splice(searchBreadIndex + 1)
    }
    searchBread.label = `"${searchInput.value}"的搜索结果`
    searchBread.searchVal = searchInput.value
  } else {
    const current = defaultBreadcrumbs[currentBreadcrumb.value]
    defaultBreadcrumbs.push({
      label: `"${searchInput.value}"的搜索结果`,
      id: current.id,
      searchVal: searchInput.value
    })
  }
}
</script>

<style scoped>
</style>