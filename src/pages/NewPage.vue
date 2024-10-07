<script setup>
import axios from 'axios'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Editor from '@/components/Editor.vue'
import Button from '@/components/Button.vue'
import Switch from '@/components/Switch.vue'

const router = useRouter()

const loading = ref(false)
const validToCreate = ref(false)
const page = ref({
  id: null,
  name: "",
  slug: "",
  content: "",
  enabled: false,
})

function createPage() {
  loading.value = true
  axios.post('/api/v1/pages', {
    page: page.value,
  }).then((resp) => {
    router.push('/pages/' + resp.data.page.id)
  }).catch((err) => {
    console.log(err)
    // TODO: Handle the error
  }).finally(() => {
    loading.value = false
  })
}

</script>
<template>
  <div class="mb-4 flex justify-between">
    <div>
      <h2 :class="['transition-all duration-500 ease-in-out', page.name.length == 0 ? 'text-2xl': 'text-sm']">New Page</h2>
      <h2 class="text-2xl" v-if="page.name.length > 0">{{ page.name}}</h2>
    </div>
    <div>
      <Switch color="blue" name="Enabled" v-model="page.enabled" />
      <Button :disabled="!validToCreate" name="Create" color="blue" @click="createPage" :loading="loading" />
    </div>
  </div>
  <Editor
    v-model:value="page"
    v-model:valid="validToCreate"
  />
</template>
