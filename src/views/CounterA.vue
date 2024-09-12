<!-- CounterA.vue -->
<template>
    <div>
        <h2>Counter A</h2>
        <p>Count: {{ count }}</p>
        <button @click="increment">Increment</button>
        <button @click="decrement">Decrement</button>
    </div>
    <!-- <div>
        <h2>Child Component B</h2>
        <p> themeColor.value: {{ themeColor.value }}</p>
    </div> -->
    <!-- <div :style="{ color: themeState?.color }">
        <h2>Child Component A</h2>
    </div> -->

    <div :style="{ color: themeState.color }">
        <h2>Child Component A</h2>
    </div>
</template>

<script setup>
import { useCounter } from '../fn/useCounter.js'
import { inject } from 'vue'

const themeState = inject('themeState')
console.log('%c [ themeState ]-20', 'font-size:13px; background:pink; color:#bf2c9f;', themeState, themeState.value, themeState.value.color)

const { count, increment, decrement } = useCounter()
</script>