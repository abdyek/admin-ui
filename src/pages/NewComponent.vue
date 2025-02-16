<script setup>
import axios from 'axios'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Button from '@/components/Button.vue'
import ComponentEditor from '@/components/ComponentEditor.vue'
import { useDialogStore } from '@/stores/dialog.js'

const router = useRouter()
const dialogStore = useDialogStore()

const comp = ref({
  id: null,
  name: "",
  content: "",
})

const loading = ref(false)
const validToCreate = ref(false)

function createComp() {
  loading.value = true
  axios.post('/api/v1/components', {
    component: comp.value,
  }).then((resp) => {
    router.push('/admin/components/' + resp.data.component.id)
  }).catch((err) => {
    if (err.response != undefined) {
      if (err.response.status == 401) {
        router.push('/admin/login')
      } else if (err.response.status == 409) {
        dialogStore.show({
          title: "Already Used",
          content: "The component name is already used.",
          buttons: [{ name: "OK" }],
        })
      }
    }
  }).finally(() => {
    loading.value = false
  })
}

</script>
<template>
  <div class="mb-4 flex justify-between">
    <div>
      <h2 :class="['transition-all duration-500 ease-in-out', comp.name.length == 0 ? 'text-2xl': 'text-sm']">New Component</h2>
      <h2 class="text-2xl" v-if="comp.name.length > 0">{{ comp.name }}</h2>
    </div>
    <div>
      <Button :disabled="!validToCreate" name="Create" color="blue" :loading="loading" @click="createComp" />
    </div>
  </div>
  <ComponentEditor
    v-model:value="comp"
    v-model:valid="validToCreate"
  />
</template>
