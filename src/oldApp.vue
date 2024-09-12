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
  <header>
    <input v-focus:foo.bar.csj.wzy="baz" />
    <div v-color="color">55</div>
    <div v-demo="{ color: 'red', text: 'hello!' }">777</div>
    <h2>插件</h2>
    <h1>{{ $translate('greetings.aa.hello') }}</h1>
    <h1>{{ $translate('greetings.goodbye') }}</h1>
    <div>
      data.value, error.value: {{data}}, {{ error }}
    </div>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld class="large" ref="childRef" msg="You did it!" msg2="You did it!" @testFn="testFn($event)" v-model="modelValue" v-model:name="name" v-model:address="address">
        <!-- <template #header>
          <h1>Here might be a page title</h1>
        </template>

        <template #default>
          <p>A paragraph for the main content.</p>
          <p>And another one.</p>
        </template>

        <template #footer>
          <p>Here's some contact info</p>
        </template> -->

        <!-- <template v-slot:header="slotProps">
          <h1>Here might be a page title</h1>
          {{ slotProps?.text }} {{ slotProps?.count }}
        </template>

        <template v-slot:default="slotProps">
          <p>A paragraph for the main content.</p>
          <p>And another one.</p>
          {{ slotProps?.text }} {{ slotProps?.count }}
        </template>

        <template v-slot:footer="slotProps">
          <p>Here's some contact info</p>
          {{ slotProps?.text }} {{ slotProps?.count }}
        </template> -->
        
        <template v-slot:[dynamicSlotName]="slotProps">
            动态插槽内容
            {{ slotProps?.text }} {{ slotProps?.count }}
        </template>
      </HelloWorld> 
      <!-- <ChildComponent ref="childRef" /> -->
      <button @click="handleClick">Increment</button>
      <!-- <HelloWorld msg="You did it!" msg2="You did it!" @testFn="testFn($event)" :modelValue="modelValue" @update:modelValue="modelValue = $event"/> -->
      modelValue: {{ modelValue }}
      name: {{ name }}
      address: {{ address }}
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
        <div>Mouse position is at: {{ x }}, {{ y }}</div>
      </nav>
    </div>
  </header>

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
