<script setup lang="ts">
import HwList from '@components/data/list/List.vue'
import Breadcrumb from '@components/navigation/breadcrumb/Breadcrumb.vue'
import { componentsRouteConfig } from './demos/demoConfig'
import { RouterLink, RouterView, useRouter, useRoute } from 'vue-router'
import { reactive, onMounted } from 'vue'
import path from 'path'

const breadcrumb = reactive([{ name: 'home', path: null }])
const router = useRouter(),
  route = useRoute()

onMounted(() => {
  if (route.path !== '/') {
    const paths = route.path.split('/')
    const config = componentsRouteConfig.find((config) => config.name === paths[1])
    if (config) {
      const target = config.children.find((path) => path.name === paths[2])
      if (target) breadcrumb.push(target)
    }
  }
})

function beforeBreadcrumbChange(data) {
  return data.path
}

function onListItemClicked(data) {
  if (breadcrumb[1]) {
    breadcrumb[1] = data
  } else {
    breadcrumb.push(data)
  }
  router.push(data.path)
}
</script>

<template>
  <div class="home-main">
    <div class="home-header">
      <h1>HW Components Vue3</h1>
      <img src="../assets/logo.svg" alt="" />
    </div>
    <div class="home-content">
      <div class="component-menu">
        <Breadcrumb
          class="component-breadcrumb"
          :data="breadcrumb"
          :beforeChange="beforeBreadcrumbChange"
          label-key="name"
        />
        <hw-list
          class="component-tree"
          text-key="name"
          :data="componentsRouteConfig"
          type="group"
          @itemClick="onListItemClicked"
        ></hw-list>
      </div>
      <div class="component-content">
        <RouterView />
      </div>
    </div>
    <div class="home-footer"></div>
  </div>
</template>

<style lang="less">
.home-main {
  height: 100%;
  display: flex;
  flex-direction: column;

  .home-header {
    height: 100px;
    width: 100vw;
    overflow: hidden;
    position: absolute;
    left: 0;
    top: 0;
    border-bottom: 1px solid @bordercolor-gray-light;
    box-shadow: @box-shadow;
  }

  .home-content {
    flex: 1;
    padding-top: 100px;
    display: flex;
    .component-menu {
      width: 300px;
      margin-right: 10px;
      border-right: 1px solid @bordercolor-gray-light;
      .component-breadcrumb {
      }
      .component-tree {
        padding-left: 40px;
      }
    }
    .component-content {
      flex: 1;
      padding-top: 20px;
    }
  }

  .home-footer {
    height: 40px;
    overflow: hidden;
    box-shadow: @box-shadow-opposite;
  }
}
</style>
