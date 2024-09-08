<script setup>
import { ref } from 'vue'

const title = ref('')
const slug = ref('')

</script>
<template>
  <span class="block text-slate-100">{{ title }}</span>
  <input placeholder="Title" class="text-slate-800 w-full block p-2 rounded-md" v-model="title" />
  <span class="block">{{ slug }}</span>
  <input placeholder="Slug" class="text-slate-800 w-full block p-2 mt-4 rounded-md" v-model="slug" />
  <div class="grid grid-cols-2 gap-2">
    <div class="h-[calc(100vh-18rem)]">
      <textarea class="text-slate-800 w-full block mt-4 rounded-md resize-none h-full">
      </textarea>
    </div>
    <div>F</div>
  </div>
</template>
