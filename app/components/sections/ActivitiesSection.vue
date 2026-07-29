<script setup>
const props = defineProps({
  title: { type: String, required: true },
  subtitle: { type: String, default: '' },
  decor: { type: String, default: '' },
  digital: { type: Array, default: () => [] },
  physical: { type: Array, default: () => [] },
  description: { type: String, default: '' },
  rewards: { type: Array, default: () => [] },
})
</script>

<template>
  <section id="activities" class="activities">
    <!-- TODO: заполнить template -->
  </section>
</template>

<style lang="scss">
// TODO: заполнить стили
</style>
