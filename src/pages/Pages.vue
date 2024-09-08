<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import Page from '@/components/Page.vue'

const router = useRouter()

const pages = ref([])

onMounted(() => {
  axios.get('/api/v1/pages').then((resp) => {
    pages.value = resp.data.pages
  }).catch((err) => {
    // TODO: handle the error
    console.log(err)
  })
})

</script>
<template>
  <div class="lg:container mx-auto h-screen">
    <div class="p-3">
      <div class="mb-4">
        <h2 class="text-2xl inline">Pages</h2>
        <button class="inline rounded-lg p-2 mx-2 text-xs bg-blue-200 text-slate-800" @click="router.push('/new-page')">Create New Page</button>
      </div>
      <div class="grid grid-cols-4 gap-4 mx-4">
        <span>Name</span>
        <span>Slug</span>
        <span>Last Modified</span>
        <span>Published</span>
      </div>
      <Page v-for="p in pages" :page="p"/>
    </div>
  </div>
</template>
