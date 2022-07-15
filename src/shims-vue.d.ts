/* eslint-disable */
declare module '*.vue' {
  import type { DefineComponent, defineProps } from 'vue'
  const component: DefineComponent<{}, {}, any>
  const props: DefineProps
  export {component, props}
}
