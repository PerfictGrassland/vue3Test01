<script setup lang="ts">
import { inject, getCurrentScope, getCurrentInstance, defineAsyncComponent, ref, onBeforeMount, onMounted, onBeforeUnmount, onUnmounted } from 'vue';
const AsyncComponent = defineAsyncComponent(() => import('./AsyncComponent.vue'))

// const loading = ref(true)
// const AsyncComponent: any = defineAsyncComponent(() => {
//   return import('./AsyncComponent.vue').then(() => {
//     setTimeout(()=>{
//       loading.value = false
//     }, 2000)
//     return AsyncComponent
//   })
// })


const instance = getCurrentInstance()!; // Add '!' to assert that it's not null
// const {attrs, slots, emit, exposed} = instance;
// console.log('%c [ attrs, slots, emit, exposed ]-5', 'font-size:13px; background:pink; color:#bf2c9f;', attrs, slots, emit, exposed)
const csj = 999;
const app: any = inject('app')
// console.log('app', app?.config?.globalProperties)
// 通过 inject 获取 app 实例
const myGlobalProp22: any = inject('myGlobalProp22')

function test1() {
  console.log('[ 1 ] >', 1)
}
function test2() {
  console.log('[ 2 ] >', 2)
}
function test3() {
  console.log('[ 3 ] >', 3)
}

// 现在可以访问 app.config.globalProperties
// .globalProperties.$myGlobalProp
// console.log(myGlobalProp22, instance, instance?.appContext)


onBeforeMount(() => {
  console.log('[about - onBeforeMount ] >', )
})
onMounted(()=>{
  console.log('[about - onMounted ] >', ) 
})
onBeforeUnmount(() => {
  console.log('[about - onBeforeUnmount ] >', )
})
onUnmounted(() => {
  console.log('[about - onUnmounted ] >', )
})

</script>

<template>
  <div>
    <h1>This is an about page</h1>
    <b>provide属性：{{ myGlobalProp22 }}, {{ csj }}</b>
    <div class="box clearfix">
      <div class="item" @click="test1(), test2(), test3()">66</div>
      <!-- <AsyncComponent></AsyncComponent> -->
      <Suspense>
        <template #default>
          <AsyncComponent />
        </template>
        <template #fallback>
          <div>Loading...</div>
        </template>
      </Suspense>


    </div>
    <h2>setup组件</h2>
    <h2>jsx组件</h2>
    <h2>自定义组件</h2>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}

.box {
  /* overflow: hidden; */
  /* display: table-caption; */
  /* display 属性为 inline-block、table-cell 或 table-caption */
  /* position: absolute; */
  /* position: fixed; */
  /* float: left; */
  width: 100px;
  /* height: 100px; */
  /* display: flex;
  align-items: center;
  justify-content: center; */
  background-color: red;
}

.clearfix::after {
  content: '';
  /* display: block; */
  display: table;
  clear: both;
}

/* .box::after {
  content: "";
  display: table;
  clear: both;
} */
.item {
  float: left;
  background-color: blue;
  width: 50px;
  height: 50px;
}
</style>
