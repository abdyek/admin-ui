<script setup>
import axios from 'axios'
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Loader from '@/components/Loader.vue'
import Editor from '@/components/Editor.vue'

const router = useRouter()

const props = defineProps({
  id: String,
})

const loading = ref(false)
const firstForm = ref({})
const page = ref({
  id: null,
  name: "",
  slug: "",
  content: "",
})

onMounted(() => {
  load()
})

const changed = computed(() => {

  for (const key in page.value) {
    if (firstForm.value[key] != page.value[key]) {
      return true
    }
  }

  return false
})

function load() {
  loading.value = true
  axios.get('/api/v1/pages/' + props.id).then((resp) => {
    loading.value = false
    page.value = resp.data.page
    firstForm.value = { ...page.value }
  }).catch((err) => {
    console.log(err)
  })
}

function updatePage() {
  axios.put('/api/v1/pages', {
    page: page.value,
  }).then((resp) => {
    load()
  }).catch((err) => {
    // TODO: Handle the error
    console.log(err)
  })
}

function deletePage() {
  // TODO: Add a confirmation popup
  axios.delete('/api/v1/pages/' + props.id).then((resp) => {
    router.push('/pages')
  }).catch((err) => {
    // TODO: Handle the error
    console.log(err)
  })
}

</script>
<template>
  <div class="lg:container mx-auto">
    <div v-if="loading" class="grid place-items-center h-screen">
      <Loader size="150px" color="#333" />
    </div>
    <div v-else>
      <div class="mb-4 flex justify-between">
        <div>
          <h2 :class="['transition-all duration-500 ease-in-out', page.name.length == 0 ? 'text-2xl': 'text-sm']">Edit Page</h2>
          <h2 class="text-2xl" v-if="page.name.length > 0">{{ page.name}}</h2>
        </div>
        <div>
          <button class="inline rounded-lg p-2 ml-2 text-l bg-blue-200 text-slate-800" :disabled="!changed" @click="updatePage">Update</button>
          <button class="inline rounded-lg p-2 ml-2 text-l bg-red-200 text-slate-800" @click="deletePage">Delete</button>
        </div>
      </div>
      <Editor
        :page="page"
        @changePage="(p) => {page = p}"
        />
    </div>
  </div>
</template>
