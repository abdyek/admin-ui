<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const props = defineProps({
  page: Object,
})

</script>
<template>
  <div class="border-2 p-4 my-2 rounded-lg border-white border-solid grid grid-cols-4 gap-4 cursor-pointer" @click="router.push('/pages/' + props.page.id)">
    <span class="text-l">{{ props.page.name }}</span>
    <span class="text-l">.com/ {{ props.page.slug }}</span>
    <span class="text-l">{{ props.page.last_modified_at }}</span>
    <span class="text-l">{{ props.page.enabled}}</span>
  </div>
</template>
