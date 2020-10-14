import Macy from 'macy'

export const macy = () => {
  if (document.querySelectorAll('.macy-container').length) {
    let macy = Macy({
      container: '.macy-container',
      trueOrder: false,
      waitForImages: true,
      margin: 15,
      columns: 3,
      breakAt: {
        575: {
          columns: 2,
          margin: 5,
        },
      },
    })
    let gallery = document.querySelector('.gallery')

    macy.runOnImageLoad(() => {
      gallery.classList.add('wow')
      gallery.classList.add('fade-in-1_5s')
      gallery.style.display = 'flex'

      document.querySelector('.footer').classList.add('fade-in-1_5s')
      document.querySelector('.footer').style.display = 'flex'
    }, true)
  }
}
