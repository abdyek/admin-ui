<script setup>
import { computed } from 'vue'

const props = defineProps({
  title: {
    type: String,
    default: null,
  },
  content: {
    type: String,
    default: "",
  },
  color: {
    type: String,
    default: 'slate',
  },
  size: {
    type: String,
    default: "medium",
  },
})

const size = computed(() => {
  if (props.size == 'medium') {
    return {
      title: 'text-xl',
      content: 'text-base',
      box: 'p-2'
    }
  } else if(props.size == 'small') {
    return {
      title: 'text-lg',
      content: 'text-sm',
      box: 'p-1.5'
    }
  } else if (props.size == 'large') {
    return {
      title: 'text-3xl',
      content: 'text-lg',
      box: 'p-3'
    }
  }
})

</script>
<template>
  <span :class="['block text-slate-800 rounded-md my-3', 'bg-' + props.color + '-300', size.box]">
    <span v-if="props.title != null" :class="['text-xl block', size.title]">404</span>
    <span :class="[size.content]">{{ props.content }}</span>
  </span>
</template>
