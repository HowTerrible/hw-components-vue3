export type ComponentDemoConfigType = {
  name: string,
  path: string,
  children: Array<ComponentDemoType>
}

export type ComponentDemoType = {
  name: string,
  path: string,
  component: () => Promise<any>
}