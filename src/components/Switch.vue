<script setup>
import { ref, defineModel, computed } from 'vue'

const props = defineProps({
  name: {
    type: String,
    default: "",
  },
  color: {
    type: String,
  },
})

const value = defineModel({ default: false })

const switchInput = ref(null)

function toggle() {
  switchInput.value.focus()
  value.value = !value.value
}

// TODO: Refactor it
const bgColor = computed(() => {
  if (props.color == "blue") {
    return {
      checked: "peer-checked:bg-blue-300",
      ring: "peer-focus:ring-blue-100",
    }
  } else if (props.color == "green") {
    return {
      checked: "peer-checked:bg-green-300",
      ring: "peer-focus:ring-green-100",
    }
  } else if (props.color == "red") {
    return {
      checked: "peer-checked:bg-red-300",
      ring: "peer-focus:ring-red-100",
    }
  } else if (props.color == "orange") {
    return {
      checked: "peer-checked:bg-orange-300",
      ring: "peer-focus:ring-orange-100",
    }
  } else if (props.color == "yellow") {
    return {
      checked: "peer-checked:bg-yellow-300",
      ring: "peer-focus:ring-yellow-100",
    }
  } else {
    return {
      checked: "",
      ring: "",
    }
  }
})

</script>
<template>
  <div class="inline-block m-2">
    <div class="flex items-center">
      <label class="mr-3 text-sm font-medium" @click="toggle">{{ props.name }}</label>

      <div class="relative" @click="toggle">
        <input ref="switchInput" type="checkbox" class="sr-only peer" :checked="value">
        
        <div :class="['w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 rounded-full transition-all', bgColor.checked, bgColor.ring]"></div>

        <div class="absolute top-[2px] left-[2px] bg-white border border-gray-300 h-5 w-5 rounded-full transition-all peer-checked:translate-x-full peer-checked:border-white"></div>
      </div>
    </div>
  </div>
</template>
