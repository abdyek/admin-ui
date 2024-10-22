<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import Page from '@/components/Page.vue'
import Button from '@/components/Button.vue'
import Loader from '@/components/Loader.vue'

const router = useRouter()

const pages = ref([])
const loading = ref(true)

onMounted(() => {
  loading.value = true
  axios.get('/api/v1/pages').then((resp) => {
    pages.value = resp.data.pages
    loading.value = false
  }).catch((err) => {
    // TODO: handle the error
    console.log(err)
  })
})

</script>
<template>
  <div class="mb-4">
    <h2 class="text-2xl inline">Pages</h2>
    <Button name="Create" color="blue" size="small" @click="router.push('/admin/new-page')" />
  </div>
  <div v-if="loading" class="grid place-items-center h-screen">
    <Loader size="150px" color="#333"/>
  </div>
  <div v-else>
    <div class="grid grid-cols-4 gap-4 mx-4">
      <span>Name</span>
      <span>Slug</span>
      <span>Last Modified</span>
      <span>Enabled</span>
    </div>
    <Page v-for="p in pages" :page="p"/>
  </div>
</template>
