import type { ComponentDemoConfigType } from "@/type/components/componentConfigType";

/** 数据 */
const dataComponents = {
  name: "data",
  path: "/data",
  children: [
    {
      name: "TreeDemo",
      path: "/data/TreeDemo",
      component: () => import("@views/demos/data/tree/TreeDemo.vue")
    },
    {
      name: "OneLevelTreeDemo",
      path: "/data/OneLevelTreeDemo",
      component: () => import("@views/demos/data/oneLevelTree/OneLevelTreeDemo.vue")
    },
  ]
}
/** 布局 */
const layoutComponents = {
  name: "layout",
  path: "/layout",
  children: [
    // {
    //   name: "PanelDemo",
    //   path: "/layout/PanelDemo",
    //   component: () => import("./layout/HWPanelDemo.vue")
    // },
    // {
    //   name: "CollapsiblePanelDemo",
    //   path: "/layout/CollapsiblePanelDemo",
    //   component: () => import("./layout/HWCollapsiblePanelDemo.vue")
    // },
    {
      name: "CardDemo",
      path: "/layout/CardDemo",
      component: () => import("@views/demos/layout/card/CardDemo.vue")
    },
    // {
    //   name: "DrawerDemo",
    //   path: "/layout/DrawerDemo",
    //   component: () => import("./layout/HWDrawerDemo.vue")
    // },
    // {
    //   name: "DraggableContainerDemo",
    //   path: "/layout/DraggableContainerDemo",
    //   component: () => import("./layout/HWDraggableContainerDemo.vue")
    // },
  ]
}
const navigationComponents = {
  name: "navigation",
  path: "/navigation",
  children: [
    {
      name: "BreadcrumbDemo",
      path: "/navigation/BreadcrumbDemo",
      component: () => import("@views/demos/navigation/breadcrumb/BreadcrumbDemo.vue")
    },
  ]
}
export const componentsRouteConfig: Array<ComponentDemoConfigType> = [
  dataComponents,
  layoutComponents,
  navigationComponents,
]
