import { appendUtmParams, extractUtmParamsFromSearch, isTimepadLink } from '~/utils/tracking'

export default defineNuxtPlugin(() => {
  document.addEventListener('click', (event) => {
    const target = event.target

    if (!(target instanceof Element)) {
      return
    }

    const link = target.closest('a')

    if (!link || !isTimepadLink(link.href)) {
      return
    }

    const href = appendUtmParams(link.href, extractUtmParamsFromSearch(window.location.search))

    if (href !== link.href) {
      link.href = href
    }
  }, true)
})
