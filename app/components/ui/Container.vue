<script setup>
const props = defineProps({
  narrow: { type: Boolean, default: false },
  wide: { type: Boolean, default: false },
})
</script>

<template>
  <div
    :class="['container', {
      'container--narrow': narrow,
      'container--wide': wide,
    }]"
  >
    <slot />
  </div>
</template>

<style lang="scss">
.container {
  @include container;

  &--narrow {
    @include container(80rem);
  }

  &--wide {
    @include container(127rem);
  }
}
</style>
