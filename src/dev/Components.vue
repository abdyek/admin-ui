<script setup>
import Button from '@/components/Button.vue'

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
</template>
