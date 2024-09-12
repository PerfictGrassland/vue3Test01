<script setup lang="ts">
import { getCurrentInstance, inject, reactive, ref, toRef, toRefs, isRef, computed, defineEmits, useSlots, useAttrs, nextTick, onBeforeMount, onMounted, onBeforeUnmount, onUnmounted } from 'vue';
// defineEmits(['update:name', 'update:address'])
const instance = getCurrentInstance()!; // Add '!' to assert that it's not null 
// console.log('%c [ instance ]-58', 'font-size:13px; background:pink; color:#bf2c9f;', instance)
const slots = useSlots();
const aa = useAttrs();
// console.log('%c [ slots ]-5', 'font-size:13px; background:pink; color:#bf2c9f;', slots, aa)
const pa1 = ref(99);
const pa2 = reactive({
  aa: 55
});
// const props = defineProps<{
//   // name: String,
//   // address: String,
//   msg: string,
//   test11: number,
//   // modelValue: String, // 默认 prop 从 value 改为 modelValue
// }>()
// console.log('[ props ] >', props)

interface Props {
  msg: string
  count?: number
}

const props = withDefaults(defineProps<Props>(), {
  count: 0
})

const handleClick = () => {
  console.log('哈哈哈：', props, props.msg, props.count, instance, instance.props, instance.proxy)
}

const testFn22 = function(pr: any) {
  console.log('[ pr ] >', pr)
}

// handleClick();

const firstName = ref('John')
const lastName = ref('Doe')

const modelValue = defineModel({ default: 77 })
const name = defineModel('name')
const address = defineModel('address')
// const model = defineModel()
// const name = defineModel()
// const address = defineModel()

function update() {
  (modelValue as any).value++
}

const fullName = computed({
  // getter
  get() {
    return firstName.value + ' ' + lastName.value
  },
  // setter
  set(newValue) {
    // 注意：我们这里使用的是解构赋值语法
    [firstName.value, lastName.value] = newValue.split(' ')
  }
})




// slots
// exposed props
const {attrs, emit, proxy} = instance;

function testFn() {
  emit('testFn', {aa: 44, bb: 44})
}

function testFn2($event: any) {
  // modelValue.value = ($event?.target as any)?.value;
  emit('update:modelValue', ($event?.target as any)?.value)
}


// exposed({
//   testFn3
// })



function testFn3($event: any) {
  name.value = ($event?.target as any)?.value;
}
function testFn4($event: any) {
  address.value = ($event?.target as any)?.value;
}

const rf0 = ref(null);
const rf1 = ref(29);
const rt1 = reactive({
  name: 'csj',
  age: rf1
})

const handleClick22 = () => {
  // 更新数据
  // ...
  rf1.value = 9999999;
  console.log('[ rf0 ] >', rf0.value)
  nextTick(() => {
    // 在 DOM 更新后执行的代码
    console.log('[ 在 DOM 更新后执行的代码 ] >', rf0.value)
  })
}
    
const items = ref<string[]>(['Item 1', 'Item 2', 'Item 3'])
const myList = ref<HTMLUListElement | null>(null)

const addItem = () => {
  items.value.push(`Item ${items.value.length + 1}`)
  items.value.push(`Item ${items.value.length + 1}`)
  items.value.push(`Item ${items.value.length + 1}`)
  console.log('nextTick调用前:', myList.value, myList.value?.children.length) // 输出新增项的数量
  nextTick(() => {
    // 在这里可以访问更新后的 DOM 元素
    console.log('在这里可以访问更新后的 DOM 元素:', myList.value, myList.value?.children.length) // 输出新增项的数量
  })
}
// pa1.value = 88888;
// console.log('[ isRef ] >', isRef(pa1), isRef(pa2), toRefs(pa2)?.aa.value, pa2.aa)
// console.log('%c [ attrs, slots, emit, exposed ]-5', 'font-size:13px; background:pink; color:#bf2c9f;', instance, attrs, slots, proxy, (proxy as any)?.['msg'], props, '0-----',  pa1, pa1.value, pa2)
// function testFn3($event: any) {
//   console.log('[ 子组件提供给外部访问的函数 ] >', $event)
// }
defineExpose({
  testFn3,
  aa: 55, 
  bb: 44
})

// onBeforeMount(() => {
//   console.log('[hello - onBeforeMount ] >', )
// })
// onMounted(()=>{
//   console.log('[hello - onMounted ] >', ) 
// })
// onBeforeUnmount(() => {
//   console.log('[hello - onBeforeUnmount ] >', )
// })
// onUnmounted(() => {
//   console.log('[hello - onUnmounted ] >', )
// })

</script>

<template>
  <div class="greetings">
    <h1 class="green" @click="testFn()">{{ msg }}</h1>
    <p ref="rf0">rf1: {{ rf1 }}; rt1.age: {{ rt1.age }}</p>
    <div @click="handleClick22()">handleClick22</div>
    <h3>
      You’ve successfully created a project with
      <a href="https://vitejs.dev/" target="_blank" rel="noopener">Vite</a> +
      <a href="https://vuejs.org/" target="_blank" rel="noopener">Vue 3</a>. What's next?
    </h3>
    <div>
    <!-- <input
      type="text"
      :value="modelValue"
      @input="$emit('update:modelValue', ($event?.target as any)?.value)"
    /> -->
    <input
      type="text"
      :value="modelValue"
      @input="testFn2($event)"
    />

    <input v-model="modelValue" />
    modelValue: {{ modelValue }}
  </div>
  <div class="form">
    
    <label for="name">姓名</label>
    <input id="name" type="text" :value="name" @input="$emit('update:name',($event.target as any).value)">
    
    <label for="address">地址</label>
    <input id="address" type="text" :value="address" @input="$emit('update:address', ($event.target as any).value)">


    <label for="name">姓名</label>
    <input id="name" type="text" v-model="name">
    
    <label for="address">地址</label>
    <input id="address" type="text" v-model="address">



    <div>(子组件)Parent bound v-model is: {{ modelValue }}</div>
  </div>
    <h4>插槽</h4>
    <div class="card">
      <div v-if="$slots.header" class="card-header" style="background: black;">
        <slot name="header" :text="'greetingMessage'" :count="1">header</slot>
      </div>
      
      <div v-if="$slots.default" class="card-content" style="background: blue;">
        <slot :text="'greetingMessage'" :count="1">default</slot>
      </div>
      
      <div v-if="$slots.footer" class="card-footer" style="background: pink;">
        <slot name="footer" :text="'greetingMessage'" :count="1">footer</slot>
      </div>
    </div>
    <h5>例子</h5>
    <div>
      <ul ref="myList">
        <li v-for="item in items" :key="item">{{ item }}</li>
      </ul>
      <button @click="addItem">Add Item</button>
    </div>
    <!-- <div class="container">
        <header>
          <slot name="header" :text="'greetingMessage'" :count="1">header</slot>
        </header>
        <main>
          <slot :text="'greetingMessage'" :count="1">default</slot>
        </main>
        <footer>
          <slot name="footer" :text="'greetingMessage'" :count="1">footer</slot>
        </footer>
    </div> -->
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
