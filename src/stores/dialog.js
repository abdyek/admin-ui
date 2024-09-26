import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useDialogStore = defineStore('dialog', () => {

  const shown = ref(false)
  const title = ref("")
  const content = ref("")
  const buttons = ref([])

  function show(params = {
    title: "",
    content: "",
    buttons: [],
  }) {
    shown.value = true
    title.value = params.title
    content.value = params.content
    buttons.value = params.buttons
  }

  return {
    shown,
    show,
    title,
    content,
    buttons,
  }
})
