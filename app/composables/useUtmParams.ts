import {
  appendUtmParams,
  extractUtmParams,
  extractUtmParamsFromSearch,
} from '~/utils/tracking'

type UtmParams = ReturnType<typeof extractUtmParams>

export const useUtmParams = () => {
  const route = useRoute()
  const utmParams = useState<UtmParams>('landing-utm-params', () => ({}))
  const isHydrated = ref(false)

  const getBrowserUtmParams = () => {
    if (!import.meta.client) {
      return {}
    }

    return extractUtmParamsFromSearch(window.location.search)
  }

  onMounted(() => {
    const browserParams = getBrowserUtmParams()
    utmParams.value = Object.keys(browserParams).length
      ? browserParams
      : extractUtmParams(route.query as Record<string, unknown>)
    isHydrated.value = true
  })

  const withUtmParams = (href: string) => {
    if (!isHydrated.value) {
      return href
    }

    return appendUtmParams(href, utmParams.value)
  }

  const withUtmParamsForClick = (href: string) => {
    if (!import.meta.client) {
      return href
    }

    const browserParams = getBrowserUtmParams()
    const params = Object.keys(browserParams).length ? browserParams : utmParams.value

    return appendUtmParams(href, params)
  }

  return {
    withUtmParams,
    withUtmParamsForClick,
  }
}
