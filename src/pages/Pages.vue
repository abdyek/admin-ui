<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import Page from '@/components/Page.vue'
import Button from '@/components/Button.vue'
import Loader from '@/components/Loader.vue'
import Alert from '@/components/Alert.vue'

const router = useRouter()

const pages = ref([])
const loading = ref(true)

onMounted(() => {
  loading.value = true
  axios.get('/api/v1/pages').then((resp) => {
    pages.value = resp.data.pages
    loading.value = false
  }).catch((err) => {
    if (err.response != undefined) {
      if (err.response.status == 401) {
        router.push('/admin/login')
      }
    }
  })
})

</script>
<template>
  <div class="mb-4">
    <Button name="Create" color="blue" size="small" @click="router.push('/admin/new-page')" />
  </div>
  <div v-if="loading" class="grid place-items-center h-screen">
    <Loader size="150px" color="#333"/>
  </div>
  <div v-else>
    <div v-if="pages.length > 0">
      <div class="grid grid-cols-4 gap-4 mx-4">
        <span>Name</span>
        <span>Slug</span>
        <span>Last Modified</span>
        <span>Enabled</span>
      </div>
      <Page v-for="p in pages" :page="p"/>
    </div>
    <div v-else>
      <Alert color="orange" content="There isn't any page your website." />
    </div>
  </div>
</template>
