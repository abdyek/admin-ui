<script setup>
import { ref, computed }from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import Button from '@/components/Button.vue'
import Alert from '@/components/Alert.vue'

const router = useRouter()

const loginLoading = ref(false)
const username = ref("")
const password = ref("")

const unauthorized = ref(false)
const alreadyLoggedIn = ref(false)

function login() {
  loginLoading.value = true

  axios.post('/api/v1/login', {
    username: username.value,
    password: password.value,
  }).then((resp) => {
    router.push('/admin')
  }).catch((err) => {
    if (err.response != undefined) {
      if (err.response.status == 401) {
        unauthorized.value = true
        username.value = ""
        password.value = ""
      } else if (err.response.status == 409) {
        alreadyLoggedIn.value = true
        setTimeout(() => {
          router.push('/admin')
        }, 1200)
      }
    }
  }).finally(() => {
    loginLoading.value = false
  })
}

const disabledLogin = computed(() => {
  if (username.value.length == 0 || password.value.length == 0 || alreadyLoggedIn.value) {
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
        <input class="inline-block w-full p-3 text-stone-800 rounded-md" type="text" id="username" v-model="username" placeholder="Username"><br>
        <label class="inline-block w-full p-2 text-stone-50" for="password">Password</label><br>
        <input class="inline-block w-full p-3 text-stone-800 rounded-md" type="password" id="password" v-model="password" placeholder="Password"><br><br>
        <Alert v-if="unauthorized" color="red" content="Incorrect username/email or password." />
        <Alert v-if="alreadyLoggedIn"  color="orange" content="You are already sign in." />
        <Button name="Sign in" color="blue" :loading="loginLoading" :disabled="disabledLogin" @click="login" size="large" class="float-right" />
      </form>
    </div>
  </div>
</template>
