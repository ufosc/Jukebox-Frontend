import { createContext, useEffect, type ReactNode } from 'react'
import { debounce } from 'src/utils'

/**
 * Debounced keyboard key listeners.
 */
export const KeyboardContext = createContext({
  onKey: (char: string, cb: () => void) => {},
  onArrow: (direction: 'up' | 'right' | 'down' | 'left', cb: () => void) => {},
  onReturn: (cb: () => void) => {},
  onSpace: (cb: () => void) => {},
  onNumber: (num: number, cb: () => void) => {},
  onEscape: (cb: () => void) => {},
})

export const KeyboardProvider = (props: { children?: ReactNode }) => {
  const { children } = props
  const keyCallbacks: {
    [key: string]: Array<() => void>
  } = {}
  const arrowKeys = {
    up: 'ArrowUp',
    right: 'ArrowRight',
    down: 'ArrowDown',
    left: 'ArrowLeft',
  }

  const deboundedTimeout = 500

  const addKeyCb = (key: string, cb: () => void) => {
    if (Object.keys(keyCallbacks).includes(key)) {
      if (!keyCallbacks[key].some((ecb) => ecb.toString() === cb.toString())) {
        keyCallbacks[key].push(cb)
      }
    } else {
      keyCallbacks[key] = [cb]
    }
  }

  const onKey = (char: string, cb: () => void) => {
    addKeyCb(char, cb)
  }
  const onArrow = (
    direction: 'up' | 'right' | 'down' | 'left',
    cb: () => void,
  ) => {
    addKeyCb(arrowKeys[direction], cb)
  }
  const onReturn = (cb: () => void) => {
    addKeyCb('Enter', cb)
  }
  const onSpace = (cb: () => void) => {
    addKeyCb('Space', cb)
  }
  const onNumber = (num: number, cb: () => void) => {
    addKeyCb(String(num), cb)
  }
  const onEscape = (cb: () => void) => {
    addKeyCb('Escape', cb)
  }

  const triggerKeyCallbacks = (
    key: string,
    e: globalThis.KeyboardEvent,
    debounceAction = false,
  ) => {
    if (Object.keys(keyCallbacks).includes(key)) {
      e.preventDefault()
      const delay = (debounceAction && deboundedTimeout) || 0

      for (const cb of keyCallbacks[key]) {
        debounce(cb, delay)
      }
    }
  }

  useEffect(() => {
    const listener = (e: globalThis.KeyboardEvent) => {
      const target = e.target as HTMLElement | undefined
      if (e.isComposing || target?.tagName.toUpperCase() === 'INPUT') {
        return
      }
      console.log('Keydown:', e)
      if (e.key === ' ') {
        triggerKeyCallbacks('Space', e, true)
      } else {
        triggerKeyCallbacks(e.key, e)
      }
    }
    document.addEventListener('keydown', listener)

    return () => document.removeEventListener('keydown', listener)
  }, [])

  return (
    <KeyboardContext.Provider
      value={{ onKey, onArrow, onReturn, onSpace, onNumber, onEscape }}
    >
      {children}
    </KeyboardContext.Provider>
  )
}
