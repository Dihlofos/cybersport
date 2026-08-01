<script setup>
const props = defineProps({
  title: { type: String, required: true },
  decor: { type: String, default: '' },
  paragraphs: { type: Array, default: () => [] },
  benefits: { type: Array, default: () => [] },
  link: { type: Object, default: () => ({}) },
  image: { type: Object, default: () => ({}) },
  benefits: { type: Array, default: () => [] },
})
</script>

<template>
  <section id="about" class="about">
    <Container>
      <div class="about__content-top">
        <h2 class="about__title">{{ title }}</h2>
        <div class="about__mobile-wrap">
          <Image
            class="about__image tablet"
            :src="image.src"
            :alt="image.alt"
            :width="image.width"
            :height="image.height"
          />
          <div class="about__text">
            <p
              v-for="(paragraph, i) in paragraphs"
              :key="i"
              class="about__paragraph"
              v-html="paragraph"
            />
          </div>
        </div>
      </div>

      <div class="about__content-bottom">
        <Image
          class="about__image desktop"
          :src="image.src"
          :alt="image.alt"
          :width="image.width"
          :height="image.height"
        />

        <ul class="about__benefits">
          <li
            v-for="(benefit, i) in benefits"
            :key="i"
            class="about__benefit"
          >
            <h3 class="about__benefit-title">{{ benefit.title }}</h3>
            <p class="about__benefit-text">{{ benefit.text }}</p>
          </li>
        </ul>
      </div>
      <div class="about__registration">
        <Button :to="link.href" class="about__link" target="_blank">{{ link.text }}</Button>
        <Image
          :src="decor"
          alt=""
          class="about__decor"
          width="1920"
          height="100"
        />
      </div>
    </Container>
  </section>
</template>

<style lang="scss">
.about {
  position: relative;
  padding: 9.6rem 0 16rem;
  background-color: $darkBlue;

  @media (max-width: $mobile) {
    padding: 6rem 0 8rem;
  }

  // ──────────────────────────────────────────────
  // Top row: title + text
  // ──────────────────────────────────────────────
  &__content-top {
    display: flex;
    gap: 4rem;
    align-items: flex-start;
    margin-bottom: 5.8rem;

    @media (max-width: $tablet) {
      flex-direction: column;
      gap: 2.4rem;
      margin-bottom: 3rem;
    }

    @media (max-width: $mobile) {
      margin: 0;
    }
  }

  &__mobile-wrap {
    @media (max-width: $tablet) {
      display: flex;
      gap: 3rem;
      align-items: flex-end;
    }

    @media (max-width: $mobile) {
      flex-direction: column;
      align-items: flex-start;
    }
  }

  &__title {
    @include font(4.2rem, 1, 400);
    font-family: $unbounded;
    color: $light;
    text-transform: uppercase;
    margin: 0;
    flex-shrink: 0;
    width: 36rem;

    @media (max-width: $tablet) {
      @include font(4rem, 1, 400);
      width: auto;
    }

    @media (max-width: $mobile) {
      @include font(3.2rem, 1, 400);
    }
  }

  &__text {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    max-width: 64.2rem;

    @media (max-width: $tablet) {
      max-width: 40rem;
    }

    @media (max-width: $mobile) {
      max-width: 65rem;
    }

  }

  &__paragraph {
    @include font(1.4rem, 1.3, 400);
    font-family: $tektur;
    color: $white;
    margin: 0;

    b {
      font-weight: 700;
      color: $red;
    }

    @media (max-width: $mobile) {
      @include font(1.3rem, 1.45, 400);
    }
  }

  // ──────────────────────────────────────────────
  // Bottom row: image + benefits (flex-wrap)
  // ──────────────────────────────────────────────
  &__content-bottom {
    display: flex;
    gap: 4rem;
    align-items: flex-start;
    margin: 0 0 5rem;
    position: relative;
    z-index: 5;


    @media (max-width: $tablet) {
      flex-direction: column;
      gap: 3rem;
    }
  }

  &__image {
    flex-shrink: 0;
    width: 36rem;
    border-radius: 1.3rem;
    overflow: hidden;
    margin-top: -9rem;
    z-index: 5;

    @media (max-width: $tablet) {
      width: 100%;
      max-width: 34rem;
      margin: 0 auto;
    }

    @media (max-width: $mobile) {
      max-width: 100%;
      border-radius: 1.2rem;
    }
  }

  &__benefits {
    position: relative;
    flex: 1;
    display: flex;
    flex-wrap: wrap;
    gap: 4rem;
    list-style: none;
    margin: 0;
    padding: 0;
    z-index: 3;

    @media (max-width: $tablet) {
      gap: 3rem;
    }

    @media (max-width: $mobile) {
      gap: 1.5rem;
    }
  }

  &__benefit {
    position: relative;
    flex: 1 1 36rem;
    min-width: 28rem;
    background-color: $blue;
    border-radius: 1.3rem;
    padding: 2.3rem 2.7rem 2.3rem 2.3rem;
    display: flex;
    flex-direction: column;
    gap: 1.3rem;
    box-shadow: 0 0.4rem 0.2rem rgba($black, 0.5);
    z-index: 3;

    @media (max-width: $laptop) {
      flex: 1 1 32rem;
      min-width: 24rem;
    }

    @media (max-width: $mobile) {
      flex: 1 1 100%;
      min-width: 0;
      padding: 1.6rem 1.8rem;
    }
  }

  &__benefit-title {
    @include font(1.8rem, 1.1, 400);
    font-family: $tektur;
    color: $red;
    text-transform: uppercase;
    margin: 0;

    @media (max-width: $mobile) {
      @include font(1.6rem, 1.2, 400);
    }
  }

  &__benefit-text {
    @include font(1.4rem, 1.3, 400);
    font-family: $tektur;
    color: $white;
    margin: 0;

    @media (max-width: $mobile) {
      @include font(1.3rem, 1.4, 400);
    }
  }

  &__registration {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &__link {
    position: relative;
    z-index: 5;
  }


  &__decor {
    position: absolute;
    top: -12rem;
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


}
</style>
