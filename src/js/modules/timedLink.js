export default window.createTimedLink = function createTimedLink(
  element,
  timeout
) {
  setTimeout(() => {
    window.location = element.href
  }, timeout)
  return false
}
