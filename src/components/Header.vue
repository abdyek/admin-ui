<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import Loader from '@/components/Loader.vue'

const router = useRouter()

const logOutLoading = ref(false)

function logOut() {
  logOutLoading.value = true
  axios.post('/api/v1/log-out').then((resp) => {
    router.push('/login')
  }).catch((err) => {
    if (err.response.status == 401) {
      unauthorized.value = true
      username.value = ""
      password.value = ""
    }
  }).finally(() => {
    logOutLoading.value = false
  })
}

</script>
<template>
  <div class="flex justify-between p-3">
    <div class="text-5xl">Umono</div>
    <div>
      <button :class="'text-slate-800 bg-orange-300 p-3 rounded-lg w-24', logOutLoading ? 'opacity-50': 'opacity-100'" type="button" @click="logOut">
        <Loader v-if="logOutLoading" />
        <span v-else class="my-1 block">
          Log Out
        </span>
      </button>
    </div>
  </div>
</template>
