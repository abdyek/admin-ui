<script setup>
import { ref, computed }from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import Button from '@/components/Button.vue'

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

const disabledLogin = computed(() => {
  if (username.value.length == 0 || password.value.length == 0) {
    return true
  }
  return false
})

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
        <Button name="Sign in" color="blue" :loading="loginLoading" :disabled="disabledLogin" @click="login" size="large" class="float-right" />
      </form>
    </div>
  </div>
</template>
