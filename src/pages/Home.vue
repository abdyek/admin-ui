<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import Loader from '@/components/Loader.vue'

const router = useRouter()

const loading = ref(true)

onMounted(() => {
  axios.get('/api/v1/me').then((resp) => {
    if (!resp.data.logged_in) {
      router.push('/login')
    } else {
      loading.value = false
    }
  })
})

</script>
<template>
  <!-- TODO: Write a Wrapper component and use it all pages -->
  <div class="lg:container mx-auto">
    <div v-if="loading" class="grid place-items-center h-screen" >
      <Loader size="150px" color="#333" />
    </div>
    <div v-else class="h-screen" >
      [ Some umono information and github link etc. ]
    </div>
  </div>
</template>
