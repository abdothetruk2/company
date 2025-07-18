export const useDebounceFn = (fn, delay = 300) => {
  let timeoutId = null
  
  return (...args) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => fn(...args), delay)
  }
}