import { macy } from './modules/macy'
import modals from './modules/modals'
import sliders from './modules/sliders'
import forms from './modules/forms'
import mask from './modules/mask'
import tabs from './modules/tabs'
import { useWow } from './modules/wow'
import createTimedLink from './modules/timedLink'
import { moveUp } from './modules/moveUp'

window.addEventListener('DOMContentLoaded', () => {
  'use strict'

  if (document.querySelectorAll('.visualization__items').length) modals()
  macy()
  useWow()

  if (document.querySelectorAll('.consultation__form').length) {
    mask('.consultation__phone')
    forms(
      '.consultation__form',
      '.consultation__button',
      '.consultation__status'
    )
  }

  moveUp()
})
