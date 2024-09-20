<script setup>
import { computed } from 'vue'
import Loader from '@/components/Loader.vue'

const emit = defineEmits(['click'])

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
  size: {
    type: String,
    default: "medium",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
})

const size = computed(() => {
  if (props.size == 'medium') {
    return 'text-base p-2'
  } else if (props.size == 'small') {
    return 'text-sm p-1.5'
  } else if (props.size == 'large') {
    return 'text-lg p-3'
  }
})

const disabled = computed(() => {
  if (props.disabled) {
    return "opacity-50 cursor-default"
  } else {
    return "opacity-100 cursor-pointer"
  }
})

function click() {
  if (props.loading || props.disabled) {
    return
  }

  emit('click')
}

</script>
<template>
  <div :class="['rounded-lg inline-block m-1 select-none text-slate-800', 'bg-' + props.color + '-300', size, disabled]" @click="click">
    <Loader size="15px" v-if="props.loading" />
    <span class="p-2">
      {{ props.name }}
    </span>
  </div>
</template>
