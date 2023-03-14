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
const formComponents = {
  name: "form",
  path: "/form",
  children: [
    {
      name: "CheckboxDemo",
      group: "form",
      path: "/form/HWCheckboxDemo",
      component: () => import("@views/demos/form/checkbox/CheckboxDemo.vue")
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
    {
      name: "DrawerDemo",
      path: "/layout/DrawerDemo",
      component: () => import("@views/demos/layout/drawer/DrawerDemo.vue")
    },
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

/** 集成组件 */
const integratedComponents = {
  name: "integrated",
  path: "/integrated",
  children: [
    {
      name: "Questionnaire",
      path: "/integrated/QuestionnaireDemo",
      group: "integrated",
      component: () => import("@views/demos/integrated/questionnaire/QuestionnaireDemo.vue")
    },
    // {
    //   name: "PropertySetter",
    //   path: "/integrated/HWPropertySetterDemo",
    //   group: "integrated",
    //   component: () => import("../views/integrated/PropertySetter/HWPropertySetter")
    // }
  ]
}
export const componentsRouteConfig: Array<ComponentDemoConfigType> = [
  dataComponents,
  formComponents,
  layoutComponents,
  navigationComponents,
  // integratedComponents,
]
