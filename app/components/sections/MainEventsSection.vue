<script setup>
import { sanitizeText } from '~/utils/sanitize'
defineProps({
  title: { type: String, required: true },
  decorRight: { type: String, default: '' },
  decorLeft: { type: String, default: '' },
  playerImage: { type: String, default: '' },
  events: { type: Array, default: () => [] },
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

      <!-- Изображение игрока справа -->
      <div v-if="playerImage" class="main-events__player">
        <Image
          :src="playerImage"
          alt=""
          class="main-events__player-img"
          width="500"
          height="1043"
        />
        <div class="main-events__player-overlay" />
      </div>

      <h2 class="main-events__title">{{ title }}</h2>

      <!-- Карточки событий -->
      <div class="main-events__grid">
        <article
          v-for="(event, index) in events"
          :key="index"
          class="main-events__card"
        >
          <!-- Изображение карточки -->
          <div class="main-events__card-image">
            <Image
              :src="event.image"
              :alt="event.game"
              class="main-events__card-img"
              width="274"
              height="428"
              :sources="event.mobileImage ? [{ media: '(max-width: 767px)', srcset: event.mobileImage  }] : undefined"
            />
          </div>

          <!-- Контент карточки -->
          <div class="main-events__card-content">
            <div class="main-events__card-heading">
              <h3 class="main-events__game">{{ event.game }}</h3>
              <p class="main-events__subtitle">{{ event.subtitle }}</p>
            </div>
            <p class="main-events__desc">{{ event.description }}</p>

            <!-- Призовой фонд -->
            <div v-if="event.prize" class="main-events__prize">
              {{ event.prize }}
            </div>

            <!-- Блок регистраций -->
            <div
              v-if="event.registrations && event.registrations.length"
              class="main-events__regs"
              :class="{[event.type]: true}"
            >
              <div
                v-for="(reg, regIndex) in event.registrations"
                :key="regIndex"
                class="main-events__reg"
              >
                <!-- Регистрация с датой (Мир танков) -->
                <template v-if="reg.date">
                  <div class="main-events__reg-row">
                    <span class="main-events__reg-date">{{ reg.date }}</span>
                    <span class="main-events__reg-divider" />
                    <a
                      :href="reg.link || undefined"
                      class="main-events__reg-btn"
                      target="_blank"
                    >
                      {{ reg.text }}
                    </a>
                  </div>
                </template>

                <!-- Обычная регистрация (CS2) -->
                <template v-else>
                  <a
                    :href="reg.link || undefined"
                    class="main-events__reg-btn main-events__reg-btn--full"
                    target="_blank"
                  >
                    {{ reg.text }}
                  </a>
                  <p v-if="reg.deadline" class="main-events__deadline">{{ reg.deadline }}</p>
                </template>
              </div>
            </div>
            <div class="main-events__commands" v-if="event.mainCommands">
              <div class="main-events__commands-title">{{ event.mainCommands.text }}</div>
              <div class="main-events__commands-list">
                <div class="main-events__command" v-for="command in event.mainCommands.list" :key="command.text">
                  <Image :src="command.image" :alt="command.text" class="main-events__commands-img" />
                  <span class="main-events__commands-text">{{ command.text }}</span>
                </div>
              </div>
            </div>
            <div class="main-events__commands" v-if="event.otherCommands">
              <div class="main-events__commands-title">{{ event.otherCommands.title }}</div>
              <span class="main-events__commands-names">{{ event.otherCommands.list }}</span>
            </div>
          </div>
        </article>
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

  &__decor--left {
    bottom: 65.4rem;
    left: -11.3rem;
  }

  &__decor--right {
    top: -1rem;
    right: -7.2rem;
  }

  &__commands {
    padding: 2.6rem 0 0;
  }

  &__commands-title {
    font-size: 1.4rem;
    text-transform: uppercase;
    color: $white;
    text-align: center;
    margin: 0 0 1.3rem;
    font-weight: 700;
    font-family: $tektur;
  }

  &__commands-list {
    display: grid;
    grid-template-columns: repeat(4,1fr);
    gap: 1.6rem;
  }

  &__commands-names {
    display: block;
    font-size: 1rem;
    color: $grey;
    max-width: 21.2rem;
    margin: 0 auto;
    text-align: center;
  }

  &__commands-img {
    height: 5.5rem;
    width: auto;
  }

  &__command {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.9rem;
  }

  &__commands-text {
    font-size: 1rem;
    color: $red;
    font-weight: 700;
    font-family: $tektur;
  }

  // ──────────────────────────────────────────────
  // Изображение игрока справа
  // ──────────────────────────────────────────────
  &__player {
    position: absolute;
    right: 3rem;
    top: 13rem;
    width: 50rem;
    z-index: 1;
    pointer-events: none;
    user-select: none;

    @media (max-width: $laptop) {
      width: 36rem;
    }

    @media (max-width: $tablet) {
      display: none;
    }
  }

  &__player-img {
    display: block;
    width: 100%;
    height: auto;
  }

  &__player-overlay {
    position: absolute;
    inset: 0;
    background:
      linear-gradient(-90deg, $darkBlue 0%, rgba($darkBlue, 0) 28%),
      linear-gradient(0deg, $darkBlue 0%, rgba($darkBlue, 0) 30%),
      linear-gradient(90deg, $darkBlue 0%, rgba($darkBlue, 0) 39%),
      linear-gradient(180deg, $darkBlue 0%, rgba($darkBlue, 0) 28%);
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
    flex-direction: column;
    gap: 4rem;
    max-width: 66rem;

    @media (max-width: $tablet) {
      max-width: 100%;
      gap: 2.4rem;
    }
  }

  // ──────────────────────────────────────────────
  // Карточка события
  // ──────────────────────────────────────────────
  &__card {
    display: flex;
    background-color: $blue;
    border-radius: 1.3rem;
    box-shadow: 0 0.4rem 0.4rem rgba($black, 0.5);
    overflow: hidden;

    @media (max-width: $mobile) {
      flex-direction: column;
    }
  }

  // ──────────────────────────────────────────────
  // Изображение в карточке
  // ──────────────────────────────────────────────
  &__card-image {
    position: relative;
    flex-shrink: 0;
    width: 25rem;
    overflow: hidden;

    @media (max-width: $laptop) {
      width: 22rem;
    }

    @media (max-width: $mobile) {
      width: 100%;
      height: 30rem;
    }
  }

  &__card-img {
    display: block;
    width: calc(100% + 2px);
    height: calc(100% + 2px);
    object-fit: cover;
    max-width: unset;
    object-position: 0 10%;

    @media (max-width: $mobile) {
      object-position: 0 10%;
    }
  }

  // ──────────────────────────────────────────────
  // Контент карточки
  // ──────────────────────────────────────────────
  &__card-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 3.3rem 3.8rem 2.6rem 2.4rem;
    min-width: 0;

    @media (max-width: $mobile) {
      padding: 2rem;
    }
  }

  &__card-heading {
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
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

  // ──────────────────────────────────────────────
  // Призовой фонд
  // ──────────────────────────────────────────────
  &__prize {
    margin: 2.8rem 0 0;
    padding: 0.7rem 1rem;
    border: 1px solid $red;
    border-radius: 1.3rem;
    font-family: $tektur;
    font-size: 1.4rem;
    font-weight: 700;
    line-height: 1;
    color: $red;
    text-align: center;

    @media (max-width: $mobile) {
      margin: 1.2rem 0 0;
      font-size: 1.2rem;
    }
  }

  // ──────────────────────────────────────────────
  // Блок регистраций
  // ──────────────────────────────────────────────
  &__regs {
    margin: 1.6rem 0 0;
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
  }

  &__reg {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.3rem;

    .tanks & {
      &:first-child {
        padding-bottom: 1rem;
        border-bottom: 1px solid $red;
      }
    }


  }

  // ──────────────────────────────────────────────
  // Строка с датой + кнопкой (Мир танков)
  // ──────────────────────────────────────────────
  &__reg-row {
    display: flex;
    align-items: center;
    gap: 2.4rem;
    width: 100%;
  }

  &__reg-date {
    font-family: $tektur;
    font-size: 1.8rem;
    font-weight: 400;
    line-height: 1;
    color: #e0e2e3;
    white-space: nowrap;
    width: 8.9rem;
    text-align: right;

    @media (max-width: $laptop) {
      font-size: 1.5rem;
      width: 7rem;
    }

    @media (max-width: $mobile) {
      font-size: 1.3rem;
      width: 6rem;
    }
  }

  &__reg-divider {
    display: block;
    width: 1px;
    height: 5.7rem;
    background-color: $red;
    flex-shrink: 0;

    @media (max-width: $mobile) {
      height: 4.5rem;
    }
  }

  // ──────────────────────────────────────────────
  // Кнопка регистрации
  // ──────────────────────────────────────────────
  &__reg-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    padding: 0.7rem 1.6rem;
    border: none;
    border-radius: 1.3rem;
    background-color: $red;
    font-family: $tektur;
    font-size: 1.8rem;
    font-weight: 400;
    line-height: 1.3;
    color: #e0e2e3;
    text-transform: uppercase;
    text-align: center;
    cursor: pointer;
    transition: opacity 0.2s;
    min-height: 5.7rem;
    flex: 1;

    &:hover {
      opacity: 0.85;
    }

    @media (max-width: $laptop) {
      font-size: 1.5rem;
      min-height: 4.5rem;
    }

    @media (max-width: $mobile) {
      font-size: 1.3rem;
      min-height: 4rem;
      padding: 0.8rem 1.2rem;
    }
  }

  &__reg-btn--full {
    width: 100%;
  }

  // ──────────────────────────────────────────────
  // Дедлайн
  // ──────────────────────────────────────────────
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
  // Участники
  // ──────────────────────────────────────────────
  &__involved {
    max-width: 21rem;
    align-self: flex-end;
    text-align: left;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.2;
    color: $grey;

    b {
      color: $red;
    }

    @media (max-width: $tablet) {
      max-width: unset;
    }

    @media (max-width: $mobile) {
      font-size: 0.9rem;
    }
  }
}
</style>
