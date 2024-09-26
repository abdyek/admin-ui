<script setup>
import { ref } from 'vue'
import { useDialogStore } from '@/stores/dialog.js'
import Button from '@/components/Button.vue'

const store = useDialogStore()

function buttonClick(btn) {
  if (typeof btn.action == 'function') {
    btn.action()
  }

  if (btn.keep == undefined || btn.keep == false)  {
    store.shown = false
  }
}

</script>

<template>
  <div>
    <div v-if="store.shown" class="fixed inset-0 flex items-center justify-center bg-stone-800 bg-opacity-70">
      <div class="bg-stone-800 p-6 rounded-lg shadow-lg w-96">
        <h2 class="text-xl font-bold mb-4">{{ store.title }}</h2>
        <p class="mb-6">{{ store.content }}</p>
        <div class="flex justify-end">
          <div>
            <Button v-for="btn in store.buttons" @click="buttonClick(btn)" :name="btn.name" :color="btn.color" :size="btn.size" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
