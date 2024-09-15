<script setup>
import { ref, computed } from 'vue'
import Editor from '@/components/Editor.vue'

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
  console.log("creating code here..")
}

</script>
<template>
  <div class="mb-4 flex justify-between">
    <div>
      <h2 :class="['transition-all duration-500 ease-in-out', page.name.length == 0 ? 'text-2xl': 'text-sm']">New Page</h2>
      <h2 class="text-2xl" v-if="page.name.length > 0">{{ page.name}}</h2>
    </div>
    <button class="inline rounded-lg p-2 mx-2 text-l bg-blue-200 text-slate-800" :disabled="isPageEmpty" @click="createPage">Create</button>
  </div>
  <Editor
    :page="page"
    @changePage="(p) => {page = p}"
  />
</template>
