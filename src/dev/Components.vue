<script setup>
import Button from '@/components/Button.vue'
import Dialog from '@/components/Dialog.vue'
import { useDialogStore } from '@/stores/dialog.js'

const dialogStore = useDialogStore()

function showDialog() {
  dialogStore.show({
    title: "Emin misiniz?",
    content: "Bu işlemi gerçekleştirmek istediğinizden emin misiniz?",
    buttons: [
      {
        name: "No",
        color: "orange",
        action: () => {

        },
      },
      {
        name: "Yes",
        color: "blue",
        action: () => {

        },
        keep: true,
      },
    ],
  })
}

</script>
<template>
  <h2>Button Colors</h2>
  <Button name="Default" />
  <Button name="Blue" color="blue" />
  <Button name="Green" color="green" />
  <Button name="Red" color="red" />
  <Button name="Orange" color="orange" />
  <Button name="Yellow" color="yellow" />
  <h2>Button with Loader</h2>
  <Button name="Sign in" color="blue" loading />
  <h2>Button Size</h2>
  <Button name="Large" size="large" loading />
  <Button name="Medium" :loading />
  <Button name="Small" size="small" loading />
  <h2>Disabled</h2>
  <Button name="Disabled" disabled />
  <Button name="Blue" color="blue" disabled />
  <Button name="Green" color="green" disabled />
  <Button name="Red" color="red" disabled />
  <Button name="Orange" color="orange" disabled />
  <Button name="Yellow" color="yellow" disabled />
  <h2>Dialog</h2>
  <Button name="Show Dialog" @click="showDialog()" />
</template>
