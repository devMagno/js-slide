import Slide from './slide.js'

export default class SlideNav extends Slide {
  addArrow(prev, next) {
    this.prevElement = document.querySelector(prev)
    this.nextElement = document.querySelector(next)
    this.addArrowEvents()
  }

  addArrowEvents() {
    this.prevElement.addEventListener('click', this.activatePrevSlide)
    this.nextElement.addEventListener('click', this.activateNextSlide)
  }
}
