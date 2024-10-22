<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const props = defineProps({
  page: Object,
})

</script>
<template>
  <div class="border-2 p-4 my-2 rounded-lg border-white border-solid grid grid-cols-4 gap-4 cursor-pointer" @click="router.push('/admin/pages/' + props.page.id)">
    <span class="text-l">{{ props.page.name }}</span>
    <a class="text-l text-blue-400" v-if="props.page.enabled" @click.stop="" :href="'/' + props.page.slug" target="_blank">/{{ props.page.slug }}</a>
    <span class="text-l" v-else>/{{ props.page.slug }}</span>
    <span class="text-l">{{ props.page.last_modified_at }}</span>
    <span class="text-l">{{ props.page.enabled}}</span>
  </div>
</template>
