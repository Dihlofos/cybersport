const TMR_ID = 3789320
const TIMEPAD_HOST = 'kiberzarnitsa.timepad.ru'
const UTM_KEYS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_content',
  'utm_term',
] as const
const MAX_UTM_VALUE_LENGTH = 500

type TMRGoal = 'rega' | 'click' | 'timepad'
type TMRPayload = { id: number; goal: TMRGoal }
type TMRQueueItem = TMRPayload & { type: 'reachGoal' }
type TMR = {
  push?: (payload: TMRQueueItem) => void
  reachGoal?: (payload: TMRPayload) => void
}
type UtmKey = (typeof UTM_KEYS)[number]
type UtmParams = Partial<Record<UtmKey, string>>

const normalizeUtmValue = (value: unknown) => {
  if (typeof value !== 'string') {
    return null
  }

  const normalizedValue = value.trim()

  if (
    !normalizedValue
    || normalizedValue.length > MAX_UTM_VALUE_LENGTH
    || /[\x00-\x1F\x7F]/.test(normalizedValue)
  ) {
    return null
  }

  return normalizedValue
}

export const extractUtmParams = (query: Record<string, unknown>): UtmParams => {
  const params: UtmParams = {}

  for (const key of UTM_KEYS) {
    const values = Array.isArray(query?.[key]) ? query[key] : [query?.[key]]
    const value = values
      .map(normalizeUtmValue)
      .find((normalizedValue): normalizedValue is string => Boolean(normalizedValue))

    if (value) {
      params[key] = value
    }
  }

  return params
}

export const extractUtmParamsFromSearch = (search: string): UtmParams => {
  const searchParams = new URLSearchParams(search)
  const query: Record<string, unknown> = {}

  for (const key of UTM_KEYS) {
    query[key] = searchParams.getAll(key)
  }

  return extractUtmParams(query)
}

const isAllowedTimepadUrl = (url: URL) => (
  url.protocol === 'https:'
  && url.hostname === TIMEPAD_HOST
  && !url.username
  && !url.password
  && (url.port === '' || url.port === '443')
)

export const appendUtmParams = (href: string, params: UtmParams) => {
  if (typeof href !== 'string') {
    return href
  }

  const normalizedParams: UtmParams = {}

  for (const key of UTM_KEYS) {
    const value = normalizeUtmValue(params[key])

    if (value) {
      normalizedParams[key] = value
    }
  }

  if (!Object.keys(normalizedParams).length) {
    return href
  }

  try {
    const url = new URL(href)

    if (!isAllowedTimepadUrl(url)) {
      return href
    }

    for (const [key, value] of Object.entries(normalizedParams)) {
      url.searchParams.set(key, value)
    }

    return url.toString()
  } catch {
    return href
  }
}

const getTMR = (): TMR | null => {
  if (typeof window === 'undefined') {
    return null
  }

  const trackedWindow = window as typeof window & { _tmr?: TMR }
  const currentTMR = trackedWindow._tmr

  if (
    currentTMR
    && (
      Array.isArray(currentTMR)
      || typeof currentTMR.push === 'function'
      || typeof currentTMR.reachGoal === 'function'
    )
  ) {
    return currentTMR
  }

  trackedWindow._tmr = []
  return trackedWindow._tmr
}

export const pushTMRGoal = (goal: TMRGoal) => {
  const tmr = getTMR()
  const payload = { id: TMR_ID, goal }

  if (!tmr) {
    return
  }

  if (typeof tmr.reachGoal === 'function') {
    tmr.reachGoal(payload)
    return
  }

  if (typeof tmr.push === 'function') {
    tmr.push({ ...payload, type: 'reachGoal' })
  }
}

export const isTimepadLink = (href: string) => {
  try {
    return isAllowedTimepadUrl(new URL(href))
  } catch {
    return false
  }
}

export const trackRegistrationClick = (sectionGoal: 'rega' | 'click', href: string) => {
  pushTMRGoal(sectionGoal)

  if (isTimepadLink(href)) {
    pushTMRGoal('timepad')
  }
}
