import { moveUp } from './modules/moveUp'
import sliders from './modules/sliders'
import { Swiper, Navigation, Pagination, Autoplay } from 'swiper'
window.addEventListener('DOMContentLoaded', () => {
  'use strict'
  Swiper.use([Navigation, Pagination, Autoplay])
  const MainSwiper = new Swiper('.main-slider', {
    loop: true,
    autoplay: true,
    autoplaySpeed: 5000,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      dynamicBullets: true,
    },
  })

  const Hm = document.querySelector('.header__hamburger-menu')
  Hm.addEventListener('click', (e) => {
    if (e.target) {
      const nav = document.querySelector('.header__navigation')
      Hm.classList.toggle('open')
      document.body.classList.toggle('lock-scroll')

      nav.classList.toggle('open')
    }
  })

  moveUp()
})
