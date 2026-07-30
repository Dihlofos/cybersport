<script setup lang="ts">
import { watch, nextTick, ref } from 'vue'
import { useModal } from '~/composables/useModal'

const modal = useModal()
const modalRef = ref<HTMLElement | null>(null)
const closeBtnRef = ref<HTMLButtonElement | null>(null)

function onOverlayClick(event: MouseEvent) {
  if (modalRef.value && !modalRef.value.contains(event.target as Node)) {
    modal.close()
  }
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    modal.close()
  }
}

watch(() => modal.isOpen.value, async (open) => {
  if (open) {
    await nextTick()
    closeBtnRef.value?.focus()
    document.addEventListener('keydown', onKeydown)
  } else {
    document.removeEventListener('keydown', onKeydown)
  }
})
</script>

<template>
  <Transition name="modal">
    <div
      v-if="modal.isOpen.value"
      class="modal-overlay"
      @click="onOverlayClick"
    >
      <div
        ref="modalRef"
        class="modal"
        role="dialog"
        aria-modal="true"
        :aria-labelledby="modal.options.value?.title ? 'modal-title' : undefined"
      >
        <button
          ref="closeBtnRef"
          class="modal__close"
          type="button"
          @click="modal.close"
          aria-label="Закрыть"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="31" height="31" viewBox="0 0 31 31" fill="none">
            <path d="M1.41406 1.41418L29.4141 29.4142M29.4141 1.41418L1.41406 29.4142" stroke="#F32F0A" stroke-width="4"/>
          </svg>
        </button>

        <template v-if="modal.options.value">
          <h2 id="modal-title" class="modal__title">
            {{ modal.options.value.title }}
          </h2>

          <div class="modal__content">
            <p v-if="modal.options.value.address" class="modal__address">
              {{ modal.options.value.address }}
            </p>

            <div
              v-for="(section, index) in modal.options.value.sections"
              :key="index"
              class="modal__section"
            >
              <img
                :src="`/images/icons/${section.icon}.svg`"
                alt=""
                width="24"
                height="24"
                class="modal__section-icon"
              />
              <div class="modal__section-body">
                <h3 class="modal__section-title">{{ section.title }}</h3>
                <p class="modal__section-text" v-html="section.text" />
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
  </Transition>
</template>

<style lang="scss" scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 1100;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5);
  padding: 2rem;
}

.modal {
  position: relative;
  background-color: $blue;
  border-radius: 13px;
  width: 100%;
  max-width: 76rem;
  padding: 4.2rem 5rem 4rem;
  max-height: 90vh;
  overflow-y: auto;

  @media (max-width: $mobile) {
    padding: 3rem 2rem 2.5rem;
  }

  &__close {
    position: absolute;
    top: 2rem;
    right: 2rem;
    border: none;
    background: none;
    cursor: pointer;
    padding: 0;
    line-height: 0;

    &:hover {
      opacity: 0.7;
    }

    @media (max-width: $mobile) {
      top: 1.5rem;
      right: 1.5rem;

      svg {
        width: 24px;
        height: 24px;
      }
    }
  }

  &__title {
    font-family: $unbounded;
    font-size: 4.2rem;
    font-weight: 400;
    line-height: 1;
    color: $light;
    text-transform: uppercase;
    margin: 0 0 3.2rem;

    @media (max-width: $tablet) {
      font-size: 3.2rem;
      margin: 0 0 2.5rem;
    }

    @media (max-width: $mobile) {
      font-size: 2.4rem;
      margin: 0 0 2rem;
      padding-right: 3rem;
    }
  }

  &__content {
    display: flex;
    flex-direction: column;
    gap: 2.6rem;
  }

  &__address {
    font-family: $tektur;
    font-size: 1.4rem;
    font-weight: 400;
    line-height: 1.3;
    color: $white;
    margin: 0 0 0.5rem;
  }

  &__section {
    display: flex;
    align-items: flex-start;
    gap: 1.3rem;
  }

  &__section-icon {
    flex-shrink: 0;
    display: block;
    margin-top: 0.2rem;
  }

  &__section-body {
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
  }

  &__section-title {
    font-family: $tektur;
    font-size: 1.8rem;
    font-weight: 700;
    line-height: 1.3;
    color: $red;
    text-transform: uppercase;
    margin: 0;

    @media (max-width: $mobile) {
      font-size: 1.6rem;
    }
  }

  &__section-text {
    font-family: $tektur;
    font-size: 1.4rem;
    font-weight: 400;
    line-height: 1.4;
    color: $white;
    margin: 0;
  }
}

// Transition
.modal-enter-active,
.modal-leave-active {
  transition: opacity 250ms ease, transform 250ms ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .modal,
.modal-leave-active .modal {
  transition: transform 250ms ease;
}

.modal-enter-from .modal {
  transform: scale(0.95);
}

.modal-leave-to .modal {
  transform: scale(0.95);
}
</style>
