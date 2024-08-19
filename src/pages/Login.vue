<script setup>
import { ref, onMounted }from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

import Loader from '@/components/Loader.vue'

const router = useRouter()

const loading = ref(false)
const username = ref("")
const password = ref("")
const unauthorized = ref(false)

function login() {
  loading.value = true

  axios.post('/api/v1/login', {
    username: username.value,
    password: password.value,
  }).then((resp) => {
    router.push('/')
  }).catch((err) => {
    if (err.response != undefined) {
      if (err.response.status == 401) {
        unauthorized.value = true
        username.value = ""
        password.value = ""
      }
    }
  }).finally(() => {
    loading.value = false
  })
}

</script>
<template>
<div class="bg-lime-100">
  <div class="lg:container mx-auto">
    <div class="grid place-items-center h-screen">
      <form class="w-96">
        <label class="inline-block w-full p-2 text-slate-800" for="username">Username or Email</label><br>
        <input class="inline-block w-full p-3 text-slate-800" type="text" id="username" v-model="username"><br>
        <label class="inline-block w-full p-2 text-slate-800" for="password">Password</label><br>
        <input class="inline-block w-full p-3 text-slate-800" type="password" id="password" v-model="password"><br><br>
        <span class="block text-slate-100 bg-red-600 p-5 rounded-lg mb-2" v-if="unauthorized">Incorrect username/email or password.</span>
        <button :class="['float-right p-4 bg-slate-800 text-slate-50 rounded-lg w-20 my-2', loading? 'opacity-50': 'opacity-100']" type="button" @click="login">
          <Loader v-if="loading" />
          <span v-else class="my-1 block">
            Login
          </span>
        </button>
      </form>
    </div>
  </div>
</div>
</template>
