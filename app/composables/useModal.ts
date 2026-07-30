import { ref, inject, provide, type InjectionKey, type Ref } from 'vue'

export interface ModalSection {
  icon: string
  title: string
  text: string
}

export interface ModalOptions {
  title: string
  address?: string
  sections?: ModalSection[]
}

interface ModalState {
  isOpen: Ref<boolean>
  options: Ref<ModalOptions | null>
  triggerEl: Ref<HTMLElement | null>
  open: (opts: ModalOptions, trigger?: HTMLElement) => void
  close: () => void
}

export const MODAL_KEY: InjectionKey<ModalState> = Symbol('modal')

export function useModalProvider() {
  const isOpen = ref(false)
  const options = ref<ModalOptions | null>(null)
  const triggerEl = ref<HTMLElement | null>(null)

  function lockScroll() {
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
    document.body.style.overflow = 'hidden'
    document.body.style.paddingRight = `${scrollbarWidth}px`
  }

  function unlockScroll() {
    document.body.style.overflow = ''
    document.body.style.paddingRight = ''
  }

  function open(opts: ModalOptions, trigger?: HTMLElement) {
    options.value = opts
    triggerEl.value = trigger ?? null
    isOpen.value = true
    lockScroll()
  }

  function close() {
    isOpen.value = false
    unlockScroll()
    if (triggerEl.value) {
      triggerEl.value.focus()
      triggerEl.value = null
    }
  }

  const state: ModalState = { isOpen, options, triggerEl, open, close }

  provide(MODAL_KEY, state)

  return state
}

export function useModal(): ModalState {
  const modal = inject(MODAL_KEY)
  if (!modal) {
    throw new Error('useModal() must be used inside a component tree with useModalProvider()')
  }
  return modal
}
