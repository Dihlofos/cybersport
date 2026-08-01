<script setup>
import { ref, computed, watch, nextTick, onMounted, onUnmounted } from 'vue'
import { computePosition, autoUpdate, offset, flip, shift } from '@floating-ui/dom'
import { useModal } from '~/composables/useModal'
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
const tooltipStyle = ref({ position: 'absolute', top: '0px', left: '0px' })

let positionCleanup = null

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

function startPositioning() {
  stopPositioning()

  if (!activeFigureEl.value || !tooltipRef.value) return

  const reference = activeFigureEl.value
  const middleware = [offset(12), flip(), shift({ padding: 8 })]

  computePosition(reference, tooltipRef.value, { placement: 'left', middleware }).then(({ x, y }) => {
    tooltipStyle.value = { position: 'absolute', top: `${y}px`, left: `${x}px` }
  })

  positionCleanup = autoUpdate(reference, tooltipRef.value, () => {
    computePosition(reference, tooltipRef.value, { placement: 'left', middleware }).then(({ x, y }) => {
      tooltipStyle.value = { position: 'absolute', top: `${y}px`, left: `${x}px` }
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

        <div class="map__map-area">
          <Image
            src="/images/map/map-overlay.jpg"
            alt=""
            width="760"
            height="605"
            class="map__overlay"
          />
          <svg
            class="map__svg"
            width="760"
            height="605"
            viewBox="0 0 760 605"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            @click="handleFigureClick"
          >
            <g id="figure 2" data-figure="2" :class="{ 'map__figure--active': activeFigure === 2 }" transform="rotate(-41.8478 473.302 531.108)">
              <rect id="Rectangle 489" x="473.302" y="531.108" width="51.3989" height="36.185" fill="#C3AD89" stroke="#F32F0A" stroke-width="1.09605"/>
              <text x="499" y="549" transform="rotate(41.8478 499 549)" class="map__figure">2</text>
            </g>
            <g id="figure 1" data-figure="1" :class="{ 'map__figure--active': activeFigure === 1 }" transform="rotate(-41.8478 366.195 411.394)">
              <rect id="Rectangle 489_2" x="366.195" y="411.394" width="36.8627" height="13.9166" fill="#C3AD89" stroke="#F32F0A" stroke-width="1.09605"/>
              <text x="384.6" y="418.4" transform="rotate(41.8478 384.6 418.4)" class="map__figure">1</text>
            </g>
            <g id="figure 4" data-figure="4" :class="{ 'map__figure--active': activeFigure === 4 }" transform="rotate(-41.8478 403.716 408.792)">
              <rect id="Rectangle 489_3" x="403.716" y="408.792" width="20.6595" height="39.9237" fill="#C3AD89" stroke="#F32F0A" stroke-width="1.09605"/>
              <text x="414" y="428.8" transform="rotate(41.8478 414 428.8)" class="map__figure">4</text>
            </g>
            <g id="figure 13" data-figure="13" :class="{ 'map__figure--active': activeFigure === 13 }" transform="rotate(-41.8478 450.167 363.902)">
              <rect id="Rectangle 489_4" x="450.167" y="363.902" width="20.6595" height="39.9237" fill="#C3AD89" stroke="#F32F0A" stroke-width="1.09605"/>
              <text x="460.5" y="383.9" transform="rotate(41.8478 460.5 383.9)" class="map__figure">13</text>
            </g>
            <g id="figure 7" data-figure="7" :class="{ 'map__figure--active': activeFigure === 7 }" transform="rotate(-41.8478 216.2 37.1603)">
              <rect id="Rectangle 489_5" x="216.2" y="37.1603" width="12.4565" height="26.4101" fill="#C3AD89" stroke="#F32F0A" stroke-width="1.09605"/>
              <text x="222.4" y="50.4" transform="rotate(41.8478 222.4 50.4)" class="map__figure">7</text>
            </g>
            <g id="figure 6" data-figure="6" :class="{ 'map__figure--active': activeFigure === 6 }" transform="rotate(-41.8478 230.899 64.775)">
              <rect id="Rectangle 489_6" x="230.899" y="64.775" width="19.3978" height="19.3703" fill="#C3AD89" stroke="#F32F0A" stroke-width="1.09605"/>
              <text x="240.6" y="74.5" transform="rotate(41.8478 240.6 74.5)" class="map__figure">6</text>
            </g>
            <g id="figure 5_1" data-figure="5" :class="{ 'map__figure--active': activeFigure === 5 }" transform="rotate(-41.8478 348.479 240.392)">
              <rect id="Rectangle 489_7" x="348.479" y="240.392" width="19.3978" height="19.3703" fill="#C3AD89" stroke="#F32F0A" stroke-width="1.09605"/>
              <text x="358.2" y="250.1" transform="rotate(41.8478 358.2 250.1)" class="map__figure">5</text>
            </g>
            <g id="figure 11" data-figure="11" :class="{ 'map__figure--active': activeFigure === 11 }" transform="rotate(-41.8478 373.94 266.798)">
              <rect id="Rectangle 489_8" x="373.94" y="266.798" width="30.1674" height="23.5698" fill="#C3AD89" stroke="#F32F0A" stroke-width="1.09605"/>
              <text x="389" y="278.6" transform="rotate(41.8478 389 278.6)" class="map__figure">11</text>
            </g>
            <g id="figure 8" data-figure="8" :class="{ 'map__figure--active': activeFigure === 8 }" transform="rotate(-41.8478 405.663 219.117)">
              <rect id="Rectangle 489_9" x="405.663" y="219.117" width="19.3978" height="19.3703" fill="#C3AD89" stroke="#F32F0A" stroke-width="1.09605"/>
              <text x="415.4" y="228.8" transform="rotate(41.8478 415.4 228.8)" class="map__figure">8</text>
            </g>
            <g id="figure 10" data-figure="10" :class="{ 'map__figure--active': activeFigure === 10 }" transform="rotate(-41.8478 425.055 320.192)">
              <rect id="Rectangle 489_10" x="425.055" y="320.192" width="19.3978" height="19.3703" fill="#C3AD89" stroke="#F32F0A" stroke-width="1.09605"/>
              <text x="434.8" y="329.9" transform="rotate(41.8478 434.8 329.9)" class="map__figure">10</text>
            </g>
            <g id="figure 18" data-figure="18" :class="{ 'map__figure--active': activeFigure === 18 }" transform="rotate(-41.8478 516.358 400.692)">
              <rect id="Rectangle 489_11" x="516.358" y="400.692" width="19.3978" height="19.3703" fill="#C3AD89" stroke="#F32F0A" stroke-width="1.09605"/>
              <text x="526.1" y="410.4" transform="rotate(41.8478 526.1 410.4)" class="map__figure">18</text>
            </g>
            <g id="figure 14" data-figure="14" :class="{ 'map__figure--active': activeFigure === 14 }" transform="rotate(-41.8478 419.754 360.246)">
              <rect id="Rectangle 489_12" x="419.754" y="360.246" width="19.3978" height="19.3703" fill="#C3AD89" stroke="#F32F0A" stroke-width="1.09605"/>
              <text x="429.5" y="369.9" transform="rotate(41.8478 429.5 369.9)" class="map__figure">14</text>
            </g>
            <g id="figure 5_2" data-figure="5" :class="{ 'map__figure--active': activeFigure === 5 }" transform="rotate(-41.8478 443.033 303.409)">
              <rect id="Rectangle 489_13" x="443.033" y="303.409" width="19.3978" height="19.3703" fill="#C3AD89" stroke="#F32F0A" stroke-width="1.09605"/>
              <text x="452.7" y="313.1" transform="rotate(41.8478 452.7 313.1)" class="map__figure">5</text>
            </g>
            <g id="figure 16" data-figure="16" :class="{ 'map__figure--active': activeFigure === 16 }" transform="rotate(-41.8478 534.337 383.909)">
              <rect id="Rectangle 489_14" x="534.337" y="383.909" width="19.3978" height="19.3703" fill="#C3AD89" stroke="#F32F0A" stroke-width="1.09605"/>
              <text x="544" y="393.6" transform="rotate(41.8478 544 393.6)" class="map__figure">16</text>
            </g>
            <g id="figure 15" data-figure="15" :class="{ 'map__figure--active': activeFigure === 15 }" transform="rotate(-41.8478 533.748 345.204)">
              <rect id="Rectangle 489_15" x="533.748" y="345.204" width="8.41758" height="30.9737" fill="#C3AD89" stroke="#F32F0A" stroke-width="1.09605"/>
              <text x="538" y="360.7" transform="rotate(41.8478 538 360.7)" class="map__figure small">15</text>
            </g>
            <g id="figure 17" data-figure="17" :class="{ 'map__figure--active': activeFigure === 17 }" transform="rotate(6.14117 502.743 446.275)">
              <rect id="Rectangle 489_16" x="502.743" y="446.275" width="12.3089" height="23.7182" fill="#C3AD89" stroke="#F32F0A" stroke-width="1.09605"/>
              <text x="508.9" y="458.1" transform="rotate(-6.14117 508.9 458.1)" class="map__figure small">17</text>
            </g>
            <g id="figure 12" data-figure="12" :class="{ 'map__figure--active': activeFigure === 12 }" transform="rotate(-41.8478 425.503 241.008)">
              <rect id="Rectangle 489_17" x="425.503" y="241.008" width="19.3978" height="19.3703" fill="#C3AD89" stroke="#F32F0A" stroke-width="1.09605"/>
              <text x="435.2" y="250.7" transform="rotate(41.8478 435.2 250.7)" class="map__figure">12</text>
            </g>
            <g id="figure 19" data-figure="19" :class="{ 'map__figure--active': activeFigure === 19 }" transform="rotate(-41.8478 298.241 110.764)">
              <rect id="Rectangle 489_18" x="298.241" y="110.764" width="22.0123" height="123.709" fill="#C3AD89" stroke="#F32F0A" stroke-width="1.09605"/>
              <text x="309.2" y="172.6" transform="rotate(41.8478 309.2 172.6)" class="map__figure">19</text>
            </g>
            <g id="figure 3" data-figure="3" :class="{ 'map__figure--active': activeFigure === 3 }" transform="rotate(0.970437 207.974 100.658)">
              <rect id="Rectangle 489_19" x="207.974" y="100.658" width="53.2104" height="117.219" fill="#C3AD89" stroke="#F32F0A" stroke-width="1.09605"/>
              <text x="234.6" y="159.3" transform="rotate(-0.970437 234.6 159.3)" class="map__figure">3</text>
            </g>
            <g id="figure 9" data-figure="9" :class="{ 'map__figure--active': activeFigure === 9 }" transform="rotate(0.970437 278.294 214.136)">
              <rect id="Rectangle 489_20" x="278.294" y="214.136" width="64.6588" height="23.9899" fill="#C3AD89" stroke="#F32F0A" stroke-width="1.09605"/>
              <text x="310.6" y="226.1" transform="rotate(-0.970437 310.6 226.1)" class="map__figure">9</text>
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
    padding: 6rem 0 8rem;
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
    margin: 0 auto 10.3rem;
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
    padding-top: 0.8rem;
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
    gap: 0.9rem;

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
    width: 76rem;
    height: 60.5rem;
    border-radius: 13px;

    &::after,
    &::before {
      content: '';
      position: absolute;
      width: 7rem;
      height: 7rem;
      border-color: $light;
      background: transparent;

      @media (max-width: $tablet) {
        display: none;
      }
    }

    &::before {
      top: -2.4rem;
      right: -2.4rem;
      border-top: 1.2rem solid #C3AD89;
      border-right: 1.2rem solid #C3AD89;
    }

    &::after {
      bottom: -2.4rem;
      left: -2.4rem;
      border-bottom: 1.2rem solid #C3AD89;
      border-left: 1.2rem solid #C3AD89;
    }

    @media (max-width: $tablet) {
      width: 100%;
      height: auto;
      aspect-ratio: 760 / 605;
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
    font-size: 1.5rem;
    fill: $red;
    text-anchor: middle;
    dominant-baseline: central;
    pointer-events: none;

    &.small {
      font-size: 1.1rem;
    }

    @media (max-width: $tablet) {
      font-size: 1.2rem;
    }
  }

  &__figure--active {
    rect {
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
    font-size: 1.4rem;
    font-weight: 400;
    line-height: 1.4;
    padding: 0.4rem 0.5rem 0.4rem 1rem;
    border-radius: 13px;
    white-space: nowrap;
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

  @media (max-width: $mobile) {
    padding: 5rem 0 6rem;
  }
}
</style>
