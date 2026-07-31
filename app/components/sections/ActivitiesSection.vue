<script setup>
defineProps({
  title: { type: String, required: true },
  subtitle: { type: String, default: '' },
  decor: { type: String, default: '' },
  cards: { type: Array, default: () => [] },
  description: { type: String, default: '' },
  rewards: { type: Array, default: () => [] },
})

const arrows = {
  left: '/images/activities/arrow-left.svg',
  right: '/images/activities/arrow-right.svg',
}
</script>

<template>
  <section id="activities" class="activities">
    <Container wide>
      <h2 class="activities__title">{{ title }}</h2>

      <div class="activities__slider-area">
        <Image
          v-if="decor"
          :src="decor"
          alt=""
          class="activities__decor"
        />

        <Slider
          :items="cards"
          :arrow-left="arrows.left"
          :arrow-right="arrows.right"
        >
          <template #slide="{ item }">
            <article class="activities__card">
              <div class="activities__card-top">
                <h3 class="activities__card-title">{{ item.digital.title }}</h3>
                <p class="activities__card-text activities__card-text--light">{{ item.digital.text }}</p>
              </div>
              <div class="activities__card-bottom">
                <h3 class="activities__card-title">{{ item.physical.title }}</h3>
                <p class="activities__card-text activities__card-text--dark">{{ item.physical.text }}</p>
              </div>
            </article>
          </template>
        </Slider>
      </div>
      </Container>
      <Container>

      <p class="activities__subtitle">{{ subtitle }}</p>

      <div class="activities__bottom">
        <p class="activities__desc">{{ description }}</p>

        <ul class="activities__rewards">
          <li
            v-for="(reward, idx) in rewards"
            :key="idx"
            class="activities__reward"
            v-html="reward.label"
          />
        </ul>
      </div>
    </Container>
  </section>
</template>

<style lang="scss">
.activities {
  position: relative;
  padding: 8rem 0 9.3rem;
  background-color: $darkBlue;
  overflow: hidden;

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
  // Зона слайдера + декор
  // ──────────────────────────────────────────────
  &__slider-area {
    position: relative;
  }

  &__decor {
    position: absolute;
    bottom: -23rem;
    left: 50%;
    pointer-events: none;
    z-index: 0;
    transform: translateX(-50%);
  }

  // ──────────────────────────────────────────────
  // Карточка пары (цифровая + физическая)
  // ──────────────────────────────────────────────
  &__card {
    display: grid;
    grid-template-rows: 1fr 1fr;
    position: relative;
    z-index: 1;
    border-radius: 13px;
    height: 30.3rem;
    box-shadow: 0 0.4rem 0.4rem rgba($black, 0.5);
    overflow: hidden;
  }

  &__card-top {
    position: relative;
    background-color: $blue;
    padding: 2.6rem 1.7rem;
    min-height: 14.3rem;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    border-radius: 13px;
    box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.50);
    z-index: 2;
  }

  &__card-bottom {
    position: relative;
    background-color: $light;
    padding: 2.2rem 1.7rem 1.9rem;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;

    &:before {
      content: '';
      position: absolute;
      top: -3rem;
      left: 0;
      height: 3rem;
      width: 100%;
      background-color: $light;
    }
  }

  &__card-title {
    font-family: $tektur;
    font-size: 1.8rem;
    font-weight: 700;
    line-height: 1;
    color: $red;
    text-transform: uppercase;
    margin: 0;
  }

  &__card-text {
    font-family: $tektur;
    font-size: 1.4rem;
    font-weight: 400;
    line-height: 1.3;
    margin: 0;
    flex: 1;
  }

  &__card-text--light {
    color: $white;
  }

  &__card-text--dark {
    color: $blue;
  }

  // ──────────────────────────────────────────────
  // Подзаголовок
  // ──────────────────────────────────────────────
  &__subtitle {
    position: relative;
    z-index: 5;
    font-family: $unbounded;
    font-size: 4.2rem;
    font-weight: 400;
    line-height: 1.2;
    color: $light;
    margin: 17.3rem 0 5rem;
    max-width: 70rem;

    @media (max-width: $tablet) {
      font-size: 3.2rem;
      margin: 5rem 0 4rem;
    }

    @media (max-width: $mobile) {
      font-size: 2.4rem;
      margin: 3rem 0 2.4rem;
    }
  }

  // ──────────────────────────────────────────────
  // Нижний блок: описание + награды
  // ──────────────────────────────────────────────
  &__bottom {
    display: flex;
    align-items: flex-start;
    gap: 5rem;

    @media (max-width: $tablet) {
      flex-direction: column;
      gap: 2.4rem;
    }
  }

  &__desc {
    font-family: $tektur;
    font-size: 1.4rem;
    font-weight: 400;
    line-height: 1.4;
    color: $white;
    margin: 0;
    max-width: 35rem;
    flex-shrink: 0;

    @media (max-width: $tablet) {
      max-width: 100%;
    }
  }

  &__rewards {
    flex: 1;
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 1.8rem;
  }

  &__reward {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: $blue;
    border-radius: 1.3rem;
    box-shadow: 0 0.4rem 0.4rem rgba($black, 0.5);
    padding: 0 2rem;
    min-height: 5rem;
    font-family: $tektur;
    font-size: 1.8rem;
    font-weight: 700;
    line-height: 1;
    color: $light;
    text-transform: uppercase;
    text-align: center;
    gap: 0.5rem;


    b {
      color: $red;
      font-weight: 700;
    }

    @media (max-width: $mobile) {
      font-size: 1.4rem;
      min-height: 4rem;
    }
  }
}
</style>
