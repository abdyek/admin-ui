<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const props = defineProps({
  comp: Object,
})

</script>
<template>
  <div class="border-2 p-4 my-2 rounded-lg border-white border-solid grid grid-cols-2 gap-4 cursor-pointer" @click="router.push('/admin/components/' + props.comp.id)">
    <span class="text-l">{{ props.comp.name }}</span>
    <span class="text-l">{{ props.comp.last_modified_at }}</span>
  </div>
</template>
