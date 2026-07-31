<script setup>
const props = defineProps({
  variant: { type: String, default: 'primary' },
  size: { type: String, default: 'md' },
  disabled: { type: Boolean, default: false },
  to: { type: String, default: '' },
  type: { type: String, default: 'button' },
})
</script>

<template>
  <a
    v-if="to"
    :href="to"
    :class="['button', `button--${variant}`, `button--${size}`]"
  >
    <slot />
  </a>
  <button
    v-else
    :class="['button', `button--${variant}`, `button--${size}`]"
    :disabled="disabled"
    :type="type"
  >
    <slot />
  </button>
</template>

<style lang="scss">
.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 13px;
  transition: all 150ms ease;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  // --- Variants ---
  &--primary {
    display: inline-flex;
    color: $white;
    font-family: $tektur;
    font-size: 4.2rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    border-radius: 13px;
    border: none;
    background: $red;
    text-transform: uppercase;
    text-decoration: none;
    padding: 1rem 2.3rem;
    cursor: pointer;
    flex-shrink: 0;

    &:hover {
      background-color: $darkBlue;
      border-color: $darkBlue;
    }

    @media (max-width: $tablet) {
      border-width: 1px;
      border-radius: 6px;
      font-size: 2.2rem;
      padding: 0.5rem 0.8rem;
    }
  }

  &--primary--active {
    border: 2px solid $red;
    background: $red;
  }

  &--secondary {
    background-color: transparent;
    color: #0055ff;
    border: 2px solid #0055ff;

    &:hover:not(:disabled) {
      background-color: #0055ff;
      color: #fff;
    }
  }

  &--ghost {
    background-color: transparent;
    color: #1e293b;

    &:hover:not(:disabled) {
      background-color: #f8fafc;
    }
  }
}
</style>
