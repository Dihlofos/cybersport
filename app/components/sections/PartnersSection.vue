<script setup>
defineProps({
  title: { type: String, required: true },
  decor: { type: Object, default: () => ({ right: '', left: '' }) },
  logos: { type: Array, default: () => [] },
})
</script>

<template>
  <section id="partners" class="partners">
    <Container>
      <Image
        v-if="decor.left"
        :src="decor.left"
        alt=""
        class="partners__decor partners__decor--left"
        width="207"
        height="218"
      />

      <h2 class="partners__title">{{ title }}</h2>

      <div class="partners__logos">
        <a
          v-for="(logo, index) in logos"
          :key="index"
          :href="logo.link || undefined"
          :target="logo.target || undefined"
          :rel="logo.target === '_blank' ? 'noopener' : undefined"
          class="partners__logo"
        >
          <Image
            :src="logo.src"
            :alt="logo.link ? '' : logo.src"
            :width="logo.width"
            :height="logo.height"
            class="partners__logo-img"
          />
        </a>
      </div>
    </Container>
  </section>
</template>

<style lang="scss">
.partners {
  position: relative;
  background-color: $darkBlue;
  padding: 16rem 0 8rem;
  z-index: 2;

  @media (max-width: $mobile) {
    padding: 5rem 0;
  }

  .container {
    position: relative;
    z-index: 2;
  }

  &__decor {
    position: absolute;
    pointer-events: none;
    user-select: none;
    z-index: 0;
    bottom: -20rem;
    left: -20rem;

    @media (max-width: $tablet) {
      display: none;
    }
  }

  &__title {
    font-family: $unbounded;
    font-size: 4.2rem;
    font-weight: 400;
    line-height: 1;
    color: $light;
    text-transform: uppercase;
    margin: 0 0 12.7rem;

    @media (max-width: $tablet) {
      font-size: 3.2rem;
      margin: 0 0 4rem;
    }

    @media (max-width: $mobile) {
      font-size: 2.4rem;
      margin: 0 0 3rem;
    }
  }

  &__logos {
    display: flex;
    align-items: center;
    gap: 6rem;

    @media (max-width: $tablet) {
      flex-wrap: wrap;
      justify-content: center;
    }


    @media (max-width: $mobile) {
      gap: 3rem;
    }
  }

  &__logo {
    display: flex;
    align-items: center;
    justify-content: center;

    @media (max-width: $tablet) {
      img {
        max-height: 6rem;
        width: auto;
      }
    }

    @media (max-width: $mobile) {
      img {
        max-height: 4rem;
        width: auto;
      }
    }
  }

  &__logo-img {
    display: block;
    max-width: 100%;
    height: auto;
  }
}
</style>
