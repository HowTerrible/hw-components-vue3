import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import './styles/main.css'

const app = createApp(App)

app.config.globalProperties.$dispatch = function (eventName: string, value: any) {
  let target = this;
  while (target) {
    target.$emit(eventName, value);
    target = target.$parent
  }
}
// app.config.globalProperties.$broadcast = function (eventName: string, value: any) {
//   const broadcast = (children) => {
//     children.forEach(child => {
//       child.$emit(eventName, value);
//       if (child.$children) {
//         broadcast(child.$children);
//       }
//     });
//   }
//   broadcast(this.$children);
// }

app.use(router)

app.mount('#app')
