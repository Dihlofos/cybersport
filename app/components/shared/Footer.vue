<script setup>
import footerData from '~/../data/sections/footer.json'
</script>

<template>
  <footer class="footer" id="contact">
    <Container>
      <div class="footer__wrapper">
        <div class="footer__logo">
          <Image
            src="/images/footer/logo.svg"
            alt="Фиджитал Центр Спорта Москвы"
            width="458"
            height="209"
            class="footer__logo-img"
          />
        </div>

        <div class="footer__content">
          <h2 class="footer__title">{{ footerData.title }}</h2>

          <div class="footer__contacts">
            <div
              v-for="contact in footerData.contacts"
              :key="contact.email"
              class="footer__contact"
            >
              <div class="footer__contact-label">{{ contact.label }}</div>
              <a
                :href="'mailto:' + contact.email"
                target="_blank"
                class="footer__contact-email"
              >{{ contact.email }}</a>
            </div>
          </div>

          <div class="footer__info">
            <p class="footer__info-text">{{ footerData.info.text }}</p>
            <ul class="footer__info-list">
              <li
                v-for="(item, i) in footerData.info.items"
                :key="i"
                class="footer__info-item"
              >{{ item }}</li>
            </ul>
          </div>

          <div class="footer__socials">
            <a
              v-for="social in footerData.socials"
              :key="social.icon"
              :href="social.href"
              target="_blank"
              :aria-label="social.label"
              class="footer__social-link"
            >
              <Image
                :src="'/images/logos/' + social.icon + '.svg'"
                :alt="social.label"
                width="38"
                height="38"
                class="footer__social-icon"
              />
            </a>
          </div>

          <div class="footer__docs">
            <a
              v-for="doc in footerData.docs"
              :key="doc.href"
              :href="doc.href"
              target="_blank"
              class="footer__doc-link"
            >{{ doc.label }}</a>
          </div>
        </div>
      </div>
    </Container>
  </footer>
</template>

<style lang="scss">
.footer {
  position: relative;
  background-color: $blue;
  padding: 7.3rem 0 6.6rem;
  overflow: hidden;

  @media (max-width: $tablet) {
    padding: 4rem 0 3rem;
  }

  &__wrapper {
    display: grid;
    grid-template-columns: auto 55.9rem;

    @media (max-width: $tablet) {
      grid-template-columns: 1fr;
      gap: 3rem;
    }
  }

  &__logo {
    @media (max-width: $tablet) {
      order: 1;
    }
  }

  &__logo-img {
    display: block;
    width: 45.8rem;
    max-width: 100%;
    height: auto;

    @media (max-width: $tablet) {
      width: 28rem;
    }
  }

  &__content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    @media (max-width: $tablet) {
      order: 2;
    }
  }

  &__title {
    font-family: $unbounded;
    font-size: 4.2rem;
    font-weight: 400;
    line-height: normal;
    text-transform: uppercase;
    color: $light;
    margin: 0 0 5.3rem;

    @media (max-width: $tablet) {
      font-size: 2.8rem;
      margin-bottom: 2.5rem;
    }
  }

  &__contacts {
    display: flex;
    width: 100%;
    justify-content: space-between;
    margin-bottom: 2.7rem;
    padding-right: 10rem;

    @media (max-width: $tablet) {
      flex-direction: column;
      gap: 2rem;
      margin-bottom: 2rem;
    }
  }

  &__contact {
    display: flex;
    flex-direction: column;
    gap: 0.7rem;
  }

  &__contact-label {
    font-family: $tektur;
    font-size: 1.8rem;
    font-weight: 700;
    line-height: normal;
    text-transform: uppercase;
    color: $red;
  }

  &__contact-email {
    font-family: $tektur;
    font-size: 1.4rem;
    font-weight: 400;
    line-height: normal;
    color: $white;
    text-decoration: underline;
    text-underline-offset: from-font;
    text-decoration-color: $white;
  }

  &__info {
    margin-bottom: 4.7rem;

    @media (max-width: $tablet) {
      margin-bottom: 3rem;
    }
  }

  &__info-text {
    font-family: $tektur;
    font-size: 1.4rem;
    font-weight: 400;
    line-height: normal;
    color: $white;
    margin: 0;
  }

  &__info-list {
    margin: 1.8rem 0 0;
    padding-left: 2.1rem;

    @media (max-width: $tablet) {
      margin-top: 1rem;
    }
  }

  &__info-item {
    font-family: $tektur;
    font-size: 1.4rem;
    font-weight: 400;
    line-height: normal;
    color: $white;
  }

  &__info-item::marker {
    color: $white;
  }

  &__socials {
    display: flex;
    flex-direction: row;
    gap: 2.2rem;
    margin-bottom: 1.7rem;
  }

  &__social-link {
    display: block;
    width: 3.8rem;
    height: 3.8rem;
  }

  &__social-icon {
    display: block;
    width: 100%;
    height: 100%;
  }

  &__docs {
    display: flex;
    flex-direction: column;

    @media (max-width: $tablet) {
      flex-direction: column;
      gap: 0.5rem;
    }
  }

  &__doc-link {
    font-family: $tektur;
    font-size: 1.4rem;
    font-weight: 400;
    line-height: normal;
    color: $white;
    opacity: 0.4;
    text-decoration: none;

    @media (max-width: $tablet) {
      font-size: 1.2rem;
    }
  }
}
</style>
