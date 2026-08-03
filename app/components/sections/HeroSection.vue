<script setup>
const props = defineProps({
  title: { type: String, required: true },
  subtitle: { type: String, default: '' },
  location: { type: String, default: '' },
  labels: { type: Array, default: () => [] },
  mainImage: { type: Object, default: () => ({}) },
  backgroundImage: { type: String, default: '' },
  logos: { type: Array, default: () => [] },
})
</script>

<template>
  <section id="hero" class="hero">
    <Image :src="backgroundImage" alt="" class="hero__bg" width="1920" height="1080" />
    <Container>
      <h1 class="visually-hidden">{{ title }}</h1>
      <div class="hero__logos">
        <div class="hero__logo" :class="[logo.name]" v-for="(logo, index) in logos" :key="index">
          <Image :src="logo.src" :alt="logo.alt" :width="logo.width" :height="logo.height" />
        </div>
      </div>

      <Image class="hero__main-logo" :src="mainImage.src" :alt="mainImage.alt" :width="mainImage.width" :height="mainImage.height" />
      <div class="hero__content">
        <div class="hero__subtitle">{{ subtitle }}</div>
        <div class="hero__labels">
          <a class="hero__label"
            v-for="(label, index) in labels"
            :key="index"
            v-anchor="label.link ? label.link : undefined"
            :href="label.link? label.link : undefined"
          >
            <Image :src="label.icon" alt="" width="24" height="24" />
            <span>{{ label.text }} <span v-if="label.smallText">{{ label.smallText }}</span></span>

          </a>
        </div>
      </div>
    </Container>
  </section>
</template>

<style lang="scss">
.hero {
  position: relative;
  padding: 6.2rem 0 13.3rem;

  @media (max-width: $tablet) {
    padding: 0 0 8.3rem;
  }

  @media (max-width: $mobile) {
    padding: 0 0 4.3rem;
  }

  &__bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: -1;
  }

  &__logo {
    @media (max-width: $mobile) {

      &.vdnkh {
        width: 3rem;
      }
    }
  }

  &__logos {
    padding-top: 7rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: 3.7rem;
    row-gap: 1.9rem;
    margin: 0 auto 11rem;

    @media (max-width: $tablet) {
      justify-content: flex-start;
      padding-top: 2rem;
      margin: 0 0 7rem;
    }

    @media (max-width: $mobile) {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr;
      // padding-right: 5rem;
      gap: 2rem;
    }
  }

  &__main-logo {
    display: block;
    margin: 0 auto 8.8rem;

    @media (max-width: $tablet) {
      margin: 0 auto 5.8rem;
    }
  }

  &__content {
    margin: 0 auto;
    display: flex;
    align-items: center;
    flex-direction: column;
  }

  &__labels {
    display: flex;
    gap: 4rem;


    @media (max-width: $mobile) {
      flex-direction: column;
      gap: 1.6rem;
      width: 100%;
      max-width: 44rem;
    }
  }

  &__label {
    display: flex;
    gap: 1.3rem;
    align-items: center;
    background-color: $light;
    color: $darkBlue;
    font-size: 1.8rem;
    padding: 1.3rem 2rem;
    border-radius: 13px;
    text-decoration: none;
    span span {
      font-size: 1.4rem;
    }

    @media (max-width: $mobile) {
      font-size: 1.6rem;
      gap: 0.5rem;
      padding: 1.3rem 1.4rem;
      width: 100%;
    }
  }

  &__subtitle {
    color: $light;
    text-transform: uppercase;
    font-size: 4.2rem;
    line-height: 1;
    margin: 0 0 4.6rem
  }
}
</style>
