<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import Alert from '@/components/Alert.vue'
import Loader from '@/components/Loader.vue'
import { textToSlug, isValidSlug } from '@/helpers/slug.js'

const router = useRouter()

const props = defineProps({
  editMode: {
    type: Boolean,
    default: false,
  },
})

const firstSlug = ref("")
const page = defineModel("value", {
  default: {
    id: null,
    name: "",
    slug: "",
    content: "",
    enabled: false,
  }
})

watch(() => page.value.slug, () => {
  valid.value = checkValidation()
})

const shadowHost = ref(null)
let shadowRoot = null

onMounted(() => {

  if (shadowHost.value) {
    shadowRoot = shadowHost.value.attachShadow({ mode: 'closed' });
  }

  firstSlug.value = page.value.slug

  convert()
})

const valid = defineModel("valid", {
  default: false,
})

const firstBlurNameField = ref(false)
const firstBlurSlugField = ref(false)

const slug = computed(() => {
  return "/" + page.value.slug
})

const invalidName = computed(() => {
  return page.value.name == ""
})

const invalidSlug = computed(() => {
  return !isValidSlug(page.value.slug)
})

function changeName(e) {
  if (!props.editMode) {
    page.value.slug = textToSlug(e.target.value)
    changeSlug()
  }
  valid.value = checkValidation()
}

function checkValidation() {
  if (invalidName.value || invalidSlug.value || unusableSlug.value || alreadyUsed.value || checkUsableLoading.value || slugTyping.value) {
    return false
  }

  return true
}

const timeout = ref()

function changeContent() {
  clearTimeout(timeout.value)
  timeout.value = setTimeout(() => {
    convert()
  }, 1000)
}

function convert() {
  axios.post("/api/v1/converter/umono-lang-to-html", {
    umono_lang: page.value.content,
  }).then((resp) => {
    shadowRoot.innerHTML = "<div style='background-color: white;'>" + resp.data.html + "</div>"
  }).catch((err) => {
    // TODO: We need a recovery solution
    if (err.response != undefined) {
      if (err.response.status == 401) {
        router.push('/admin/login')
      } else if (err.response.status == 404) {
        convertLegacy()
      }
    }
  })
}

function convertLegacy() {
  axios.post("/api/v1/converter/markdown-to-html", {
    markdown: page.value.content,
  }).then((resp) => {
    shadowRoot.innerHTML = "<div style='background-color: white;'>" + resp.data.html + "</div>"
  }).catch((err) => {
    if (err.response != undefined) {
      if (err.response.status == 401) {
        router.push('/admin/login')
      }
    }
  })
}

const slugTyping = ref(false)
function changeSlug() {
  valid.value = checkValidation()
  slugTyping.value = true
  clearTimeout(timeout.value)
  timeout.value = setTimeout(() => {
    slugTyping.value = false
    checkSlug()
  }, 1000)
}

const checkUsableLoading = ref(false)
const alreadyUsedSlug  = ref(false)
const unusableSlug = ref(false)

const alreadyUsed = computed(() => {
  if (firstSlug.value != page.value.slug && alreadyUsedSlug.value && !slugTyping.value && !checkUsableLoading.value) {
    return true
  }
  return false
})

function checkSlug() {
  checkUsableLoading.value = true
  axios.get("/api/v1/slug/check-usable/" + page.value.slug).then((resp) => {
    alreadyUsedSlug.value = resp.data.already_used
    unusableSlug.value = resp.data.unusable
    checkUsableLoading.value = false      
    valid.value = checkValidation()
  }).catch((err) => {

  })
}

</script>
<template>
  <div class="flex flex-row pr-2">
    <div class="basis-1/2">
      <input placeholder="Name" class="h-7 text-slate-300 bg-slate-700 w-full block focus:ring focus:outline-none focus:ring-slate-400  p-2 rounded-md mb-3" v-model="page.name" @blur="firstBlurNameField = true" @input="changeName" />
      <Alert v-if="firstBlurNameField && invalidName" content="Invalid page name!" color="orange" />
      <transition
        name="slide-up"
        enter-active-class="transition-transform duration-500 ease-in-out"
        leave-active-class="transition-transform duration-100 ease-in-out"
        enter-from-class="translate-y-full opacity-0"
        leave-to-class="translate-y-full opacity-0"
      >
        <span class="block my-3" v-if="!invalidSlug">{{ slug }} <Loader v-if="checkUsableLoading" size="18px" color="#eee"/></span>
      </transition>
      <input placeholder="Slug" class="h-7 text-slate-300 bg-slate-700 w-full block focus:ring focus:outline-none focus:ring-slate-400  p-2 rounded-md mb-3" v-model="page.slug" @blur="firstBlurSlugField = true" @input="changeSlug"/>
      <Alert v-if="firstBlurSlugField && invalidSlug" content="Invalid page slug!" color="orange"/>
      <Alert v-else-if="unusableSlug" content="This slug is unusable." color="orange"/>
      <Alert v-else-if="alreadyUsed" content="This slug already used for another page." color="orange"/>
    </div>
  </div>
  <div class="grid grid-cols-2 gap-2">
    <div class="h-[calc(100vh-18rem)]">
      <textarea placeholder="Content" class="text-slate-300 bg-slate-700 focus:ring focus:outline-none focus:ring-slate-400 p-2 w-full block mt-4 rounded-md resize-none h-full" v-model="page.content" @input="changeContent"></textarea>
    </div>
    <div>
      <div ref="shadowHost"  style="all: initial" />
    </div>
  </div>
</template>
<style scoped>
textarea {
  font-family: 'JetBrainsMono';
}
</style>
