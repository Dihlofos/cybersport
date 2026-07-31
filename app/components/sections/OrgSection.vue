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
        <Image :src="logo" alt="" class="org__decor" />
      </div>
    </Container>
  </section>
</template>

<style lang="scss" scoped>
.org {
  position: relative;
  background-color: $darkBlue;
  padding: 8.2rem 0 0;

  @media (max-width: $mobile) {
    padding: 5rem 0 0;
  }

  .container {
    position: relative;

  }


  &__title {
    font-family: $unbounded;
    font-size: 4.2rem;
    font-weight: 400;
    line-height: 1;
    color: $light;
    text-transform: uppercase;
    margin: 0 0 8rem;

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
    line-height: 1.3;
    color: $white;
    margin: 0;
    max-width: 43.4rem;
  }

  &__content {
    @media (max-width: $mobile) {
      grid-template-columns: 1fr;
      gap: 3rem;
    }
  }

  &__logo-area {
    flex-shrink: 0;

    @media (max-width: $mobile) {
      order: -1;
    }
  }

  &__logo {
    @media (max-width: $mobile) {
      max-width: 20rem;
    }
  }

  &__decor {
    position: absolute;
    right: 7rem;
    top: 0.7rem;
  }
}
</style>
