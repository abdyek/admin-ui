<script setup>
import { ref }from 'vue'
import axios from 'axios'

const loading = ref(false)

function login() {
  loading.value = true

  // TODO: Complete it
}

</script>
<template>
<div class="bg-lime-100">
  <div class="lg:container mx-auto">
    <div class="grid place-items-center h-screen">
      <form class="w-96">
        <label class="inline-block w-full p-2 text-slate-800" for="username">Username or Email</label><br>
        <input class="inline-block w-full p-3 text-slate-800" type="text" id="username"><br>
        <label class="inline-block w-full p-2 text-slate-800" for="password">Password</label><br>
        <input class="inline-block w-full p-3 text-slate-800" type="password" id="password"><br><br>
        <button class="float-right p-4 bg-slate-800 text-slate-50 rounded-lg" type="button" @click="login">Login</button>
      </form>
    </div>
  </div>
</div>
</template>
