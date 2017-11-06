const TokenKey = 'Admin-Token'
const name = 'name'

export function getToken() {
  return sessionStorage.getItem(TokenKey)
}

export function setToken(token) {
  return sessionStorage.setItem(TokenKey, token)
}

export function removeToken() {
  return sessionStorage.removeItem(TokenKey)
}

export function getName() {
  return sessionStorage.getItem(name)
}

export function setName(username) {
  return sessionStorage.setItem(name, username)
}

export function removeName() {
  return sessionStorage.removeItem(name)
}
