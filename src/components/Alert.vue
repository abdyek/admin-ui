<script setup>
// TODO: Complete it
const props = defineProps({
  content: {
    type: String,
    default: "",
  }
})
</script>
<template>
  <span class="block text-stone-100 bg-red-600 p-5 rounded-lg mb-2">{{ props.content }}</span>
</template>
