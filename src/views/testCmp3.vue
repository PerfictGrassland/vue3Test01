<template>
    <div>
        <p>message： {{ message }}</p>
        <button v-for="(item, index) in btnList" :key="index" @click="clickTab(item.id)"
            :class="{ 'active-tab': activeKey === item.id }">
            {{ item.tabName }}
        </button>
        <testCmp4 :activeTabNodes="activeTabNodes" :defaultVnodes="defaultVnodes">
        </testCmp4>
        <aa></aa>
    </div>
</template>

<script lang="jsx" setup>
import { computed, defineComponent, h, useSlots, defineEmits } from 'vue';
import testCmp4 from './testCmp4.vue';
const emit = defineEmits(['update:activeKey'])
const props = defineProps({
    message: {
        type: String,
        required: true,
        default: 'This is a default description.', // 设置默认值
    },
    activeKey: {
        type: String,
        required: true
    },
})
// 定义 props 类型
// interface Props {
//     message: string;
//     activeKey: string;
// }
// // 使用 defineProps 定义 props
// // 使用 withDefaults 设置默认值
// const props = withDefaults(defineProps<Props>(), {
//     message: () => 'This is a default description.', // 使用函数设置默认值
// });
// console.log('%c [ props ]: ', 'color: #bf2c9f; background: pink; font-size: 13px;', props)

const slots = useSlots();
const defaultVnodes = slots?.default?.() || null;
console.log('%c [ defaultVnodes ]-34', 'font-size:13px; background:pink; color:#bf2c9f;', defaultVnodes, props.activeKey)
const activeTabNodes = computed(() => {
    return defaultVnodes?.find((item) => {
        const currentKey = item.key;
        const res = currentKey === props.activeKey;
        return res;
    })
})
const btnList = computed(() => {
    const res = defaultVnodes?.map((item) => {
        const id = item.key;
        const tabName = item?.props?.tabName || item.key;
        return {
            id,
            tabName
        }
    });
    return res;
})
const clickTab = (id) => {
   emit('update:activeKey', id);
}
console.log('%c [ activeTabNodes ]: ', 'color: #bf2c9f; background: pink; font-size: 13px;', activeTabNodes)

const aa = defineComponent({
  props: {
    message: {
      type: String,
      required: false
    },
    activeKey: {
      type: String,
      required: false
    },
  },
//   render() {
//     return h('div', [
//       h('h1', this.message),
//       h('p', 'This is a Vue 3 component using h function (render函数).')
//     ])
//   },
//   setup(props) {
//     return () => {
//       return h('div', [h('h1', props.message), h('p', 'This is a Vue 3 component using h function（setup函数）.')])
//     }
//   }
  setup(props, context) {
    return () => (
      <>
        { activeTabNodes?.value ? activeTabNodes.value : null }
        <div>This is a Vue 3 component using JSX.</div>
      </>
    )
  }
})

</script>

<style lang="scss" scoped></style>