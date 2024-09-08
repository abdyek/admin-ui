<script setup>
import { ref, onMounted } from 'vue'

// TODO: Completed it

const title = ref('')
const slug = ref('')

const titleEditing = ref(false)
const slugEditing = ref(false)

onMounted(() => {

  if (title.value.length == 0) {
    titleEditing.value = true
  }

  if (slug.value.length == 0) {
    slugEditing.value = true
  }
})

</script>
<template>
  <span class="block text-slate-100" v-if="!titleEditing">{{ title }}</span>
  <input placeholder="Title" class="text-slate-800 w-full block p-2 rounded-md" v-else v-model="title" @blur="titleEditing = false"/>
  <span class="block" v-if="!slugEditing">{{ slug }}</span>
  <input placeholder="Slug" class="text-slate-800 w-full block p-2 mt-4 rounded-md" v-else v-model="slug" @blur="slugEditing = false"/>
  <div class="grid grid-cols-2 gap-2">
    <div class="h-[calc(100vh-18rem)]">
      <textarea class="text-slate-800 w-full block mt-4 rounded-md resize-none h-full">
      </textarea>
    </div>
    <div>F</div>
  </div>
</template>
