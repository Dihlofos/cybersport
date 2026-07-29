<script setup lang="ts">
import { ref, onMounted } from 'vue'

const STORAGE_KEY = 'cyber-sport-cookie-modal-shown'

const isVisible = ref(false)

onMounted(() => {
  if (!localStorage.getItem(STORAGE_KEY)) {
    isVisible.value = true
  }
})

function accept() {
  isVisible.value = false
  localStorage.setItem(STORAGE_KEY, 'true')
}
</script>

<template>
  <div v-show="isVisible" class="cookie-modal">
    <div class="cookie-modal__text">
      <p>
        Продолжая пользоваться сайтом, вы&nbsp;соглашаетесь с&nbsp;условиями
        обработки cookie-файлов. Это необходимо для качественной работы сайта.
        Если вы&nbsp;не&nbsp;согласны, то&nbsp;установите специальные настройки
        в&nbsp;браузере.
      </p>
    </div>

    <button class="cookie-modal__close" @click="accept">
      <svg xmlns="http://www.w3.org/2000/svg" width="31" height="31" viewBox="0 0 31 31" fill="none">
        <path d="M1.41406 1.41418L29.4141 29.4142M29.4141 1.41418L1.41406 29.4142" stroke="#F32F0A" stroke-width="4"/>
      </svg>
    </button>
  </div>
</template>

<style lang="scss" scoped>
.cookie-modal {
  position: fixed;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
  display: flex;
  align-items: flex-start;
  gap: 1.6rem;
  background-color: $brown;
  color: $white;
  padding: 2.4rem 2.8rem;
  max-width: 76rem;
  border-radius: 13px;

  @media (max-width: $tablet) {
    max-width: 90%;
    right: auto;
    left: 50%;
    transform: translateX(-50%);
  }

  @media (max-width: $mobile) {
    left: 1rem;
    right: 1rem;
    max-width: unset;
    transform: none;
  }

  &__close {
    border: none;
    background: none;
    cursor: pointer;
  }

  &__text {

    p {
      font-family: $tektur;
      font-size: 1.4rem;
      font-style: normal;
      font-weight: 400;
      line-height: 1.3;
      margin: 0;

      @media (max-width: $mobile) {
        font-size: 1.4rem;
        line-height: 1.1;
      }
    }
  }
}
</style>
