<template>
  <Breadcrumb v-model:currentIndex="currentBreadcrumb" :data="defaultBreadcrumbs"> </Breadcrumb>
  <div>
    <input type="button" value="增加面包屑" @click="addBreadcrumb" />
  </div>
</template>

<script setup>
import Breadcrumb from '@components/navigation/breadcrumb/Breadcrumb.vue'
import { reactive, ref, watch } from 'vue'

let currentBreadcrumb = ref(0)
let defaultBreadcrumbs = reactive([{ label: '全部文件', id: '-1' }])

watch(currentBreadcrumb, function (newValue) {
  console.log(defaultBreadcrumbs, newValue)
  const current = defaultBreadcrumbs[newValue]
})

function addBreadcrumb() {
  defaultBreadcrumbs.push({
    label: '文件夹' + currentBreadcrumb.value,
    id: currentBreadcrumb.value + ''
  })
}
</script>

<style lang="less" scoped>
</style>