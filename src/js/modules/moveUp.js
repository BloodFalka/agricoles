export const moveUp = (showingPosition = 1800) => {
  window.addEventListener('scroll', () => {
    let windowY = window.scrollY
    let up = document.querySelector('#up')

    if (windowY < showingPosition) {
      up.classList.add('fade-out-1_5s')
    } else {
      up.classList.remove('fade-out-1_5s')
      up.classList.add('fade-in-1_5s')
      up.style.display = 'block'
      // Scrolling DOWN
    }
  })

  document.querySelector('#up').addEventListener('click', (ev) => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  })
}
