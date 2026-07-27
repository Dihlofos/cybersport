<script setup>
const props = defineProps({
  title: { type: String, required: true },
  actions: { type: Array, default: () => [] },
  zones: { type: Array, default: () => [] },
  stations: { type: Array, default: () => [] },
})
</script>

<template>
  <section id="map" class="map">
    <!-- TODO: заполнить template -->
  </section>
</template>

<style lang="scss">
// TODO: заполнить стили
</style>
