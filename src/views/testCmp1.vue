<script>
import { h, useSlots } from 'vue';
export default {
    name: "testCmp1",
    props: ['textNode'], 
    setup(props, context) {
        console.log('[ props, context ] >', props, context, context.slots, context.attrs, context.emit, context.expose);
        const slots = useSlots();

        console.log('[ context.slots.default() ] >', context.slots?.default?.(), slots?.default?.(), props, props?.textNode)
        function render() {
            return h('div', {}, [
                h('h1', {}, ['标题11', '标题22', h('h3', { 
                    class: ['container', 'my-class'],
                    style: { color: 'red', fontSize: '16px' },
                    onClick: () => console.log('Clicked!') // 使用 onClick 而不是 on
                }, '标题33')]),
                h('h2', {}, '标题'),
                h('h3', {}, '标题'),
                slots?.default?.(),
                slots?.aa?.(),
                slots?.bb?.(),
                props?.textNode || null
            ])
        }
        return render;
    }
}
</script>