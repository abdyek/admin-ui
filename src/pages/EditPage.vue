<script setup>
import axios from 'axios'
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import Loader from '@/components/Loader.vue'
import Editor from '@/components/Editor.vue'
import Button from '@/components/Button.vue'
import Switch from '@/components/Switch.vue'
import { useDialogStore } from '@/stores/dialog.js'

const router = useRouter()
const dialogStore = useDialogStore()

const props = defineProps({
  id: String,
})

const loading = ref(false)
const updateLoading = ref(false)
const deleteLoading = ref(false)

const firstForm = ref({})
const validToUpdate = ref(true)
const page = ref({
  id: null,
  name: "",
  slug: "",
  content: "",
  enabled: false,
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
    if (err.response != undefined) {
      if (err.response.status == 401) {
        router.push('/admin/login')
      }
    }
  })
}

function updatePage() {
  updateLoading.value = true
  axios.put('/api/v1/pages', {
    page: page.value,
  }).then((resp) => {
    load()
  }).catch((err) => {
    if (err.response != undefined) {
      if (err.response.status == 401) {
        router.push('/admin/login')
      }
    }
  }).finally(() => {
    updateLoading.value = false
  })
}

function deletePage() {
  // TODO: Add a confirmation popup
  dialogStore.show({
    title: "Are you sure?",
    content: "Are you sure you want to delete this page?",
    buttons: [
      { name: "No" },
      {
        name: "Delete",
        color: "red",
        action: () => {
          deleteLoading.value = true
          axios.delete('/api/v1/pages/' + props.id).then((resp) => {
            router.push('/admin/pages')
          }).catch((err) => {
            if (err.response != undefined) {
              if (err.response.status == 401) {
                router.push('/admin/login')
              }
            }
          }).finally(() => {
            deleteLoading.value = false
          })
        },
      },
    ],
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
          <Switch color="blue" name="Enabled" v-model="page.enabled" />

          <Button name="Update" color="blue" :loading="updateLoading" :disabled="!validToUpdate || !changed" @click="updatePage" />
          <Button name="Delete" color="red" :loading="deleteLoading" @click="deletePage" />
        </div>
      </div>
      <Editor
        v-model:value="page"
        v-model:valid="validToUpdate"
        :editMode="true"
        />
    </div>
  </div>
</template>
