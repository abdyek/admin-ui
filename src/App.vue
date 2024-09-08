<script setup>
import { computed } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import Header from '@/components/Header.vue'

const route = useRoute()

const noHeader = computed(() => {
  if (route.path == "/login") {
    return true
  }

  return false
})

</script>
<template>
  <div class="bg-stone-900 text-stone-50">
    <div class="lg:container mx-auto h-screen">
      <Header v-if="!noHeader" />
      <RouterView />
    </div>
  </div>
</template>
