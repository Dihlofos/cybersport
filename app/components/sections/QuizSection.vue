<script setup>
import { sanitizeText } from '~/utils/sanitize'

defineProps({
  title: { type: String, required: true },
  text: { type: String, default: '' },
  decor: { type: String, default: '' },
  iframe: { type: String, default: '' },
})

const isOpen = ref(false)
</script>

<template>
  <section id="quiz" class="quiz">
    <Container>
      <div class="quiz__content">
        <div class="quiz__text">
          <div class="quiz__top">
            <h2 class="quiz__title" v-html="sanitizeText(title)"></h2>
            <p v-if="text" class="quiz__paragraph" v-html="sanitizeText(text)"></p>
          </div>
          <Button class="quiz__toggle" @click="isOpen = !isOpen">
            {{ isOpen ? 'Скрыть' : 'Показать' }}
          </Button>
          <Image
            :src="decor"
            alt=""
            class="quiz__decor"
            width="1920"
            height="100"
          />
        </div>
        <div class="quiz__iframe" :class="{ 'quiz__iframe--open': isOpen }">
          <iframe id="victorina" title="Victorina" width="100%" height="100%" :src="iframe"> </iframe>
        </div>
      </div>
    </Container>
  </section>
</template>

<style lang="scss">
.quiz {
  position: relative;
  background-color: $darkBlue;
  padding: 8.2rem 0 15rem;

  @media (max-width: $mobile) {
    padding: 5rem 0 0;
  }

  .container {
    position: relative;
  }

  &__top {
    position: relative;
    z-index: 2;
    display: flex;
    gap: 7rem;
  }

  &__decor {
    position: absolute;
    top: 7rem;
    left: 50%;
    transform: translateX(-50%);
    display: block;
    width: 100%;
    height: auto;
    margin-top: 4rem;
    user-select: none;
    pointer-events: none;
    z-index: 0;
  }

  &__title {
    font-family: $unbounded;
    font-size: 4.2rem;
    font-weight: 400;
    line-height: 1;
    color: $light;
    text-transform: uppercase;
    margin: 0 0 2rem;

    @media (max-width: $tablet) {
      font-size: 3.2rem;
    }

    @media (max-width: $mobile) {
      font-size: 2.4rem;
    }
  }

  &__text {
    a {
      color: currentColor;
      text-decoration: underline;
    }
  }

  &__paragraph {
    font-family: $tektur;
    font-size: 1.6rem;
    line-height: 1.3;
    color: $white;
    max-width: 66.6rem;
    margin: 0 0 6rem;

    @media (max-width: $mobile) {
      font-size: 1.4rem;
    }
  }

  &__toggle {
    display: block;
    position: relative;
    z-index: 2;
    margin: 0 auto 4rem;
    font-size: 2.8rem;
    width: 38rem;
  }

  &__iframe {
    position: relative;
    z-index: 2;
    height: 0;
    overflow: hidden;
    transition: all 0.4s ease;
    border-radius: 30px;
    background-color: #fff;


    iframe {
      border: none;
    }


    &--open {
      height: 60rem;
      padding: 2rem;
    }
  }
}
</style>
