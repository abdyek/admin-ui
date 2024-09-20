<script setup>
import axios from 'axios'
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import Editor from '@/components/Editor.vue'
import Button from '@/components/Button.vue'

const router = useRouter()

const loading = ref(false)
const page = ref({
  id: null,
  name: "",
  slug: "",
  content: "",
})

const isPageEmpty = computed(() => {
  if (page.value.name != "") {
    return false
  }

  if (page.value.slug != "") {
    return false
  }

  if (page.value.content != "") {
    return false
  }

  return true
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
    <Button :disabled="isPageEmpty" name="Create" color="blue" @click="createPage" :loading="loading" />
  </div>
  <Editor
    :page="page"
    @changePage="(p) => {page = p}"
  />
</template>
