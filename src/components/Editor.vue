<script setup>
import { ref, computed, watch } from 'vue'
import Alert from '@/components/Alert.vue'
import { textToSlug, isValidSlug } from '@/helpers/slug.js'

const emit = defineEmits(['changePage', 'checkValidation'])

const props = defineProps({
  page: {
    type: Object,
    default: {
      id: null,
      name: "",
      slug: "",
      content: "",
    },
  },
})

watch(() => props.page, (newVal, oldVal) => {
  emit('checkValidation', checkValidation())
});

const firstBlurNameField = ref(false)
const firstBlurSlugField = ref(false)

const showSlug = computed(() => {
  if (props.page.slug.length > 0) {
    return true
  }

  return false
})

const slug = computed(() => {
  // TODO: .com will be dynamic
  return ".com/" + props.page.slug
})

const invalidName = computed(() => {
  return props.page.name == ""
})

const invalidSlug = computed(() => {
  return !isValidSlug(props.page.slug)
})

function changeName(e) {
  emit('changePage', {
    ...props.page,
    name: e.target.value,
    slug: textToSlug(e.target.value),
  })
}

function changeSlug(e) {
  emit('changePage', {
    ...props.page,
    slug: e.target.value,
  })
}

function changeContent(e) {
  emit('changePage', {
    ...props.page,
    content: e.target.value,
  })
}

function checkValidation() {
  if (invalidName.value) {
    return false
  }

  if (invalidSlug.value) {
    return false
  }

  return true
}

</script>
<template>
  <input placeholder="Name" class="h-7 text-slate-300 bg-slate-700 w-full block focus:ring focus:outline-none focus:ring-slate-400  p-2 rounded-md mb-3" :value="props.page.name" @input="changeName" @blur="firstBlurNameField = true" />
  <Alert v-if="firstBlurNameField && invalidName" content="Invalid page name!" color="orange" />
    <transition
      name="slide-up"
      enter-active-class="transition-transform duration-500 ease-in-out"
      leave-active-class="transition-transform duration-100 ease-in-out"
      enter-from-class="translate-y-full opacity-0"
      leave-to-class="translate-y-full opacity-0"
    >
    <span class="block" v-if="showSlug">{{ slug }}</span>
  </transition>
  <input placeholder="Slug" class="h-7 text-slate-300 bg-slate-700 w-full block focus:ring focus:outline-none focus:ring-slate-400  p-2 rounded-md mb-3" :value="props.page.slug" @input="changeSlug" @blur="firstBlurSlugField = true"/>
  <Alert v-if="firstBlurSlugField && invalidSlug" content="Invalid page slug!" color="orange"/>
  <div class="grid grid-cols-2 gap-2">
    <div class="h-[calc(100vh-18rem)]">
      <textarea placeholder="Content" class="text-slate-300 bg-slate-700 focus:ring focus:outline-none focus:ring-slate-400 p-2 w-full block mt-4 rounded-md resize-none h-full" :value="props.page.content" @input="changeContent"></textarea>
    </div>
    <div>Here is HTML output</div>
  </div>
</template>

