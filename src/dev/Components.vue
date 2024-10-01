<script setup>
import Button from '@/components/Button.vue'
import Dialog from '@/components/Dialog.vue'
import Alert from '@/components/Alert.vue'
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
  <h2>Alert Colors</h2>
  <Alert content="Default" />
  <Alert content="Blue" color="blue" />
  <Alert content="Green" color="green" />
  <Alert content="Danger danger danger!!" color="red" />
  <Alert content="Orange" color="orange" />
  <Alert content="Yellow" color="yellow" />
  <h2>Alert with title</h2>
  <Alert title="404" content="Alert with title" color="red" />
  <h2>Alert Size</h2>
  <Alert size="large" content="Large" />
  <Alert size="medium" content="Medium" />
  <Alert size="small" content="Small" />
  <Alert size="large" content="Large with title" title="404" />
  <Alert size="medium" content="Medium with title" title="404" />
  <Alert size="small" content="Small with title" title="404" />
</template>
