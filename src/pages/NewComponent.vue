<script setup>
import axios from 'axios'
import { ref } from 'vue'
import Button from '@/components/Button.vue'
import ComponentEditor from '@/components/ComponentEditor.vue'

const component = ref({
  id: null,
  name: "",
  content: "",
})

const loading = ref(false)

function createComponent() {
  loading.value = true
  axios.post('/api/v1/page', )
}

</script>
<template>
  <div class="mb-4 flex justify-between">
    <div>
      <h2 :class="['transition-all duration-500 ease-in-out', component.name.length == 0 ? 'text-2xl': 'text-sm']">New Component</h2>
      <h2 class="text-2xl" v-if="component.name.length > 0">{{ component.name }}</h2>
    </div>
    <div>
      <Button :disabled="false" name="Create" color="blue" :loading="false" @click="" />
    </div>
  </div>
  <ComponentEditor
    v-model:value="component"
  />
</template>
