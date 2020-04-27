const debounce = (func, delay = 400) => {
  let timerId
  return function (...args) {
    if (timerId) clearTimeout(timerId)
    timerId = setTimeout(() => {
      func && func.call(this, ...args)
    }, delay)
  }
}

const throttle = (func, interval = 400) => {
  let start = 0
  return function (...args) {
    if (new Date() - start > interval) {
      func && func.apply(this, args)
      start = new Date()
    }
  }
}

export { debounce, throttle }
