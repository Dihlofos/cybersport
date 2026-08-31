const TMR_ID = 3789320
const TIMEPAD_HOST = 'kiberzarnitsa.timepad.ru'

type TMRGoal = 'rega' | 'click' | 'timepad'
type TMRPayload = { id: number; goal: TMRGoal }
type TMRQueueItem = TMRPayload & { type: 'reachGoal' }
type TMR = {
  push?: (payload: TMRQueueItem) => void
  reachGoal?: (payload: TMRPayload) => void
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
    return new URL(href).hostname === TIMEPAD_HOST
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
