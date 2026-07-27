<script setup>
const props = defineProps({
  title: { type: String, required: true },
  subtitle: { type: String, default: '' },
  location: { type: String, default: '' },
  button: { type: Object, default: () => ({}) },
  backgroundImage: { type: String, default: '' },
  navItems: { type: Array, default: () => [] },
})
</script>

<template>
  <section id="hero" class="hero">
    <!-- TODO: заполнить template -->
  </section>
</template>

<style lang="scss">
// TODO: заполнить стили
</style>
