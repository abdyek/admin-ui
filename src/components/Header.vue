<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import Button from '@/components/Button.vue'
import Menu from '@/components/Menu.vue'
import { useDialogStore } from '@/stores/dialog.js'

const router = useRouter()
const dialogStore = useDialogStore()

const logoutLoading = ref(false)

function logout() {
  dialogStore.show({
    title: "Are you sure?",
    content: "Are you sure you want to sign out?",
    buttons: [
      { name: "No" },
      {
        name: "Sign out",
        color: "orange",
        action: () => {
          logoutLoading.value = true
          axios.post('/api/v1/logout').then((resp) => {
            router.push('/admin/login')
          }).catch((err) => {
            if (err.response.status == 401) {
              dialogStore.show({
                title: "Already Sign Out",
                content: "You are already sign out.",
                buttons: [
                  {
                    name: "OK",
                    color: "orange",
                    action: () => {
                      router.push("/admin/login")
                    },
                  },
                ],
              })
            }
          }).finally(() => {
            logoutLoading.value = false
          })
        },
      },
    ],
  })
}

</script>
<template>
  <div class="flex justify-between items-end mb-8 h-20 text-stone-50">
    <div class="flex items-end">
      <h1 class="text-5xl cursor-pointer mr-4" @click="router.push('/admin')">Umono</h1>
      <Menu />
    </div>
    <div>
      <Button name="Sign out" color="orange" size="small" @click="logout" :loading="logoutLoading" />
    </div>
  </div>
</template>
