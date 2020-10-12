import modals from './modules/modals'
import sliders from './modules/sliders'
import forms from './modules/forms'
import mask from './modules/mask'
import tabs from './modules/tabs'
import { WOW } from 'wowjs'
import Macy from 'macy'

window.addEventListener('DOMContentLoaded', () => {
  'use strict'

  if (document.querySelectorAll('.visualization__items').length) modals()

  // tabs(
  //   ".visualization__tabs",
  //   ".visualization__tab",
  //   ".visualization__items",
  //   "active"
  //   );
  const wow = new WOW({
    boxClass: 'wow', // animated element css class (default is wow)
    animateClass: '', // animation css class (default is animated)
    offset: 0, // distance to the element when triggering the animation (default is 0)
    mobile: true, // trigger animations on mobile devices (default is true)
    live: true, // act on asynchronously loaded content (default is true)
    scrollContainer: null, // optional scroll container selector, otherwise use window
  })
  wow.init()

  if (document.querySelectorAll('.macy-container').length) {
    let macy = Macy({
      container: '.macy-container',
      trueOrder: false,
      waitForImages: false,
      margin: 5,
      columns: 3,
      breakAt: {
        1200: 3,
        940: 3,
        520: 2,
        400: 2,
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

  if (document.querySelectorAll('.consultation__form').length) {
    mask('.consultation__phone')
    forms(
      '.consultation__form',
      '.consultation__button',
      '.consultation__status'
    )
  }
})
