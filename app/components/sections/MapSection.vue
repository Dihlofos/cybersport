<script setup>
import { ref, computed, watch, nextTick, onMounted, onUnmounted } from 'vue'
import { computePosition, autoUpdate, offset, flip, shift } from '@floating-ui/dom'
import { useModal } from '~/composables/useModal'
import { getSmoothScrollInstance } from '~/directives/anchor'
import modalData from '~/../data/modal.json'

const modal = useModal()

const props = defineProps({
  title: { type: String, required: true },
  actions: { type: Array, default: () => [] },
  zones: { type: Array, default: () => [] },
  stations: { type: Array, default: () => [] },
})

const activeFigure = ref(null)
const activeFigureEl = ref(null)
const tooltipRef = ref(null)
const mapAreaRef = ref(null)
const tooltipStyle = ref({ position: 'absolute', top: '0px', left: '0px' })

let positionCleanup = null

function scrollToMap() {
  if (typeof window === 'undefined') return
  if (window.innerWidth > 1023) return
  if (!mapAreaRef.value) return

  const instance = getSmoothScrollInstance()
  if (instance) {
    instance.animateScroll(mapAreaRef.value, null, {
      speed: 350,
      offset: 45,
    })
  }
}

const figureNameMap = computed(() => {
  const map = {}
  for (const z of props.zones) map[z.number] = z.name
  for (const s of props.stations) map[s.number] = s.name
  return map
})

const activeFigureName = computed(() => {
  if (activeFigure.value === null) return ''
  return figureNameMap.value[activeFigure.value] ?? ''
})

function stopPositioning() {
  if (positionCleanup) {
    positionCleanup()
    positionCleanup = null
  }
}

// Floating UI позиционирует тултип относительно .map__map-area,
// но на мобильной раскладке этот блок шире экрана (width: 217%; margin-left: -60%)
// и торчит за пределы вьюпорта. Поэтому после расчёта зажимаем тултип
// в границы реального экрана (left/top пересчитываются обратно в координаты блока).
function applyTooltipPosition(x, y) {
  const area = mapAreaRef.value
  const tooltip = tooltipRef.value
  if (!area || !tooltip) return

  const margin = 8
  const areaRect = area.getBoundingClientRect()
  const tooltipWidth = tooltip.offsetWidth
  const tooltipHeight = tooltip.offsetHeight

  const viewportLeft = areaRect.left + x
  const viewportTop = areaRect.top + y

  const left = clamp(viewportLeft, margin, window.innerWidth - tooltipWidth - margin)
  const top = clamp(viewportTop, margin, window.innerHeight - tooltipHeight - margin)

  tooltipStyle.value = {
    position: 'absolute',
    top: `${top - areaRect.top}px`,
    left: `${left - areaRect.left}px`,
  }
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), Math.max(min, max))
}

function startPositioning() {
  stopPositioning()

  if (!activeFigureEl.value || !tooltipRef.value) return

  const reference = activeFigureEl.value
  const middleware = [offset(12), flip(), shift({ padding: 8 })]

  computePosition(reference, tooltipRef.value, { placement: 'left', middleware }).then(({ x, y }) => {
    applyTooltipPosition(x, y)
  })

  positionCleanup = autoUpdate(reference, tooltipRef.value, () => {
    computePosition(reference, tooltipRef.value, { placement: 'left', middleware }).then(({ x, y }) => {
      applyTooltipPosition(x, y)
    })
  })
}

watch(activeFigure, () => {
  nextTick(() => startPositioning())
})

function handleFigureSelect(num) {
  if (activeFigure.value === num) {
    activeFigure.value = null
    activeFigureEl.value = null
    return
  }
  activeFigure.value = num
  activeFigureEl.value = document.querySelector(`[data-figure="${num}"]`)
  scrollToMap()
}

function handleFigureClick(event) {
  const g = event.target.closest('[data-figure]')
  if (!g) return
  const num = parseInt(g.dataset.figure, 10)
  if (isNaN(num)) return
  if (activeFigure.value === num) {
    activeFigure.value = null
    activeFigureEl.value = null
    return
  }
  activeFigure.value = num
  activeFigureEl.value = g
}

function closeTooltip() {
  activeFigure.value = null
  activeFigureEl.value = null
}

function onDocumentClick(event) {
  if (activeFigure.value === null) return
  if (event.target.closest('[data-figure]')) return
  if (event.target.closest('.map__legend-item')) return
  if (tooltipRef.value && tooltipRef.value.contains(event.target)) return
  closeTooltip()
}

function onActionClick(action, event) {
  if (action.link === '#') {
    event.preventDefault()
    modal.open(modalData.howToGet, event.currentTarget)
  }
}

onMounted(() => {
  document.addEventListener('click', onDocumentClick)
})

onUnmounted(() => {
  document.removeEventListener('click', onDocumentClick)
  stopPositioning()
})
</script>

<template>
  <section id="map" class="map">
    <Container>
      <h2 class="map__title">{{ title }}</h2>

      <div class="map__actions">
        <a
          v-for="(action, index) in actions"
          :key="index"
          :href="action.link"
          :target="action.target || '_self'"
          class="map__action"
          @click="onActionClick(action, $event)"
        >
          <img
            :src="`/images/icons/${action.icon}.svg`"
            alt=""
            width="24"
            height="24"
            class="map__action-icon"
          />
          <span>{{ action.text }}</span>
        </a>
      </div>

      <div class="map__content">
        <div class="map__legend">
          <div v-if="zones.length" class="map__legend-group">
            <h3 class="map__legend-title">Основные зоны</h3>
            <ul class="map__legend-list">
              <li
                v-for="zone in zones"
                :key="zone.number"
                class="map__legend-item"
                :class="{ active: activeFigure === zone.number }"
                @click.stop="handleFigureSelect(zone.number)"
              >
                <span class="map__legend-num">{{ zone.number }}.</span>
                <span class="map__legend-name">{{ zone.name }}</span>
              </li>
            </ul>
          </div>

          <div v-if="stations.length" class="map__legend-group">
            <h3 class="map__legend-title">Игровые станции</h3>
            <ul class="map__legend-list map__legend-list--tablet-columns">
              <li
                v-for="station in stations"
                :key="station.number"
                class="map__legend-item"
                :class="{ active: activeFigure === station.number }"
                @click.stop="handleFigureSelect(station.number)"
              >
                <span class="map__legend-num">{{ station.number }}.</span>
                <span class="map__legend-name">{{ station.name }}</span>
              </li>
            </ul>
          </div>
        </div>
        <div ref="mapAreaRef" class="map__map-area" id="new-map">
          <Image
            src="/images/map/map-overlay2.png"
            alt=""
            width="1160"
            height="773"
            class="map__overlay"
          />
          <svg
            class="map__svg"
            width="1160"
            height="773"
            viewBox="0 0 1160 773"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            @click="handleFigureClick"
          >
            <g id="figure 1" data-figure="1" :class="{ 'map__figure--active': activeFigure === 1 }">
              <path id="Vector" d="M920.048 605.577C927.585 605.577 933.694 599.467 933.694 591.931C933.694 584.394 927.585 578.285 920.048 578.285C912.511 578.285 906.402 584.394 906.402 591.931C906.402 599.467 912.511 605.577 920.048 605.577Z" fill="#C3AD89" stroke="#6F1510" stroke-width="0.828515" stroke-linecap="round" stroke-linejoin="round"/>
              <text x="920.048" y="591.931" class="map__figure">1</text>
            </g>
            <g id="figure 3" data-figure="3" :class="{ 'map__figure--active': activeFigure === 3 }">
              <path id="Vector_2" d="M632.939 541.077C640.476 541.077 646.585 534.967 646.585 527.431C646.585 519.894 640.476 513.785 632.939 513.785C625.403 513.785 619.293 519.894 619.293 527.431C619.293 534.967 625.403 541.077 632.939 541.077Z" fill="#C3AD89" stroke="#6F1510" stroke-width="0.828515" stroke-linecap="round" stroke-linejoin="round"/>
              <text x="632.939" y="527.431" class="map__figure">3</text>
            </g>
            <g id="figure 2" data-figure="2" :class="{ 'map__figure--active': activeFigure === 2 }">
              <path id="Vector_3" d="M653.063 469.04C660.6 469.04 666.709 462.93 666.709 455.394C666.709 447.857 660.6 441.748 653.063 441.748C645.527 441.748 639.417 447.857 639.417 455.394C639.417 462.93 645.527 469.04 653.063 469.04Z" fill="#C3AD89" stroke="#6F1510" stroke-width="0.828515" stroke-linecap="round" stroke-linejoin="round"/>
              <text x="653.063" y="455.394" class="map__figure">2</text>
            </g>
            <g id="figure 4" data-figure="4" :class="{ 'map__figure--active': activeFigure === 4 }">
              <path id="Vector_4" d="M1014.66 508.735C1022.19 508.735 1028.3 502.626 1028.3 495.089C1028.3 487.552 1022.19 481.443 1014.66 481.443C1007.12 481.443 1001.01 487.552 1001.01 495.089C1001.01 502.626 1007.12 508.735 1014.66 508.735Z" fill="#C3AD89" stroke="#6F1510" stroke-width="0.828515" stroke-linecap="round" stroke-linejoin="round"/>
              <text x="1014.66" y="495.089" class="map__figure">4</text>
            </g>
            <g id="figure 5" data-figure="5" :class="{ 'map__figure--active': activeFigure === 5 }">
              <path id="Vector_5" d="M964.346 550.374C971.883 550.374 977.992 544.264 977.992 536.728C977.992 529.191 971.883 523.082 964.346 523.082C956.81 523.082 950.7 529.191 950.7 536.728C950.7 544.264 956.81 550.374 964.346 550.374Z" fill="#C3AD89" stroke="#6F1510" stroke-width="0.828515" stroke-linecap="round" stroke-linejoin="round"/>
              <text x="964.346" y="536.728" class="map__figure">5</text>
            </g>
            <g id="figure 6" data-figure="6" :class="{ 'map__figure--active': activeFigure === 6 }">
              <path id="Vector_6" d="M987.364 452.519C994.9 452.519 1001.01 446.409 1001.01 438.873C1001.01 431.336 994.9 425.227 987.364 425.227C979.827 425.227 973.718 431.336 973.718 438.873C973.718 446.409 979.827 452.519 987.364 452.519Z" fill="#C3AD89" stroke="#6F1510" stroke-width="0.828515" stroke-linecap="round" stroke-linejoin="round"/>
              <text x="987.364" y="438.873" class="map__figure">6</text>
            </g>
            <g id="figure 7" data-figure="7" :class="{ 'map__figure--active': activeFigure === 7 }">
              <path id="Vector_7" d="M880.946 496.104C888.482 496.104 894.592 489.994 894.592 482.458C894.592 474.921 888.482 468.812 880.946 468.812C873.409 468.812 867.3 474.921 867.3 482.458C867.3 489.994 873.409 496.104 880.946 496.104Z" fill="#C3AD89" stroke="#6F1510" stroke-width="0.828515" stroke-linecap="round" stroke-linejoin="round"/>
              <text x="880.946" y="482.458" class="map__figure">7</text>
            </g>
            <g id="figure 20" data-figure="20" :class="{ 'map__figure--active': activeFigure === 20 }">
              <path id="Vector_8" d="M514.692 364.791C522.229 364.791 528.338 358.682 528.338 351.145C528.338 343.609 522.229 337.499 514.692 337.499C507.155 337.499 501.046 343.609 501.046 351.145C501.046 358.682 507.155 364.791 514.692 364.791Z" fill="#C3AD89" stroke="#6F1510" stroke-width="0.828515" stroke-linecap="round" stroke-linejoin="round"/>
              <text x="514.692" y="351.145" class="map__figure small">20</text>
            </g>
            <g id="figure 19" data-figure="19" :class="{ 'map__figure--active': activeFigure === 19 }">
              <path id="Vector_9" d="M433.872 234.363C441.408 234.363 447.518 228.253 447.518 220.716C447.518 213.18 441.408 207.07 433.872 207.07C426.335 207.07 420.226 213.18 420.226 220.716C420.226 228.253 426.335 234.363 433.872 234.363Z" fill="#C3AD89" stroke="#6F1510" stroke-width="0.828515" stroke-linecap="round" stroke-linejoin="round"/>
              <text x="433.872" y="220.72" class="map__figure small">19</text>
            </g>
            <g id="figure 18" data-figure="18" :class="{ 'map__figure--active': activeFigure === 18 }">
              <path id="Vector_10" d="M416.021 171.249C423.558 171.249 429.667 165.139 429.667 157.603C429.667 150.066 423.558 143.957 416.021 143.957C408.485 143.957 402.375 150.066 402.375 157.603C402.375 165.139 408.485 171.249 416.021 171.249Z" fill="#C3AD89" stroke="#6F1510" stroke-width="0.828515" stroke-linecap="round" stroke-linejoin="round"/>
              <text x="416.021" y="157.603" class="map__figure small">18</text>
            </g>
            <g id="figure 12" data-figure="12" :class="{ 'map__figure--active': activeFigure === 12 }">
              <path id="Vector_11" d="M605.388 254.853C612.925 254.853 619.034 248.744 619.034 241.207C619.034 233.671 612.925 227.561 605.388 227.561C597.852 227.561 591.742 233.671 591.742 241.207C591.742 248.744 597.852 254.853 605.388 254.853Z" fill="#C3AD89" stroke="#6F1510" stroke-width="0.828515" stroke-linecap="round" stroke-linejoin="round"/>
              <text x="605.388" y="241.207" class="map__figure small">12</text>
            </g>
            <g id="figure 14" data-figure="14" :class="{ 'map__figure--active': activeFigure === 14 }">
              <path id="Vector_12" d="M678.089 397.764C685.625 397.764 691.735 391.654 691.735 384.118C691.735 376.581 685.625 370.472 678.089 370.472C670.552 370.472 664.442 376.581 664.442 384.118C664.442 391.654 670.552 397.764 678.089 397.764Z" fill="#C3AD89" stroke="#6F1510" stroke-width="0.828515" stroke-linecap="round" stroke-linejoin="round"/>
              <text x="678.089" y="384.118" class="map__figure small">14</text>
            </g>
            <g id="figure 13" data-figure="13" :class="{ 'map__figure--active': activeFigure === 13 }">
              <path id="Vector_13" d="M653.214 338.636C660.75 338.636 666.86 332.526 666.86 324.99C666.86 317.453 660.75 311.344 653.214 311.344C645.677 311.344 639.567 317.453 639.567 324.99C639.567 332.526 645.677 338.636 653.214 338.636Z" fill="#C3AD89" stroke="#6F1510" stroke-width="0.828515" stroke-linecap="round" stroke-linejoin="round"/>
              <text x="653.214" y="324.99" class="map__figure small">13</text>
            </g>
            <g id="figure 9" data-figure="9" :class="{ 'map__figure--active': activeFigure === 9 }">
              <path id="Vector_14" d="M749.393 497.92C756.93 497.92 763.039 491.811 763.039 484.274C763.039 476.738 756.93 470.628 749.393 470.628C741.857 470.628 735.747 476.738 735.747 484.274C735.747 491.811 741.857 497.92 749.393 497.92Z" fill="#C3AD89" stroke="#6F1510" stroke-width="0.828515" stroke-linecap="round" stroke-linejoin="round"/>
              <text x="749.393" y="484.274" class="map__figure">9</text>
            </g>
            <g id="figure 11" data-figure="11" :class="{ 'map__figure--active': activeFigure === 11 }">
              <path id="Vector_15" d="M740.708 320.825C748.244 320.825 754.354 314.715 754.354 307.179C754.354 299.642 748.244 293.533 740.708 293.533C733.171 293.533 727.062 299.642 727.062 307.179C727.062 314.715 733.171 320.825 740.708 320.825Z" fill="#C3AD89" stroke="#6F1510" stroke-width="0.828515" stroke-linecap="round" stroke-linejoin="round"/>
              <text x="740.708" y="307.179" class="map__figure small">11</text>
            </g>
            <g id="figure 10" data-figure="10" :class="{ 'map__figure--active': activeFigure === 10 }">
              <path id="Vector_16" d="M788.079 346.69C795.615 346.69 801.725 340.581 801.725 333.044C801.725 325.508 795.615 319.398 788.079 319.398C780.542 319.398 774.433 325.508 774.433 333.044C774.433 340.581 780.542 346.69 788.079 346.69Z" fill="#C3AD89" stroke="#6F1510" stroke-width="0.828515" stroke-linecap="round" stroke-linejoin="round"/>
              <text x="788.079" y="333.044" class="map__figure small">10</text>
            </g>
            <g id="figure 15" data-figure="15" :class="{ 'map__figure--active': activeFigure === 15 }">
              <path id="Vector_17" d="M736.706 398.011C744.242 398.011 750.352 391.901 750.352 384.365C750.352 376.828 744.242 370.719 736.706 370.719C729.169 370.719 723.06 376.828 723.06 384.365C723.06 391.901 729.169 398.011 736.706 398.011Z" fill="#C3AD89" stroke="#6F1510" stroke-width="0.828515" stroke-linecap="round" stroke-linejoin="round"/>
              <text x="736.706" y="384.365" class="map__figure small">15</text>
            </g>
            <g id="figure 17" data-figure="17" :class="{ 'map__figure--active': activeFigure === 17 }">
              <path id="Vector_18" d="M480.624 192.635C488.16 192.635 494.27 186.525 494.27 178.988C494.27 171.452 488.16 165.342 480.624 165.342C473.087 165.342 466.978 171.452 466.978 178.988C466.978 186.525 473.087 192.635 480.624 192.635Z" fill="#C3AD89" stroke="#6F1510" stroke-width="0.828515" stroke-linecap="round" stroke-linejoin="round"/>
              <text x="480.624" y="178.99" class="map__figure small">17</text>
            </g>
            <g id="figure 16" data-figure="16" :class="{ 'map__figure--active': activeFigure === 16 }">
              <path id="Vector_19" d="M699.305 426.013C706.842 426.013 712.951 419.903 712.951 412.367C712.951 404.83 706.842 398.721 699.305 398.721C691.769 398.721 685.659 404.83 685.659 412.367C685.659 419.903 691.769 426.013 699.305 426.013Z" fill="#C3AD89" stroke="#6F1510" stroke-width="0.828515" stroke-linecap="round" stroke-linejoin="round"/>
              <text x="699.305" y="412.367" class="map__figure small">16</text>
            </g>
            <g id="figure 8" data-figure="8" :class="{ 'map__figure--active': activeFigure === 8 }">
              <path id="Vector_20" d="M813.384 444.865C820.921 444.865 827.031 438.755 827.031 431.218C827.031 423.682 820.921 417.572 813.384 417.572C805.848 417.572 799.738 423.682 799.738 431.218C799.738 438.755 805.848 444.865 813.384 444.865Z" fill="#C3AD89" stroke="#6F1510" stroke-width="0.828515" stroke-linecap="round" stroke-linejoin="round"/>
              <text x="813.384" y="431.22" class="map__figure">8</text>
            </g>
          </svg>

          <div
            v-if="activeFigure"
            ref="tooltipRef"
            class="map__tooltip"
            :style="tooltipStyle"
          >
            <span class="map__tooltip-text">{{ activeFigureName }}</span>
            <button class="map__tooltip-close" type="button" @click.stop="closeTooltip" aria-label="Закрыть">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M0.707031 0.707031L10.3169 10.3169M10.3169 0.707031L0.707031 10.3169" stroke="white" stroke-width="2"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </Container>
  </section>
</template>

<style lang="scss">
.map {
  background-color: $blue;
  padding: 8.2rem 0 13.2rem;

  @media (max-width: $tablet) {
    padding: 6rem 0;
  }

  @media (max-width: $mobile) {
    padding: 6rem 0 0;
  }

  &__title {
    font-family: $unbounded;
    font-size: 4.2rem;
    font-weight: 400;
    line-height: 1;
    color: $light;
    text-transform: uppercase;
    text-align: center;
    margin: 0 0 4.6rem;

    @media (max-width: $tablet) {
      font-size: 3.2rem;
      margin: 0 0 5rem;
    }

    @media (max-width: $mobile) {
      font-size: 2.4rem;
      margin: 0 0 3rem;
    }
  }

  &__actions {
    display: flex;
    width: fit-content;
    gap: 3.5rem;
    margin: 0 auto 4.3rem;

    @media (max-width: $mobile) {
      width: 100%;
      margin: 0 0 4rem;
      gap: 2rem;
      flex-direction: column;
    }
  }

  &__action {
    display: inline-flex;
    align-items: center;
    gap: 1.3rem;
    background-color: $light;
    color: $darkBlue;
    font-family: $tektur;
    font-size: 1.8rem;
    font-weight: 400;
    padding: 1.3rem 2.5rem 1.3rem 1.6rem;
    border-radius: 13px;
    text-decoration: none;
    border: none;
    cursor: pointer;
    transition: opacity 150ms ease;

    &:hover {
      opacity: 0.85;
    }

    @media (max-width: $mobile) {
      font-size: 1.4rem;
      padding: 1rem 1.4rem;
      gap: 1rem;
    }
  }

  &__action-icon {
    display: block;
    flex-shrink: 0;
  }

  &__content {
    display: grid;
    grid-template-columns: 1fr 76rem;
    gap: 4rem;
    align-items: start;

    @media (max-width: $tablet) {
      grid-template-columns: 1fr;
    }
  }

  &__legend {
    position: relative;
    padding-top: 0.8rem;
    z-index: 5;
  }

  &__legend-group {
    &:not(:last-child) {
      margin-bottom: 3rem;
    }
  }

  &__legend-title {
    font-family: $tektur;
    font-weight: 700;
    font-size: 1.8rem;
    color: $red;
    text-transform: uppercase;
    margin: 0 0 2.1rem;

    @media (max-width: $mobile) {
      font-size: 1.6rem;
    }
  }

  &__legend-list {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 0.6rem;

    @media (max-width: $tablet) {
      gap: 0;

      &--tablet-columns {
        column-count: 2;
        display: block;
      }
    }
  }

  &__legend-item {
    position: relative;
    display: flex;
    align-items: baseline;
    padding-left: 4rem;
    cursor: pointer;
    transition: opacity 150ms ease;

    &:hover {
      opacity: 0.8;
    }

    &.active:hover {
      opacity: 1;
    }

    @media (max-width: $tablet) {
      margin: 0 0 0.6rem;
    }

    @media (max-width: $mobile) {
      padding-left: 2rem;
    }
  }

  &__legend-num {
    position: absolute;
    left: -0.1rem;
    top: 0.3rem;
    font-family: $tektur;
    font-weight: 400;
    font-size: 1.4rem;
    color: $white;
    flex-shrink: 0;

    .active & {
      color: $red;
    }
  }

  &__legend-name {
    font-family: $tektur;
    font-weight: 400;
    font-size: 1.4rem;
    line-height: 1.3;
    color: $white;

    .active & {
      color: $red;

      &:before {
        content: " → "
      }
    }
  }

  &__map-area {
    position: relative;
    width: 116rem;
    height: 77.3rem;
    border-radius: 13px;
    margin-left: -40.1rem;
    margin-top: -3.9rem;
    z-index: 1;

    @media (max-width: $tablet) {

    }

    @media (max-width: $mobile) {
      height: auto;
      width: 305%;
      max-width: unset;
    }
  }

  &__overlay {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 13px;
  }

  &__svg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    [data-figure] {
      cursor: pointer;
    }
  }

  &__figure {
    font-family: $tektur;
    font-weight: 700;
    font-size: 2rem;
    fill: $white;
    text-anchor: middle;
    dominant-baseline: central;
    pointer-events: none;

    @media (max-width: $tablet) {
      font-size: 1.2rem;
    }
  }

  &__figure--active {
    rect,
    path {
      fill: $red;
    }

    .map__figure {
      fill: $white;
    }
  }

  &__tooltip {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 10;
    display: flex;
    align-items: center;
    gap: 1rem;
    background-color: $red;
    color: $white;
    font-family: $tektur;
    font-size: 1.8rem;
    font-weight: 700;
    line-height: 1;
    padding: 0.4rem 0.5rem 0.4rem 1rem;
    border-radius: 13px;
    white-space: nowrap;

    @media (max-width: $mobile) {
      max-width: 27rem;
      white-space: normal;
    }
  }

  &__tooltip-text {
    flex: 1;
  }

  &__tooltip-close {
    flex-shrink: 0;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 2rem;
    height: 2rem;
    padding: 0;
    border: none;
    background: none;
    color: $darkBlue;
    font-size: 1.6rem;
    line-height: 1;
    cursor: pointer;
    border-radius: 4px;
    transition: opacity 150ms ease;

    &:hover {
      opacity: 0.6;
    }
  }
}
</style>
