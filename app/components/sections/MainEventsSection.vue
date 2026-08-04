<script setup>
import { sanitizeText } from '~/utils/sanitize'
defineProps({
  title: { type: String, required: true },
  decorRight: { type: String, default: '' },
  decorLeft: { type: String, default: '' },
  events: { type: Array, default: () => [] },
  bottom: { type: Object, default: () => ({}) },
})
</script>

<template>
  <section id="main-events" class="main-events">
    <Container>
      <!-- Декоративные элементы -->
      <Image
        v-if="decorLeft"
        :src="decorLeft"
        alt=""
        class="main-events__decor main-events__decor--left"
        width="200"
        height="240"
      />
      <Image
        v-if="decorRight"
        :src="decorRight"
        alt=""
        class="main-events__decor main-events__decor--right"
        width="200"
        height="280"
      />

      <h2 class="main-events__title">{{ title }}</h2>

      <!-- Карточки событий -->
      <div class="main-events__grid">
        <article
          v-for="(event, index) in events"
          :class="{['main-events__card--' + index]: true }"
          :key="index"
          class="main-events__card"
        >
          <div class="main-events__card-inner">
            <div class="main-events__card-image">
              <Image
                :src="event.image"
                :alt="event.game"
                class="main-events__card-img"
                width="160"
                height="231"
              />
            </div>

            <div class="main-events__card-info">
              <div class="main-events__card-heading">
                <h3 class="main-events__game">{{ event.game }}</h3>
                <p class="main-events__subtitle">{{ event.subtitle }}</p>
              </div>
              <p class="main-events__desc">{{ event.description }}</p>
              <p class="main-events__prize">{{ event.prize }}</p>
            </div>
          </div>

          <div
            v-for="(reg, regIndex) in event.registrations"
            :key="regIndex"
            class="main-events__card-bottom"
            :class="{['main-events__card-bottom--' + regIndex]: true }"
          >
            <div v-if="reg.subtitle" class="main-events__card-bottom-subtitle">{{ reg.subtitle }}</div>
            <a
              v-if="reg.text"
              :href="reg.link ? reg.link : undefined"
              class="main-events__reg-btn"
              target="_blank"
              :class="{ disabled: reg.disabled }"
            >
              {{ reg.text }}
            </a>
            <p v-if="reg.deadline" class="main-events__deadline">{{ reg.deadline }}</p>
            <div v-if="reg.involved" class="main-events__card-bottom-involved" v-html="sanitizeText(reg.involved)"></div>
          </div>
        </article>
      </div>

      <!-- Нижний блок — Звёздный шоу-матч -->
      <div class="main-events__showmatch">
        <div class="main-events__showmatch-image main-events__showmatch-image--left">
          <Image
            :src="bottom.imageLeft"
            alt=""
            class="main-events__showmatch-img"
            width="300"
            height="183"
          />
        </div>

        <div class="main-events__showmatch-content">
          <h3 class="main-events__showmatch-game">{{ bottom.game }}</h3>
          <p class="main-events__showmatch-subtitle">{{ bottom.subtitle }}</p>
          <p class="main-events__showmatch-desc">{{ bottom.description }}</p>
        </div>

        <div class="main-events__showmatch-image main-events__showmatch-image--right">
          <Image
            :src="bottom.imageRight"
            alt=""
            class="main-events__showmatch-img"
            width="300"
            height="183"
          />
        </div>
      </div>
    </Container>


  </section>
</template>

<style lang="scss">
.main-events {
  position: relative;
  padding: 13rem 0 11rem;
  background-color: $darkBlue;
  overflow: hidden;
  .container {
    position: relative;
    z-index: 2;
  }

  @media (max-width: $tablet) {
    padding: 0 0 6rem;
  }

  // ──────────────────────────────────────────────
  // Декоративные элементы по бокам
  // ──────────────────────────────────────────────
  &__decor {
    position: absolute;
    pointer-events: none;
    user-select: none;
    z-index: 0;

    @media (max-width: $tablet) {
      display: none;
    }
  }

  &__card-bottom-subtitle {
    align-self: flex-start;
    text-align: left;
    font-size: 1.6rem;
  }

  &__card-bottom-involved {
    align-self: flex-start;
    text-align: left;
    font-size: 1.4rem;
    line-height: 1.2;
    color: $light;

    b {
      color: $red;
    }
  }

  &__decor--left {
    bottom: -3rem;
    left: -11.3rem;
  }

  &__decor--right {
    top: -1rem;
    right: -7.2rem;
  }

  // ──────────────────────────────────────────────
  // Заголовок секции
  // ──────────────────────────────────────────────
  &__title {
    position: relative;
    z-index: 2;
    font-family: $unbounded;
    font-size: 4.2rem;
    font-weight: 400;
    line-height: 1;
    color: $light;
    text-transform: uppercase;
    margin: 0 0 9rem;

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
    position: relative;
    z-index: 2;
    display: flex;
    align-items: flex-start;
    gap: 4rem;
    margin: 0 0 3rem;

    @media (max-width: $tablet) {
      gap: 2.4rem;
    }

    @media (max-width: $mobile) {
      flex-direction: column;
    }
  }

  // ──────────────────────────────────────────────
  // Карточка события
  // ──────────────────────────────────────────────
  &__card {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    background-color: $blue;
    border-radius: 1.3rem;
    box-shadow: 0 0.4rem 0.4rem rgba($black, 0.5);
    overflow: hidden;

    &--0 .main-events__card-inner {
      flex: 0;
    }

    @media (max-width: $tablet) {
      max-width: 56rem;
    }

    @media (max-width: $mobile) {
      max-width: 100%;
    }
  }

  &__card-inner {
    display: flex;
    flex: 1;
    gap: 2.8rem;
    padding: 3.6rem 2.6rem 0 3.6rem;

    @media (max-width: $tablet) {
      padding: 2.4rem 2.4rem 0;
      gap: 2.4rem;
    }

    @media (max-width: $mobile) {
      flex-direction: column;
      gap: 1.6rem;
      padding: 2rem 2rem 0;
    }
  }

  // ──────────────────────────────────────────────
  // Изображение в карточке
  // ──────────────────────────────────────────────
  &__card-image {
    width: 16rem;
    flex-shrink: 0;
    overflow: hidden;

    @media (max-width: $tablet) {
      width: 12rem;
      height: 19rem;
    }

    @media (max-width: $mobile) {
      width: 100%;
      max-width: 30rem;
      height: auto;
    }
  }

  &__card-img {
    display: block;
    width: 100%;
    height: 23.1rem;
    object-fit: cover;
    border-radius: 5px;

    @media (max-width: $mobile) {
      height: 100%;
      border-radius: 10px;
    }
  }

  // ──────────────────────────────────────────────
  // Текстовая часть карточки
  // ──────────────────────────────────────────────
  &__card-info {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
    flex: 1;
    min-width: 0;


    @media (max-width: $mobile) {
      gap: 0.4rem;
      margin: 0 0 3rem;
    }
  }

  &__card-heading {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
  }

  &__game {
    font-family: $tektur;
    font-size: 2.4rem;
    font-weight: 700;
    line-height: 1;
    color: $red;
    text-transform: uppercase;
    margin: 0;

    @media (max-width: $laptop) {
      font-size: 2rem;
    }

    @media (max-width: $mobile) {
      font-size: 1.8rem;
    }
  }

  &__subtitle {
    font-family: $tektur;
    font-size: 1.8rem;
    font-weight: 400;
    line-height: 1;
    color: #e0e2e3;
    margin: 0;

    @media (max-width: $mobile) {
      font-size: 1.5rem;
    }
  }

  &__desc {
    font-family: $tektur;
    font-size: 1.4rem;
    font-weight: 400;
    line-height: 1.3;
    color: $white;
    margin: 2.3rem 0 0;

    @media (max-width: $mobile) {
      margin: 0.8rem 0 0;
    }
  }

  &__prize {
    font-family: $tektur;
    font-size: 1.4rem;
    font-weight: 700;
    line-height: 1;
    color: $red;

    @media (max-width: $mobile) {
      margin-top: 0.8rem;
    }
  }

  // ──────────────────────────────────────────────
  // Нижняя часть карточки (кнопка + дедлайн)
  // ──────────────────────────────────────────────
  &__card-bottom {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    padding: 2.6rem 3.6rem 2.6rem;

    &--1 {
      padding-top: 0;
    }

    @media (max-width: $tablet) {
      padding: 2.4rem;

    }

    @media (max-width: $mobile) {
      padding: 1.6rem 2rem;
    }
  }

  &__reg-btn {
    display: block;
    text-decoration: none;
    width: 100%;
    max-width: 48.7rem;
    padding: 0.7rem 1.6rem;
    border: none;
    border-radius: 1.3rem;
    background-color: $red;
    font-family: $tektur;
    font-size: 1.8rem;
    font-weight: 400;
    line-height: 1;
    color: #e0e2e3;
    text-transform: uppercase;
    text-align: center;
    white-space: nowrap;
    cursor: pointer;
    transition: opacity 0.2s;

    &.disabled {
      cursor: auto;
    }

    &:not(.disabled):hover {
      opacity: 0.85;
    }

    @media (max-width: $tablet) {
      white-space: normal;
      height: auto;
      font-size: 1.6rem;
    }

    @media (max-width: $mobile) {
      font-size: 1.4rem;
      white-space: normal;
      height: auto;
      min-height: 3.5rem;
      padding: 0.8rem 1.2rem;
    }
  }

  &__deadline {
    font-family: $tektur;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1;
    color: $grey;
    margin: 0;

    @media (max-width: $mobile) {
      font-size: 0.9rem;
    }
  }

  // ──────────────────────────────────────────────
  // Нижний блок — Звёздный шоу-матч
  // ──────────────────────────────────────────────
  &__showmatch {
    position: relative;
    z-index: 2;
    display: flex;
    align-items: stretch;
    background-color: $blue;
    border-radius: 1.3rem;
    overflow: hidden;
    min-height: 18.3rem;

    @media (max-width: $tablet) {
      flex-direction: column;
      min-height: auto;
    }
  }

  &__showmatch-image {
    position: relative;
    overflow: hidden;

    img {
      max-width: unset;
      width: 101%;
      height: 101%;
    }

    @media (max-width: $tablet) {
      display: none;
    }
  }

  &__showmatch-img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &__showmatch-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 3.6rem 3rem 2rem 3rem;
    text-align: center;
  }

  &__showmatch-game {
    font-family: $tektur;
    font-size: 2.4rem;
    font-weight: 700;
    line-height: 1;
    color: $red;
    text-transform: uppercase;
    margin: 0 0 0.8rem;

    @media (max-width: $mobile) {
      font-size: 1.8rem;
    }
  }

  &__showmatch-subtitle {
    font-family: $tektur;
    font-size: 1.8rem;
    font-weight: 400;
    line-height: 1;
    color: #e0e2e3;
    margin: 0;

    @media (max-width: $mobile) {
      font-size: 1.5rem;
    }
  }

  &__showmatch-desc {
    font-family: $tektur;
    font-size: 1.2rem;
    font-weight: 400;
    line-height: 1.4;
    color: $white;
    margin: 2.2rem 0 0;
    max-width: 45.4rem;

    @media (max-width: $mobile) {
      font-size: 1.1rem;
    }
  }
}
</style>
