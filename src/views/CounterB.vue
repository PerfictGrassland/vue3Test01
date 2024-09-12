<!-- CounterB.vue -->
<template>
  <div>
    <h2>Counter B</h2>
    <p>Count: {{ count }}</p>
    <button @click="increment">Increment</button>
    <button @click="decrement">Decrement</button>
  </div>
</template>

<script setup>
import { useCounter } from '../fn/useCounter.js'

const { count, increment, decrement } = useCounter()
</script>