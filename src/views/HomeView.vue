<script setup lang="ts">

function someComplexFunction() {
  return 11;
}

class BankAccount {
  #balance = 0;
  balance2 = 0;
  static staticProp = 'foo';
  w = someComplexFunction(); // 不允许

  deposit(amount: any) {
    this.#balance += amount;
  }

  withdraw(amount: any) {
    if (amount <= this.#balance) {
      this.#balance -= amount;
      return amount;
    }
    return 0;
  }

  getBalance() {
    return this.#balance;
  }
}

const account = new BankAccount();
account.deposit(1000);
console.log(account.balance2, BankAccount.staticProp); // Error: Private field '#balance' must be declared in an enclosing class
// console.log(account.#balance); // Error: Private field '#balance' must be declared in an enclosing class


import { computed, getCurrentInstance, isRef, onBeforeMount, onBeforeUnmount, onMounted, onUnmounted, provide, reactive, ref, watch, watchEffect } from 'vue';
import { cloneDeep } from 'lodash';
import TheWelcome from '../components/TheWelcome.vue'
import CounterA from './CounterA.vue'
import CounterB from './CounterB.vue'
import testCmp1 from './testCmp1.vue'
// import testCmp2 from './testCmp2.vue'
import testCmp2 from './testCmp2.vue'
import testCmp3 from './testCmp3.vue'
// onBeforeRouteEnter
import { useRouter, useRoute, onBeforeRouteUpdate, onBeforeRouteLeave } from 'vue-router'
import { useCounter } from '../fn/useCounter.js'
import axios from 'axios';
import { createItem, fetchItems } from '@/api/utils';

const { count, increment, decrement } = useCounter()

// const themeColor = ref(count)
// const themeColor = ref({
//   color: 'blue'
// })
// provide('themeColor', themeColor)

// setTimeout(()=>{
//   themeColor.value.color = 'red'
//   console.log('%c [ 三秒后 ]: ', 'color: #bf2c9f; background: pink; font-size: 13px;', '三秒后')
// }, 3000)


// const themeState = reactive({
//   color: 'blue'
// })

const themeState = ref({
  color: 'blue'
})

provide('themeState', themeState)

// const updateThemeColor = () => {
//   themeState.color = 'red'
// }

const updateThemeColor = () => {
  themeState.value.color = 'red'
}


const router = useRouter()
// console.log('%c [ router ]-6', 'font-size:13px; background:pink; color:#bf2c9f;', router)
const route = useRoute()
// console.log('%c [ route ]-8', 'font-size:13px; background:pink; color:#bf2c9f;', route)

// const beforeRouteEnter = (to: any, from: any, next: any) => {
//   console.log('%c [ beforeRouteEnter ]-9', 'font-size:13px; background:pink; color:#bf2c9f;', to, from)
//   // 在渲染该组件的对应路由被 confirm 前调用
//   next()
// }

const beforeRouteUpdate = (to: any, from: any, next: any) => {
  //console.log('%c [ home beforeRouteUpdate ]-15', 'font-size:13px; background:pink; color:#bf2c9f;', to, from, route, route?.params, route.params.id)
  // 在当前路由改变,但是该组件被复用时调用
  next()
}

const beforeRouteLeave = (to: any, from: any, next: any) => {
  // console.log('%c [ home beforeRouteLeave ]-21', 'font-size:13px; background:pink; color:#bf2c9f;', to, from, route)
  // 导航离开该组件的对应路由时调用
  next()
}

const updateTest = function () {
  // router.replace('/?aa=9999')

  // router.replace({
  //   path: '/?cc=99',
  //   query: {
  //     aa: 11,
  //     bb: 44
  //   }
  // })

  // router.replace({ name: 'login', params: { id: '123' }, query: { csj: '123' } })
  router.push({ name: 'login', params: { id: '123' }, query: { csj: '123' } })
}

// onBeforeRouteEnter(beforeRouteEnter)
onBeforeRouteUpdate(beforeRouteUpdate)
onBeforeRouteLeave(beforeRouteLeave)

// beforeRouteEnter(to, from, next) {
//     // 在渲染该组件的对应路由被 confirm 前调用
//     // 不能获取组件实例 `this`，因为组件实例还没被创建
//     next(vm => {
//       // 通过 `vm` 访问组件实例
//     })
//   }
//   beforeRouteUpdate(to, from, next) {
//     // 在当前路由改变，但是该组件被复用时调用
//     // 比如 /user/123 => /user/456
//     next()
//   }
//   beforeRouteLeave(to, from, next) {
//     // 导航离开该组件的对应路由时调用
//     // 可以访问组件实例 `this`
//     if (this.unsavedChanges) {
//       next(false) // 取消导航
//     } else {
//       next()
//     }
//   }

const state = reactive({
  count: 0
})
// watch(
//   () => state.count, 
//   (newCount, oldCount) => {
//     console.log(`count changed from ${oldCount} to ${newCount}`)
//   },
//   {
//     immediate: true
//   }
// )
// watch(
//   () => state, 
//   (newCount, oldCount) => {
//     console.log(`count changed from ${oldCount} to ${newCount}`, oldCount, newCount)
//   },
//   {
//     immediate: true,
//     deep: true
//   }
// )




const pa1Ref = ref(1);
const pa2Ref = ref(2);
const testObj = reactive({
  pa1: 1,
  pa2: 2
})
const computedVal1 = computed(() => {
  const res = pa1Ref.value + pa2Ref.value;
  console.log('%c [ res ]-97', 'font-size:13px; background:pink; color:#bf2c9f;', res)
  return res;
})
console.log('[ computedVal1 ] >', computedVal1, computedVal1.value, isRef(computedVal1))

// 计算属性传递参数
const computedVal2 = computed(() => {
  return (...args: any) => {
    const res = pa1Ref.value + pa2Ref.value;
    // const res = testObj.pa1 + testObj.pa2;
    // const res = pa1Ref.value + testObj.pa2;
    // console.log('%c [ res ]-97', 'font-size:13px; background:pink; color:#bf2c9f;', res, args)
    return res;
  }
})

console.log('[ computedVal2 ] >', computedVal2, computedVal2.value, computedVal2.value?.(), isRef(computedVal2))

let testVal1 = 11;
let testVal2 = 11;
const computedVal3 = computed(() => {
  console.log('%c [ 测试非响应式数据 ]: ', 'color: #bf2c9f; background: pink; font-size: 13px;', '测试非响应式数据', testVal1 + testVal2)
  return testVal1 + testVal2;
})

setTimeout(() => {
  testVal1++;
  testVal2++;
  console.log('%c [ 3秒后，测试非响应式数据 ]: ', 'color: #bf2c9f; background: pink; font-size: 13px;', '测试非响应式数据', testVal1, testVal2)
}, 3000);



const now = computed(() => {
  console.log('[ 11 ] >', 11)
  return Date.now();
})



const firstName = ref('John')
const lastName = ref('Doe')

const fullName = computed({
  // getter
  get() {
    console.log('%c [ get ]: ', 'color: #bf2c9f; background: pink; font-size: 13px;', firstName, lastName)
    return firstName.value + ' ' + lastName.value
  },
  // setter
  set(newValue) {
    // 注意：我们这里使用的是解构赋值语法
    [firstName.value, lastName.value] = newValue.split(' ');
    console.log('%c [ set ]: ', 'color: #bf2c9f; background: pink; font-size: 13px;', firstName, lastName)
  }
})


watch(
  () => cloneDeep(state),
  (newValue, oldValue) => {
    console.log('Object changed:', newValue, oldValue)
  },
  { deep: true }
)

setTimeout(() => {
  state.count = 999;
}, 1000);
setTimeout(() => {
  state.count = 4444;
}, 3000);




// 类数组转化为数组
const arrayLikeObj: any = {
  0: '前端胖头鱼',
  1: 100,
  length: 2
}

// 1. [].slice
console.log([].slice.call(arrayLikeObj))
// 2. Array.from
console.log(Array.from(arrayLikeObj))
// 3. Array.apply
console.log(Array.apply(null, arrayLikeObj), Array.prototype.slice.apply(arrayLikeObj), Array.prototype.concat.apply([], arrayLikeObj))
// 4. [].concat
console.log([].concat.apply([], arrayLikeObj))

const fetchFromServer = function () {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ data: 'Hello from the server!' })
    }, 2000)
  })
}

const fetchData = async function () {
  try {
    console.log('%c [ 调用接口 ]: ', 'color: #bf2c9f; background: pink; font-size: 13px;', '调用接口')
    const response = await fetchFromServer()
    console.log('%c [ response ]-275', 'font-size:13px; background:pink; color:#bf2c9f;', response)
  } catch (error) {
    console.error('Error fetching data:', error)
  } finally {
    console.log('%c [ finally ]-280', 'font-size:13px; background:pink; color:#bf2c9f;', 'finally')
  }
}

// console.log('%c [ 11 ]: ', 'color: #bf2c9f; background: pink; font-size: 13px;', '11')
// fetchData();
// console.log('%c [ 22 ]: ', 'color: #bf2c9f; background: pink; font-size: 13px;', '22')



// Promise.resolve().then(() => {
//     console.log('ok1')
//     return new Promise(()=>{})  // 返回“pending”状态的Promise对象
// }).then(() => {
//     // 后续的函数不会被调用
//     console.log('ok2')
// }).catch(err => {
//     console.log('err->', err)
// })

const testPr = new Promise(function (rs, rj) {
  rj('err01')
  rs('999')
}).then(function (rs) {
  console.log('%c [ success ]-303', 'font-size:13px; background:pink; color:#bf2c9f;', rs)
}, function (rs) {
  console.log('%c [ err ]-306', 'font-size:13px; background:pink; color:#bf2c9f;', rs)
}).then((rs) => {
  console.log('%c [ 11 ]-307', 'font-size:13px; background:pink; color:#bf2c9f;', rs)
})
  .then((rs) => {
    console.log('%c [ 22 ]-307', 'font-size:13px; background:pink; color:#bf2c9f;', rs)
  }).catch((rs) => {
    console.log('%c [ 33 ]-307', 'font-size:13px; background:pink; color:#bf2c9f;', rs)
  })


// Promise.resolve(11)
//   .then(22)
//   .then(() => {
//     return Promise.resolve(33);
//     // return Promise.reject(33);
//     // return new Promise();
//     // throw new Error('ERR');
//     // return new Promise(()=>{});
//   })
//   .then((res) => {
//     console.log('[ res11 ] >', res)
//   })
//   .catch((res) => {
//     console.log('[ res22 ] >', res)
//   })
//   .then((res) => {
//     console.log('[ res33 ] >', res)
//   })


// const name = ref('John')
// const age = ref(30)

// watch(
//   () => name.value,
//   (newName, oldName) => {
//     console.log('%c [ watch1 ]: ', 'color: #bf2c9f; background: pink; font-size: 13px;', 'watch1')
//     console.log(`Name changed from ${oldName} to ${newName}`)
//     // 你可以在这里执行一些复杂的操作,比如更新数据库、发送网络请求等
//   }
// )

// watch(
//   [() => name.value, () => age.value],
//   ([newName, newAge], [oldName, oldAge]) => {
//     console.log('%c [ watch2 ]: ', 'color: #bf2c9f; background: pink; font-size: 13px;', 'watch2')
//     console.log(`Name: ${oldName} -> ${newName}, Age: ${oldAge} -> ${newAge}`)
//   }
// )

// function changeName() {
//   name.value = 'Jane'
// }

// function changeAge() {
//   age.value++
// }



// const count = ref(0)
// const double = ref(0)

// watchEffect(() => {
//   double.value = count.value * 2;
//   console.log('%c [ watchEffect ]: ', 'color: #bf2c9f; background: pink; font-size: 13px;', 'watchEffect')
//   console.log(`Count is ${count.value}, Double is ${double.value}`)
// })

// function increment() {
//   count.value++
// }

// 打印
const printDiv = function (divId = '') {
  // 获取指定 div 元素
  const div = document.getElementById(divId);

  // 创建一个临时的 iframe 元素
  const iframe = document.createElement('iframe');
  iframe.style.display = 'none';
  document.body.appendChild(iframe);

  // 将 div 元素的内容写入 iframe
  const iframeDoc = iframe?.contentWindow?.document;
  if (iframeDoc) {
    iframeDoc.open();
    iframeDoc.write(`
      <html>
        <head>
          <title>Printed Content</title>
          <style media="print" type="text/css">
              html,
              body {
                -webkit-print-color-adjust: exact !important;
                -moz-print-color-adjust: exact !important;
                -ms-print-color-adjust: exact !important;
                print-color-adjust: exact !important;
                width: 190mm;
                zoom:  0.745 !important;
              }
              @media print and (orientation:portrait) {
                html,
                body {
                  zoom:  0.745 !important;
                }
              }
          </style>
        </head>
        <body>
          ${div?.innerHTML || ''}
        </body>
        </html>
    `);
    iframeDoc.close();
  }
  // 触发打印对话框
  iframe?.contentWindow?.focus();
  iframe?.contentWindow?.print();

  // 删除临时 iframe 元素
  document.body.removeChild(iframe);
}

const printDiv2 = function (divId = '') {
  // 获取指定 div 元素
  const div = document.getElementById(divId);

  // 创建一个新的打印窗口
  const printWindow = window.open('', '', 'height=400,width=800');

  if (printWindow) {
    // 将 div 元素的内容写入打印窗口
    printWindow.document.write('<html><head><title>Printed Content</title>');
    printWindow.document.write('</head><body >');
    printWindow.document.write(div?.innerHTML || '');
    printWindow.document.write('</body></html>');

    // 打印并关闭打印窗口
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  }
}

const printDiv3 = function (divId = '') {
  // 获取指定 div 元素
  const div = document.getElementById(divId);

  // 创建一个临时的打印按钮元素
  const printBtn = document.createElement('button');
  printBtn.textContent = 'Print';
  printBtn.style.display = 'none';
  document.body.appendChild(printBtn);

  // 添加点击事件处理程序
  printBtn.addEventListener('click', function () {
    // 打印当前页面
    window.print();
  });

  // 点击打印按钮
  printBtn.click();

  // 删除临时的打印按钮元素
  document.body.removeChild(printBtn);
}


const printDiv4 = function (divId = '') {
  // 获取需要打印的元素
  const printContentEl = document.getElementById(divId);

  // 创建新的 iframe 元素
  const iframe = document.createElement('iframe');
  iframe.style.display = 'none';
  document.body.appendChild(iframe);

  // 获取 iframe 的 window 对象
  const iframeWindow = iframe.contentWindow;

  if (iframeWindow) {
    // 向 iframe 写入打印内容
    iframeWindow.document.open();
    const pdfHtml = `
        <!DOCTYPE html>
        <html>
          <head>
          <title>Print Page</title>
           <style media="print" type="text/css">
              html,
              body {
                -webkit-print-color-adjust: exact !important;
                -moz-print-color-adjust: exact !important;
                -ms-print-color-adjust: exact !important;
                print-color-adjust: exact !important;
                width: 190mm;
                zoom:  0.745 !important;
              }
              ${document.querySelector('style')?.outerHTML}
              @media print {
                html,
                body {
                  zoom:  0.745 !important;
                }
              }
              .print-box {
                background-color: red;
                border: 10px solid black;
              }
              @media print {
                .print-box {
                  background-color: red;
                  border: 10px solid black;
                }
              }
          </style>
          </head>
          <body>
             ${printContentEl?.outerHTML}
          </body>
        </html>
    `
    iframeWindow.document.write(pdfHtml);
    console.log('%c [ pdfHtml ]-527', 'font-size:13px; background:pink; color:#bf2c9f;', pdfHtml)
    iframeWindow.document.close();

    // 触发打印
    iframeWindow.focus();
    iframeWindow.print();
  }
  // 移除 iframe
  document.body.removeChild(iframe);
}


const printDiv5 = function (divId = '') {
  const iframe: any = document.getElementById("iframe1");//获取iframe的window对象
  const iwindow: any = iframe.contentWindow;
  const iframeDoc = iframe.contentDocument;

  // iwindow.document.body.innerText = "";//先清空iframe原先的内容
  const printhtml: any = window.document.getElementById(divId);
  const styleSheets = Array.from(document.styleSheets);
  // const myComponent = ref(null)
  // const componentStyle = myComponent?.value && window.getComputedStyle(myComponent?.value);
  const style = ref()
  const element = document.querySelector('#print')
  style.value = element && window.getComputedStyle(element)
  // const fontSize = element?.style.cssText
  console.log('%c [ styleSheets ]-542', 'font-size:13px; background:pink; color:#bf2c9f;', styleSheets, element, element?.classList, (element as any)?.style?.cssText, 999, element && window.getComputedStyle(element).cssText)
  // 将样式写入 iframe 的 <head>
  const head = iframeDoc.getElementsByTagName("head")[0];
  styleSheets.forEach(sheet => {
    const style = iframeDoc.createElement("style");
    style.innerHTML = Array.from(sheet.cssRules).map(rule => rule.cssText).join("\n");
    head.insertBefore(style, head.firstChild);
    console.log('%c [ head ]-549', 'font-size:13px; background:pink; color:#bf2c9f;', head)
  });
  // 写入打印内容
  iframeDoc.body.innerHTML = printhtml?.innerHTML;
  console.log('%c [ iframeDoc ]-553', 'font-size:13px; background:pink; color:#bf2c9f;', iframeDoc)

  // 触发打印
  // iframe.contentWindow.print();
  // iframe.contentWindow.close();
  iwindow.print();
  iwindow.close();
}

const activeKey = ref('tab1');
const chanageTabItem = function (key: string) {
  activeKey.value = key;
  console.log('[ key ] >', key)
}

function getTest1() {
  // 使用 fetch 发送 GET 请求
  const name = "NewItem";
  const age = 30;

  fetch(`http://localhost:8099/api/items2?name=${encodeURIComponent(name)}&age=${age}`)
    .then(response => response.text()) // 或者 response.json() 如果返回的是 JSON
    .then(data => {
      console.log('%c [ getTest1() - data ]: ', 'color: #bf2c9f; background: pink; font-size: 13px;', data)
    })
    .catch(error => {
      console.error('Error(getTest1getTest1getTest1getTest1):', error);
    });
}

async function getTest2() {
  try {
    const response = await axios.get('http://localhost:8099/api/items2', {
      params: {
        name: 'NewItem',
        age: 30
      }
    });
    console.log('GET Response:', response.data);
  } catch (error) {
    console.error('Error fetching items:', error);
  }
}

async function getTest3() {
  try {
    const response = await axios.request({
      url: 'http://localhost:8099/api/items2',
      method: 'get',
      params: {
        name: 'NewItem',
        age: 30
      }
    });
    console.log('GET Response:', response.data);
  } catch (error) {
    console.error('Error fetching items:', error);
  }
}


function postTest1() {
  // 使用 fetch 发送 POST 请求
  const itemRequest = {
    name: "NewItem",
    description: "Item description",
    price: 10.99
  };

  fetch('http://localhost:8099/items5', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(itemRequest) // 将对象转换为 JSON 字符串
  })
    .then(response => {
      console.log('%c [ response ]-622', 'font-size:13px; background:pink; color:#bf2c9f;', response)
      // return response.text();
      return response.json();
    }) // 或者 response.json() 如果返回的是 JSON
    .then(data => {
      console.log('%c [ postTest1 --data ]: ', 'color: #bf2c9f; background: pink; font-size: 13px;', data, typeof data)
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

async function postTest2() {
  const newItem = {
    name: 'NewItem',
    description: 'Item description',
    price: 10.99
  };

  try {
    const response = await axios.post('http://localhost:8099/items3', newItem);
    console.log('POST Response2:', response.data);
  } catch (error) {
    console.error('Error creating item:', error);
  }
}

async function postTest3() {
  const newItem = {
    name: 'NewItem',
    description: 'Item description',
    price: 10.99
  };

  try {
    const response = await axios.request({
      url: 'http://localhost:8099/items3',
      method: 'post',
      data: newItem
    });
    console.log('POST Response3:', response.data);
  } catch (error) {
    console.error('Error creating item:', error);
  }
}

// async function postTest4() { 
//   createItem()
// }


onBeforeMount(() => {
  console.log('[home - onBeforeMount ] >',)
})
onMounted(() => {
  // getTest1();
  getTest2();
  getTest3();
  fetchItems();
  console.log('[home - onMounted ] >',)
})
onBeforeUnmount(() => {
  console.log('[home - onBeforeUnmount ] >',)
})
onUnmounted(() => {
  console.log('[home - onUnmounted ] >',)
})

function chanageTab(key: any, any: any) {
  throw new Error('Function not implemented.');
}

const countModel = ref(0);
const countModel2 = ref(0);


const Instance = getCurrentInstance();
console.log('%c [ appContext ]-733', 'font-size:13px; background:pink; color:#bf2c9f;', Instance)
const $translate = Instance?.appContext.config.globalProperties.$translate;

</script>

<template>
  <main>
    <!-- <button @click="updateTest()">sss</button>
    <p>computedVal1: {{ computedVal1 }}</p>
    <p>computedVal2: {{ computedVal2(1) }}</p> -->
    <!-- <p>computedVal3: {{ computedVal3 }}</p>
    <p>testVal1: {{ testVal1 }}; testVal2: {{ testVal2 }}</p> -->
    <!-- <p>now: {{ now }}</p> -->
    <!-- <p>fullName: {{ fullName }}</p> -->


    <!-- <div>
      <p>Name: {{ name }}</p>
      <p>Age: {{ age }}</p>
      <button @click="changeName">Change Name</button>
      <button @click="changeAge">Increment Age</button>
    </div>

    <div>
      <p>Count: {{ count }}</p>
      <p>Double: {{ double }}</p>
      <button @click="increment">Increment</button>
    </div> -->
    <h1>哈哈哈哈哈，我在修改东西</h1>
    <button @click="updateThemeColor">Update Theme Color</button>

    <button @click="postTest1">测试post接口1</button>
    <button @click="postTest2">测试post接口2</button>
    <button @click="postTest3">测试post接口3</button>
    <button @click="createItem">测试post接口4</button>

    <h2>插件</h2>
    <h1>{{ $translate('greetings.aa.hello') }}</h1>
    <h1>{{ $translate('greetings.goodbye') }}</h1>

    <div>
      <h2>Counter</h2>
      <p>Count: {{ count }}</p>
      <button @click="increment">Increment</button>
      <button @click="decrement">Decrement</button>
    </div>

    <h1>父组件：{{ countModel }}, {{ countModel2 }}</h1>
    <TheWelcome v-model="countModel" v-model:countModel2="countModel2" />

    <h2 @click="printDiv('print')">打印1</h2>
    <h2 @click="printDiv2('print')">打印2</h2>
    <h2 @click="printDiv3('print')">打印3</h2>
    <h2 @click="printDiv4('print')">打印4</h2>
    <h2 @click="printDiv5('print')">打印5</h2>
    <!-- style="background-color: aqua;" -->
    <div id="print" ref="style" class="print-box">
      <CounterA />
      <CounterB />
    </div>
    <iframe id="iframe1" style="display: none"></iframe>

    <h1>组件testCmp1</h1>
    <testCmp1>
      <p>11</p>
      <template v-slot:aa>
        <div>
          aa
        </div>
      </template>
      <template v-slot:bb>
        <div>
          bbb
        </div>
      </template>
    </testCmp1>
    <h1>组件testCmp2</h1>
    <!-- <testCmp2 message="Hello, Vue 3!">
        <p>11</p>
        <template v-slot:aa>
          <div>
            aa
          </div>
        </template>
        <template v-slot:bb>
          <div>
            bbb
          </div>
        </template>
    </testCmp2> -->
    activeKey: {{ activeKey }}
    <testCmp2 :activeKey="activeKey" @chanageTab="chanageTabItem($event)" message="Hello, Vue 3!">
      <div key="tab1">
        tab1 content
      </div>
      <div key="tab2">
        tab2 content
      </div>
      <div key="tab3">
        tab3 content
      </div>
    </testCmp2>

    <testCmp2 v-model:activeKey="activeKey" message="Hello, Vue 3!">
      <div key="tab1">
        tab1 content
      </div>
      <div key="tab2">
        tab2 content
      </div>
      <div key="tab3">
        tab3 content
      </div>
    </testCmp2>
    <h1>组件testCmp3: {{ activeKey }}</h1>
    <testCmp3 v-model:activeKey="activeKey" message="Hello, Vue 3!">
      <div key="tab1" tabName="tabName1">
        tab1  content
      </div>
      <div key="tab2" tabName="tabName2">
        tab2 content
      </div>
      <div key="tab3" tabName="tabName3">
        tab3 content
      </div>
    </testCmp3>
  </main>
</template>

<style>
.print-box {
  background-color: red;
  border: 10px solid black;
}

@media print {
  .print-box {
    background-color: red;
    border: 10px solid black;
  }
}
</style>
