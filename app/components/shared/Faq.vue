<script setup>
import { ref } from 'vue'
import { sanitizeText } from '~/utils/sanitize'

const props = defineProps({
  title: { type: String, required: true },
  items: { type: Array, required: true },
  images: {
    type: Object,
    default: () => ({}),
  },
})

const openState = ref({})

function toggle(index) {
  openState.value = { ...openState.value, [index]: !openState.value[index] }
}

function isOpen(index) {
  return !!openState.value[index]
}
</script>

<template>
  <section id="faq" class="faq">
    <Container>
      <h2 class="faq__title">{{ title }}</h2>
      <div class="faq__accordion">
        <div
          v-for="(item, index) in items"
          :key="index"
          class="faq__item"
        >
          <button
            class="faq__toggler"
            :class="{ active: isOpen(index) }"
            :aria-expanded="isOpen(index)"
            :aria-controls="`faq-content-${index}`"
            @click="toggle(index)"
          >
            <span class="faq__question">{{ item.question }}</span>
            <span class="faq__icon" aria-hidden="true">
              <img
                v-show="!isOpen(index)"
                src="/images/faq/arrow-down-new.svg"
                alt=""
                width="29"
                height="45"
              />
              <img
                v-show="isOpen(index)"
                src="/images/faq/arrow-right.svg"
                alt=""
                width="29"
                height="45"
                class="faq__arrow--open"
              />
            </span>
          </button>

          <div
            :id="`faq-content-${index}`"
            class="faq__content"
            :class="{ active: isOpen(index) }"
            role="region"
          >
            <p v-html="sanitizeText(item.answer)"></p>
          </div>
        </div>
      </div>
    </Container>
  </section>
</template>

<style lang="scss" scoped>
.faq {
  background-color: $darkBlue;
  padding: 8.2rem 0 10rem;

  @media (max-width: $mobile) {
    padding: 5rem 0 6rem;
  }

  &__title {
    font-family: $unbounded;
    font-size: 4.2rem;
    font-weight: 400;
    line-height: 1;
    color: $light;
    text-transform: uppercase;
    margin: 0 0 4.6rem;

    @media (max-width: $tablet) {
      font-size: 3.2rem;
      margin: 0 0 4rem;
    }

    @media (max-width: $mobile) {
      font-size: 2.4rem;
      margin: 0 0 3rem;
    }
  }

  &__accordion {
    display: flex;
    flex-direction: column;
  }

  &__item {
    border-bottom: 1px solid $red;

    &:first-child {
      border-top: 1px solid $red;
    }
  }

  &__toggler {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    border: none;
    background: transparent;
    cursor: pointer;
    text-align: left;
    padding: 2.8rem 0;
    gap: 11.5rem;

    @media (max-width: $tablet) {
      gap: 3rem;
      padding: 2rem 0;
    }

    @media (max-width: $mobile) {
      gap: 1.5rem;
      padding: 1.5rem 0;
    }

    &:hover {
      opacity: 0.8;
    }
  }

  &__question {
    font-family: $tektur;
    font-size: 1.8rem;
    font-weight: 700;
    line-height: 1.3;
    color: $red;
    text-transform: uppercase;

    @media (max-width: $mobile) {
      font-size: 1.4rem;
    }
  }

  &__icon {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 4.5rem;
    height: 2.9rem;

    img {
      display: block;
      width: auto;
      height: 100%;
    }
  }

  &__arrow--open {
    transform: rotate(90deg);
  }

  &__content {
    display: none;

    &.active {
      display: block;
    }

    p {
      font-family: $tektur;
      font-size: 1.4rem;
      font-weight: 400;
      line-height: 1.5;
      color: $white;
      margin: 0;
      padding: 0 0 2.8rem;

      @media (max-width: $mobile) {
        padding: 0 0 2rem;
      }
    }
  }
}
</style>
