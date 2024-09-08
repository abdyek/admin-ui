<script setup>
import { ref }from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import Loader from '@/components/Loader.vue'

const router = useRouter()

const loginLoading = ref(false)
const username = ref("")
const password = ref("")
const unauthorized = ref(false)

function login() {
  loginLoading.value = true

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
    loginLoading.value = false
  })
}

</script>
<template>
  <div class="lg:container mx-auto">
    <div class="grid place-items-center h-screen">
      <form class="w-96">
        <h1 class="text-5xl text-stone-50">Umono</h1>
        <label class="inline-block w-full p-2 text-stone-50" for="username">Username</label><br>
        <input class="inline-block w-full p-3 text-stone-800" type="text" id="username" v-model="username" placeholder="or Email"><br>
        <label class="inline-block w-full p-2 text-stone-50" for="password">Password</label><br>
        <input class="inline-block w-full p-3 text-stone-800" type="password" id="password" v-model="password" placeholder="Password"><br><br>
        <span class="block text-stone-100 bg-red-600 p-5 rounded-lg mb-2" v-if="unauthorized">Incorrect username/email or password.</span>
        <button :class="['float-right p-4 bg-blue-300 text-slate-800 rounded-lg w-20 my-2', loginLoading? 'opacity-50': 'opacity-100']" type="button" @click="login">
          <Loader v-if="loginLoading" />
          <span v-else class="my-1 block">
            Login
          </span>
        </button>
      </form>
    </div>
  </div>
</template>
