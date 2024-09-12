<script lang="jsx">
import { defineComponent, h, useSlots, computed, isRef } from 'vue'

export default defineComponent({
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
    console.log('%c [ props ]-28', 'font-size:13px; background:pink; color:#bf2c9f;', props, context)
    const slots = useSlots();
    // const defaultVnodes = slots.default() || null;
    return () => (
      <>
        { context?.attrs?.activeTabNodes }
        <div>This is a Vue 3 component using JSX.</div>
      </>
    )
  }
})

</script>

<style>
.active-tab {
  background-color: red
}
</style>
