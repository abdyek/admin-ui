<script setup>
import axios from 'axios'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import ComponentEditor from '@/components/ComponentEditor.vue'
import Button from '@/components/Button.vue'
import Loader from '@/components/Loader.vue'
import { useDialogStore } from '@/stores/dialog.js'

const router = useRouter()
const dialogStore = useDialogStore()

const props = defineProps({
  id: String,
})

const loading = ref(true)
const updateLoading = ref(false)
const deleteLoading = ref(false)

const comp = ref({
  id: null,
  name: "",
  content: "",
})

onMounted(() => {
  load()
})

function load() {
  loading.value = true
  axios.get('/api/v1/components/' + props.id).then((resp) => {
    loading.value = false
    comp.value = resp.data.component
  }).catch((err) => {
    if (err.response != undefined) {
      if (err.response.status == 401) {
        router.push('/admin/login')
      }
    }
  })
}

function updateComp() {
  updateLoading.value = true
  axios.put('/api/v1/components', {
    component: comp.value,
  }).then((resp) => {
    load()
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
    updateLoading.value = false
  })
}

function deleteComp() {
  dialogStore.show({
    title: 'Are you sure?',
    content: 'Are you sure you want to delete this component?',
    buttons: [
      { name: 'No' },
      {
        name: 'Delete',
        color: 'red',
        action: () => {
          deleteLoading.value = true
          axios.delete('/api/v1/components/' + props.id).then((resp) => {
            router.push('/admin/components')
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
    ]
  })
}

</script>
<template>
  <div v-if="loading" class="grid place-items-center h-screen">
    <Loader size="150px" color="#333" />
  </div>
  <div v-else>
    <div class="mb-4 flex justify-between">
      <div>
        <h2 :class="['transition-all duration-500 ease-in-out', comp.name.length == 0 ? 'text-2xl': 'text-sm']">New Component</h2>
        <h2 class="text-2xl" v-if="comp.name.length > 0">{{ comp.name }}</h2>
      </div>
      <div>
        <Button :disabled="false" name="Update" color="blue" :loading="updateLoading" @click="updateComp" />
        <Button name="Delete" color="red" :loading="deleteLoading" @click="deleteComp" />
      </div>
    </div>
    <ComponentEditor
      v-model:value="comp"
      v-model:valid="validToCreate"
    />
  </div>
</template>
