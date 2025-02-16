<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const menu = [
  {
    name: 'Pages',
    path: '/admin/pages',
  },
  {
    name: 'Components',
    path: '/admin/components',
  },
]

</script>
<template>
  <h2
    v-for="item in menu"
    class="text-xl rounded-lg mx-1 cursor-pointer hover:bg-blue-300 hover:text-slate-800 p-3"
    :class="{ 'bg-blue-300 text-slate-800': $route.path === item.path }"
    @click="router.push(item.path)">{{ item.name }}</h2>
</template>
