<script setup>
import { ref } from 'vue'
import Loader from '@/components/Loader.vue'

const loading = ref(false)

const props = defineProps({
  name: {
    type: String,
    default: "Button",
  },
  color: {
    type: String,
    default: 'slate',
  },
  loading: {
    type: Boolean,
    default: false,
  },
})

</script>
<template>
  <div :class="['rounded-lg inline-block p-2 m-1 select-none cursor-pointer text-slate-800', 'bg-' + props.color + '-300']">
    <Loader size="15px" v-if="props.loading" />
    <span class="p-2">
      {{ props.name }}
    </span>
  </div>
</template>
