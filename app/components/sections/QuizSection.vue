<script setup>
defineProps({
  title: { type: String, required: true },
  text: { type: String, default: '' },
})

const isOpen = ref(false)
</script>

<template>
  <section id="quiz" class="quiz">
    <Container>
      <div class="quiz__content">
        <div class="quiz__text">
          <h2 class="quiz__title">{{ title }}</h2>
          <p v-if="text" class="quiz__paragraph">{{ text }}</p>
          <Button class="quiz__toggle" @click="isOpen = !isOpen">
            {{ isOpen ? 'Скрыть' : 'Показать' }}
          </Button>
        </div>
        <div class="quiz__iframe" :class="{ 'quiz__iframe--open': isOpen }">
          <iframe id="victorina" title="Victorina" width="100%" height="100%" src="https://ag.mos.ru/polls/17272/simple?invite=993a3af34205b32943f8c62f44fe4f82&amp;source=iframe&amp;medium=zoo.mos.ru"> </iframe>
        </div>
      </div>
    </Container>
  </section>
</template>

<style lang="scss" scoped>
.quiz {
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
    margin: 0 0 2rem;

    @media (max-width: $tablet) {
      font-size: 3.2rem;
    }

    @media (max-width: $mobile) {
      font-size: 2.4rem;
    }
  }

  &__paragraph {
    font-family: $tektur;
    font-size: 1.6rem;
    line-height: 1.3;
    color: $white;
    max-width: 64rem;
    margin: 0 0 4rem;

    @media (max-width: $mobile) {
      font-size: 1.4rem;
    }
  }

  &__toggle {
    margin: 0 0 4rem;
    font-size: 2.4rem;
  }

  &__iframe {
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
