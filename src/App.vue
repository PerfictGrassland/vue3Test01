<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import { useMouse } from './fn/mouse.js'
import { useFetch } from './fn/fetch.js'
const baz = ref({aa: 66})
const { x, y } = useMouse()
const { data, error } = useFetch('...')
// console.log('%c [ data, error ]-8', 'font-size:13px; background:pink; color:#bf2c9f;', data, error)

import { ref } from 'vue';
const modelValue = ref('');// 默认 prop 从 value 改为 modelValu
const name = ref('')
const address = ref('')
const dynamicSlotName = ref('default')
const color = ref('red');
function testFn(...args: any[]) {
  console.log('[ 11 ] >', 11, args)
}

const childRef = ref(null)

function handleClick() {
  // childRef?.value?.testFn3()
  console.log('[ childRef ] >', childRef, childRef?.value, (childRef?.value as any)?.testFn3, (childRef?.value as any)?.aa, (childRef?.value as any)?.bb,'----', HelloWorld.testFn3, HelloWorld.aa)
}

const vFocus = {
  mounted: (el:HTMLElement, binding: any, vnode: any, prevVnod: any) => {
    el.focus()
    // console.log('[ el, binding, vnode, prevVnod ] >', el, binding, vnode, prevVnod)
  }
}
</script>

<template>
  <RouterView />
</template>

<style scoped>
.large {
  background-color: red;
}
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
