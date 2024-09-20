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
  <h2>With Loader</h2>
  <Button name="Sign in" color="blue" :loading="true" />
</template>
