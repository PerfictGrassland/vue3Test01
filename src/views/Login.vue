<script setup lang="ts">
import { useRouter, useRoute, onBeforeRouteUpdate, onBeforeRouteLeave } from 'vue-router'
const router = useRouter()
// console.log('%c [ router ]-6', 'font-size:13px; background:pink; color:#bf2c9f;', router)
const route = useRoute()
console.log('%c [ login route ]-8', 'font-size:13px; background:pink; color:#bf2c9f;', route)
</script>

<template>
    <div>
        login
    </div>
</template>