const modals = () => {
  let btnPressed = false,
    btnDestroyed = false

  function bindModal(
    triggerSelector,
    modalSelector,
    closeSelector,
    destroyTrigger = false
  ) {
    const trigger = document.querySelectorAll(triggerSelector),
      modal = document.querySelector(modalSelector),
      close = document.querySelector(closeSelector),
      windows = document.querySelectorAll('[data-modal]')
    scroll = calcScroll()

    trigger.forEach((item, i) => {
      item.addEventListener('click', (e) => {
        const selectedImgSrc = e.target.getAttribute('src')
        if (e.target) {
          e.preventDefault()
        }

        btnPressed = true

        if (destroyTrigger) {
          item.remove()
          btnDestroyed = true
        }

        // if (item.dataset.isActive == 'true') {
        windows.forEach((item) => {
          item.style.display = 'none'
          item.classList.add('fade-in')
          document.body.style.overflow = ''
          document.querySelector('body').style.marginRight = `0px`
          // if (!btnDestroyed) {
          //   document.querySelector('.fixed-gift').style.marginRight = `0px`
          // }
        })

        modal.querySelector('img').setAttribute('src', selectedImgSrc)
        modal.style.display = 'flex'
        document.body.style.overflow = 'hidden'
        if (
          !/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(
            navigator.userAgent
          )
        ) {
          document.querySelector('body').style.marginRight = `${scroll}px`
        }
      })
    })

    close.addEventListener('click', () => {
      windows.forEach((item) => {
        item.style.display = 'none'
        // if ((document.querySelector('[data-modal-images]').style.display === 'none')){
        document.body.style.overflow = ''
        document.querySelector('body').style.marginRight = `0px`
        if (!btnDestroyed) {
          document.querySelector('.fixed-gift').style.marginRight = `0px`
        }

        try {
          if (modal.hasChildNodes('.status')) {
            document
              .querySelectorAll('.status')
              .forEach((item) => item.remove())

            modal.querySelector('form').style.display = 'block'
            modal.querySelector('form').classList.remove('fadeOut')
            modal.querySelector('form').classList.add('fadeIn')
          }
        } catch {}
        // // }else{
        //     document.body.style.overflow = 'hidden';
        //     document.querySelector('body').style.marginRight = `${scroll}px`;
        // // }
      })
    })

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        windows.forEach((item) => {
          item.style.display = 'none'
          // if((document.querySelector('[data-modal-images]').style.display === 'none')){
          document.body.style.overflow = ''
          document.querySelector('body').style.marginRight = `0px`

          try {
            if (modal.hasChildNodes('.status')) {
              document
                .querySelectorAll('.status')
                .forEach((item) => item.remove())

              modal.querySelector('form').style.display = 'block'
              modal.querySelector('form').classList.remove('fadeOut')
              modal.querySelector('form').classList.add('fadeIn')
            }
          } catch {}
          // } else{
          // document.body.style.overflow = 'hidden';
          // document.querySelector('body').style.marginRight = `${scroll}px`;
          // }
        })
      }
    })
  }

  function calcScroll() {
    let div = document.createElement('div')

    div.style.width = '50px'
    div.style.height = '50px'
    div.style.overflowY = 'scroll'
    div.style.visibility = 'hidden'

    document.body.appendChild(div)
    let scrollWidth = div.offsetWidth - div.clientWidth
    div.remove()

    return scrollWidth
  }

  bindModal(
    '.visualization__items>img',
    '.gallery__popup',
    '.gallery__popup .popup-close'
  )
}

export default modals
