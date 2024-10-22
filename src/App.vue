<script setup>
import axios from 'axios'
import { ref, computed, onMounted } from 'vue'
import { RouterView, useRoute, useRouter } from 'vue-router'
import Loader from '@/components/Loader.vue'
import Header from '@/components/Header.vue'
import Dialog from '@/components/Dialog.vue'

const route = useRoute()
const router = useRouter()

const loading = ref(true)

onMounted(() => {
  axios.get('/api/v1/me').then((resp) => {
    loading.value = false
    if (!resp.data.logged_in) {
      router.push('/admin/login')
    }
  })
})

const noHeader = computed(() => {
  if (route.path == "/login") {
    return true
  }

  return false
})

</script>
<template>
  <div v-if="loading" class="grid place-items-center h-screen" >
    <Loader size="150px" color="#333" />
  </div>
  <div class="lg:container mx-auto h-screen" v-else>
    <Header v-if="!noHeader" />
    <RouterView />
  </div>
  <Dialog />
</template>
