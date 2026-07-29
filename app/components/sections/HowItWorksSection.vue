<script setup>
import { sanitizeText } from '~/utils/sanitize'

defineProps({
  title: { type: String, required: true },
  decorLeft: { type: String, default: '' },
  decorRight: { type: String, default: '' },
  steps: { type: Array, default: () => [] },
  button: { type: Object, default: () => ({}) },
})
</script>

<template>
  <section id="how-it-works" class="how-it-works">


    <Container>
      <h2 class="how-it-works__title">{{ title }}</h2>

      <div class="how-it-works__grid">
        <div
          v-for="(step, index) in steps"
          :key="index"
          class="how-it-works__card"
        >
          <p class="how-it-works__number">{{ step.number }}.</p>
          <h3 class="how-it-works__step-title">{{ step.title }}</h3>
          <p class="how-it-works__step-text" v-html="sanitizeText(step.text)" />
        </div>
      </div>

      <div class="how-it-works__actions">
        <Image
          v-if="decorLeft"
          :src="decorLeft"
          alt=""
          class="how-it-works__decor how-it-works__decor--left"
          width="174"
          height="165"
        />
        <a
          :href="button.link"
          class="how-it-works__btn"
        >
          {{ button.text }}
        </a>
        <Image
          v-if="decorRight"
          :src="decorRight"
          alt=""
          class="how-it-works__decor how-it-works__decor--right"
          width="174"
          height="165"
        />
      </div>
    </Container>


  </section>
</template>

<style lang="scss">
.how-it-works {
  position: relative;
  padding: 8.6rem 0 11rem;
  background-color: $blue;
  overflow: hidden;


  .container {
    position: relative;
    z-index: 2;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  // ──────────────────────────────────────────────
  // Декоративные элементы
  // ──────────────────────────────────────────────
  &__decor {
    position: absolute;
    pointer-events: none;
    user-select: none;
    z-index: 0;

    &--left {
      bottom: -7.5rem;
      left: -12.5rem;
    }

    &--right {
      top: -7rem;
      right: -12.9rem;
    }

    @media (max-width: $tablet) {
      display: none;
    }
  }

  // ──────────────────────────────────────────────
  // Заголовок
  // ──────────────────────────────────────────────
  &__title {
    font-family: $unbounded;
    font-size: 4.2rem;
    font-weight: 400;
    line-height: 1;
    color: $light;
    text-transform: uppercase;
    text-align: center;
    margin: 0 0 6.7rem;

    @media (max-width: $tablet) {
      font-size: 3.2rem;
      margin: 0 0 5rem;
    }

    @media (max-width: $mobile) {
      font-size: 2.4rem;
      margin: 0 0 3rem;
    }
  }

  // ──────────────────────────────────────────────
  // Сетка карточек
  // ──────────────────────────────────────────────
  &__grid {
    display: flex;
    gap: 4rem;

    @media (max-width: $laptop) {
      flex-wrap: wrap;
      justify-content: center;
    }

    @media (max-width: $tablet) {
      gap: 2.4rem;
    }

    @media (max-width: $mobile) {
      flex-direction: column;
      align-items: center;
      gap: 1.6rem;
    }
  }

  // ──────────────────────────────────────────────
  // Карточка шага
  // ──────────────────────────────────────────────
  &__card {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    background-color: $darkBlue;
    border-radius: 1.3rem;
    padding: 1.9rem 1.8rem 1.6rem;
    min-height: 24.2rem;

    @media (max-width: $laptop) {
      flex: 0 1 calc(50% - 2rem);
      min-width: 26rem;
    }

    @media (max-width: $mobile) {
      flex: 1 1 100%;
      min-width: 0;
      min-height: auto;
      padding: 1.2rem 1.6rem 2.4rem;
    }
  }

  &__number {
    font-family: $tektur;
    font-size: 5rem;
    font-weight: 700;
    line-height: 1;
    color: $red;
    text-transform: uppercase;
    margin: 0 0 1.3rem;

    @media (max-width: $mobile) {
      font-size: 4rem;
    }
  }

  &__step-title {
    font-family: $tektur;
    font-size: 1.8rem;
    font-weight: 700;
    line-height: 1;
    color: $red;
    text-transform: uppercase;
    margin: 0 0 1.7rem;
    display: flex;
    align-items: flex-start;

    @media (max-width: $mobile) {
      font-size: 1.6rem;
      height: auto;
    }
  }

  &__step-text {
    font-family: $tektur;
    font-size: 1.4rem;
    font-weight: 400;
    line-height: 1.25;
    color: #e0e2e3;
    margin: 0;
    flex: 1;

    :deep(b) {
      font-weight: 700;
      color: #e0e2e3;
    }

    @media (max-width: $mobile) {
      font-size: 1.3rem;
    }
  }

  // ──────────────────────────────────────────────
  // Кнопка
  // ──────────────────────────────────────────────
  &__actions {
    display: inline-block;
    justify-content: center;
    position: relative;
    margin: 11rem 0 0;

    @media (max-width: $tablet) {
      margin-top: 6rem;
    }

    @media (max-width: $mobile) {
      margin-top: 4rem;
    }
  }

  &__btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 1.5rem 3rem;
    border: none;
    border-radius: 1.3rem;
    background-color: $red;
    font-family: $tektur;
    font-size: 4.2rem;
    font-weight: 400;
    line-height: 1;
    color: $white;
    text-transform: uppercase;
    text-decoration: none;
    cursor: pointer;
    transition: opacity 0.2s;

    &:hover {
      opacity: 0.85;
    }

    @media (max-width: $tablet) {
      font-size: 2.8rem;
      padding: 0.8rem 2rem;
    }

    @media (max-width: $mobile) {
      font-size: 2rem;
      padding: 0.6rem 1.6rem;
    }
  }
}
</style>
