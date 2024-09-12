<script lang="jsx">
import { defineComponent, h, useSlots, computed, isRef } from 'vue'

export default defineComponent({
  // model: {
  //   props: "activeKey",
  //   event: "click"
  // },
  props: {
    message: {
      type: String,
      required: true
    },
    activeKey: {
      type: String,
      required: true
    },
  },
  // render() {
  //   return h('div', [
  //     h('h1', this.message),
  //     h('p', 'This is a Vue 3 component using h function.')
  //   ])
  // },
  // setup(props) {
  //   return () => {
  //     return h('div', [h('h1', props.message), h('p', 'This is a Vue 3 component using h function.')])
  //   }
  // }
  setup(props, context) {
    const slots = useSlots();
    const defaultVnodes = slots.default() || null;


    // const showVnodes = defaultVnodes?.map((item)=>{
    //   const currentKey = item.key;
    //   const res = currentKey ===  props.activeKey;
    //   if(res) {
    //     return item;
    //   }
    //   return null;
    // })

    // const showVnodes = computed(() => {
    //   return defaultVnodes?.map((item) => {
    //     const currentKey = item.key;
    //     const res = currentKey === props.activeKey;
    //     if (res) {
    //       return item;
    //     }
    //     return null;
    //   })
    // })

    const showVnodes = computed(() => {
      return defaultVnodes?.find((item) => {
        const currentKey = item.key;
        const res = currentKey === props.activeKey;
        return res;
      })
    })

    const showVnodes2 = () => {
      return defaultVnodes?.find((item) => {
        const currentKey = item.key;
        const res = currentKey === props.activeKey;
        return res;
      })
    }

    const showVnodes3 = () => {
      return defaultVnodes?.map((item) => {
        const currentKey = item.key;
        const res = currentKey === props.activeKey;
        if(res) {
          return item;
        }
        return null;
      })
    }

    const showVnodes4 = computed(() => {
      return defaultVnodes?.map((item) => {
        const currentKey = item.key;
        const res = currentKey === props.activeKey;
        if(res) {
          return item;
        }
        return null;
      })
    })

    const handleClick = (key) => {
      context.emit('chanageTab', key);
      context.emit('update:activeKey', key);
      console.log('Button clicked!', key, context.emit)
    }


    console.log('%c [ slots ]-24', 'font-size:13px; background:pink; color:#bf2c9f;', slots, defaultVnodes, showVnodes, props.activeKey, isRef(showVnodes))
    console.log('%c [ showVnodes ]-61', 'font-size:13px; background:pink; color:#bf2c9f;', showVnodes, showVnodes.value)
    return () => (
      <>
        {/* <div>This is a Vue 3 component using JSX.</div> */}
        {/* <div>
          {slots.default ? slots.default() : null}
          {slots.aa ? slots.aa() : null}
          {slots.bb ? slots.bb() : null}
        </div> */}

        <div>
          {defaultVnodes ? defaultVnodes.map((vnode, index) => (
            <button key={index} onClick={handleClick.bind(this, vnode.key)} class={[{ 'active-tab': vnode.key === props.activeKey }]}>{index}:{vnode.key}</button>
          )) : null}
        </div>
        <button onClick={() => console.log('Button clicked!')}>Click me</button>
        {showVnodes.value ? showVnodes.value : null}
        {
          defaultVnodes?.find((item) => {
            const currentKey = item.key;
            const res = currentKey === props.activeKey;
            return res;
          })
        }
        {showVnodes2()}
        {showVnodes3()}
        {showVnodes4?.value}

      </>
    )
  }
})

// export default defineComponent({
//   name: 'MyComponent',
//   props: {
//     message: {
//       type: String,
//       required: true
//     }
//   },
//   // setup(props) {
//   //   // return () => (
//   //   //   <div>
//   //   //     <h1>{props.message}</h1>
//   //   //     <p>This is a Vue 3 component created using JSX.</p>
//   //   //   </div>
//   //   // )
//   //   return function () {
//   //     // return h('div', '999');
//   //     return (
//   //       <div>
//   //         <h1>{props.message}</h1>
//   //         <p>This is a Vue 3 component created using JSX.</p>
//   //       </div>
//   //     )
//   //   }
//   // },
//   template: `
//       <div>
//         <h1>{message}</h1>
//         <p>This is a Vue 3 component created using JSX.</p>
//       </div>
//   `,
// })
</script>

<style>
.active-tab {
  background-color: red
}
</style>
