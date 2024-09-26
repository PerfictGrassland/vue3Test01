import "./assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import i18nPlugin from './plugins/i18n.js';
const app = createApp(App);

app.use(i18nPlugin, {
  greetings: {
     hello: 'Bonjour!',
     goodbye: 'Au revoir!',
     aa: {
      hello: 'Bonjour!',
      goodbye: 'Au revoir!',
     }
  }
})
// 全局属性
app.config.globalProperties.$myGlobalProp = "This is a global property";
app.config.globalProperties.$myGlobalFunc = () => {
  console.log("This is a global function");
};
app.config.globalProperties.$myGlobalObj = {
  name: "John Doe",
  age: 30,
};

app.provide('app', app)
app.provide('myGlobalProp22', 'This is a global property')
app.directive('color', (el, binding) => {
  // 这会在 `mounted` 和 `updated` 时都调用
  el.style.color = binding.value
})
app.directive('demo', (el, binding) => {
  // console.log(binding.value.color) // => "white"
  // console.log(binding.value.text) // => "hello!"
  el.style.color = binding.value.color
  el.innerText = binding.value.text;
})
app.use(createPinia());
app.use(router);

console.log('%c [ 测试删除记录 ]: ', 'color: #bf2c9f; background: pink; font-size: 13px;', '测试删除记录')

app.mount("#app");
