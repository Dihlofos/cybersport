import { appendUtmParams, extractUtmParams } from '~/utils/tracking'

type UtmParams = ReturnType<typeof extractUtmParams>

export const useUtmParams = () => {
  const route = useRoute()
  const utmParams = useState<UtmParams>('landing-utm-params', () => ({}))
  const isHydrated = ref(false)

  onMounted(() => {
    utmParams.value = extractUtmParams(route.query as Record<string, unknown>)
    isHydrated.value = true
  })

  const withUtmParams = (href: string) => {
    if (!isHydrated.value) {
      return href
    }

    return appendUtmParams(href, utmParams.value)
  }

  return {
    withUtmParams,
  }
}
