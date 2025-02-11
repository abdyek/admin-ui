<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import { textToNumericScreamingSnakeCase } from '@/helpers/format.js'

const router = useRouter()

const component = defineModel("value", {
  default: {
    id: null,
    name: "",
    content: "",
  }
})

const shadowHost = ref(null)
const timeout = ref()
let shadowRoot = null

const contentTextarea = ref(null)

function resizeTextarea() {
  if (contentTextarea.value) {
    contentTextarea.value.style.height = 'auto'
    contentTextarea.value.style.height = `${contentTextarea.value.scrollHeight}px`
  }
}

onMounted(() => {
  if (shadowHost.value) {
    shadowRoot = shadowHost.value.attachShadow({ mode: 'closed' });
  }
})

function setName(e) {
  // NOTE: This is a hack. When user inputs any special character, for example ! or ?, component.value.name doesn't refreshed.
  component.value.name = e.target.value
  component.value.name = textToNumericScreamingSnakeCase(e.target.value)
}

function setContent(e) {
  component.value.content = e.target.value
  resizeTextarea()
  clearTimeout(timeout.value)
  timeout.value = setTimeout(() => {
    convert()
  }, 1000)
}

// TODO: Refactor it with using Composables https://vuejs.org/guide/reusability/composables.html
function convert() {
  axios.post("/api/v1/converter/umono-lang-to-html", {
    umono_lang: component.value.content,
  }).then((resp) => {
    shadowRoot.innerHTML = "<div style='background-color: white;'>" + resp.data.html + "</div>"
  }).catch((err) => {
    // TODO: We need a recovery solution
    if (err.response != undefined) {
      if (err.response.status == 401) {
        router.push('/admin/login')
      }
    }
  })
}

</script>
<template>
  <div class="flex flex-row pr-2">
    <input placeholder="Name" class="basis-1/2 h-7 text-slate-300 bg-slate-700 w-full block focus:ring focus:outline-none focus:ring-slate-400 p-2 rounded-md" @input="setName" @blur="component.name = component.name.replace(/^_+|_+$/g, '')" :value="component.name" />
  </div>
  <div class="grid grid-cols-2 gap-2">
    <div>
      <textarea ref="contentTextarea" placeholder="Content" :rows="10" class="text-slate-300 bg-slate-700 focus:ring focus:outline-none focus:ring-slate-400 p-2 w-full block mt-4 rounded-md resize-none overflow-hidden" :value="component.content" @input="setContent"></textarea>
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
