<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import Loader from '@/components/Loader.vue'

const router = useRouter()

const logoutLoading = ref(false)

function logout() {
  logoutLoading.value = true
  axios.post('/api/v1/logout').then((resp) => {
    router.push('/login')
  }).catch((err) => {
    if (err.response.status == 401) {
      unauthorized.value = true
      username.value = ""
      password.value = ""
    }
  }).finally(() => {
    logoutLoading.value = false
  })
}

</script>
<template>
  <div class="flex justify-between items-end p-3 h-20 text-stone-50">
    <div class="flex items-end">
      <h1 class="text-5xl cursor-pointer" @click="router.push('/')">Umono</h1>
      <h2 class="text-2xl rounded-lg mx-4 cursor-pointer hover:bg-blue-300 p-2" @click="router.push('/pages')">Pages</h2>
    </div>
    <div>
      <button :class="'text-slate-800 bg-orange-300 p-3 rounded-lg w-24', logoutLoading ? 'opacity-50': 'opacity-100'" type="button" @click="logout">
        <Loader v-if="logoutLoading" />
        <span v-else class="my-1 block">
          Sign out
        </span>
      </button>
    </div>
  </div>
</template>
