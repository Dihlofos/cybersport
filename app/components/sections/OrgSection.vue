<script setup>
defineProps({
  title: { type: String, required: true },
  text: { type: String, default: '' },
  logo: { type: String, default: '' },
})
</script>

<template>
  <section id="org" class="org">
    <Container>
      <div class="org__content">
        <div class="org__text">
          <h2 class="org__title">{{ title }}</h2>
          <p class="org__desc">{{ text }}</p>
        </div>
        <div v-if="logo" class="org__logo-area">
          <img :src="logo" alt="" class="org__logo" />
        </div>
      </div>
    </Container>
  </section>
</template>

<style lang="scss" scoped>
.org {
  background-color: $darkBlue;
  padding: 8.2rem 0 0;

  &__content {
    display: grid;
    grid-template-columns: 1fr auto;
    align-items: center;
    gap: 4rem;
  }

  &__text {
    display: flex;
    flex-direction: column;
    gap: 2.5rem;
  }

  &__title {
    font-family: $unbounded;
    font-size: 4.2rem;
    font-weight: 400;
    line-height: 1;
    color: $light;
    text-transform: uppercase;
    margin: 0;

    @media (max-width: $tablet) {
      font-size: 3.2rem;
    }

    @media (max-width: $mobile) {
      font-size: 2.4rem;
    }
  }

  &__desc {
    font-family: $tektur;
    font-size: 1.4rem;
    font-weight: 400;
    line-height: 1.5;
    color: $white;
    margin: 0;
    max-width: 43.4rem;
  }

  &__logo-area {
    flex-shrink: 0;
  }

  &__logo {
    display: block;
    max-width: 100%;
    height: auto;
  }

  @media (max-width: $mobile) {
    padding: 5rem 0 0;

    &__content {
      grid-template-columns: 1fr;
      gap: 3rem;
    }

    &__logo-area {
      order: -1;
    }

    &__logo {
      max-width: 20rem;
    }
  }
}
</style>
