/**
 * @class Debouncer
 * @description Ensure an action only gets called once
 * within a period of delay plus the amount of time it takes
 * to resolve the original function.
 */
class Debouncer {
  // public static instance: Debouncer
  public static instances: Record<string, Debouncer> = {}
  private locked: boolean = false
  private delayMs: number

  private constructor(delayMs: number) {
    this.delayMs = delayMs
  }

  /**
   * Get Debouncer Instance
   *
   * @param id Used to distinguish between different debouncers
   * for different contexts.
   * @param delayMs Total amount of time, in milliseconds, to pad
   * the callback in. This time is split and added before and
   * after the action.
   */
  public static getInstance(id: string, delayMs: number = 0) {
    if (!(id in Debouncer.instances)) {
      Object.assign(Debouncer.instances, { [id]: new Debouncer(delayMs) })
    }

    return Debouncer.instances[id]
  }

  private lock() {
    this.locked = true
  }

  private async unlock() {
    await new Promise((resolve) => setTimeout(resolve, this.delayMs))
    this.locked = false
  }

  public async debounce(cb: () => Promise<void> | void) {
    if (!this.locked) {
      this.lock()
      await cb()
      await this.unlock()
    } else return
  }
}

/**
 * Debounce function
 *
 * @param cb The function to debounce
 * @param delayMs Amount of time to wait after execution of the function
 * before another instance is allowed to run.
 */
export const debounce = async (
  cb: () => Promise<void> | void,
  delayMs: number = 0,
  id?: string,
) => {
  const cbKey = id ?? cb.toString()
  const debouncer = Debouncer.getInstance(cbKey, delayMs)
  return debouncer.debounce(cb)
}
