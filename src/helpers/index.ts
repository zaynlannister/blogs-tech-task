type AnyFunction = (...args: any[]) => void

export function debounce(func: AnyFunction, delay: number): AnyFunction {
  let timeoutId: number

  return function (this: any, ...args: any[]) {
    const context = this

    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => {
      func.apply(context, args)
    }, delay)
  }
}
