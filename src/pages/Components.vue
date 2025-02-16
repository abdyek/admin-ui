<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import Component from '@/components/Component.vue'
import Button from '@/components/Button.vue'
import Loader from '@/components/Loader.vue'

const router = useRouter()

const comps = ref([])
const loading = ref(true)

onMounted(() => {
  axios.get('/api/v1/components').then((resp) => {
    comps.value = resp.data.components
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
    <Button name="Create" color="blue" size="small" @click="router.push('/admin/new-component')" />
  </div>
  <div v-if="loading" class="grid place-items-center h-screen">
    <Loader size="150px" color="#333"/>
  </div>
  <div>
    <div class="grid grid-cols-2 gap-4 mx-4">
      <span>Name</span>
      <span>Last Modified</span>
    </div>
    <Component v-for="c in comps" :comp="c" />
  </div>
</template>
