const INFO_KEY = 'shopping-info'
const SEARCH_HISTORY_KEY = 'search-history'

export const getInfo = () => {
  const info = localStorage.getItem(INFO_KEY)
  if (info) {
    return JSON.parse(info)
  }

  return {
    userId: '',
    token: ''
  }
}

export const setInfo = (info) => {
  localStorage.setItem(INFO_KEY, JSON.stringify(info))
}

export const removeInfo = () => {
  localStorage.removeItem(INFO_KEY)
}

export const getSearchHistoryList = () => {
  const item = localStorage.getItem(SEARCH_HISTORY_KEY)
  return item ? JSON.parse(item) : []
}

export const setSearchHistoryList = (arr) => {
  localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(arr))
}
