export const setLocalStorage = (arr: { [key: string]: string }[]) => {
  arr.forEach(item => {
    window.localStorage.setItem(item.key, item.value)
  })
}

export const getLocalStorage = (key: string) => {
  return window.localStorage.getItem(key) || ''
}

export const removeLocalStorage = (key: string[]) => {
  key.forEach(item => {
    window.localStorage.removeItem(item)
  })
}
