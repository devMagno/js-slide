export default class Slide {
  constructor(slide, wrapper) {
    this.slide = document.querySelector(slide)
    this.wrapper = document.querySelector(wrapper)
    this.distance = { finalPosition: 0, startX: 0, movement: 0 }
  }

  updatePosition(clientX) {
    this.distance.movement = (this.distance.startX - clientX) * 1.6
    return this.distance.finalPosition - this.distance.movement
  }

  moveSlide(distanceX) {
    this.distance.movedTo = distanceX
    this.slide.style.transform = `translate3D(${distanceX}px, 0, 0)`
  }

  onStart(event) {
    event.preventDefault()
    this.wrapper.addEventListener('mousemove', this.onMove)
    this.distance.startX = event.clientX
  }

  onExit() {
    this.wrapper.removeEventListener('mousemove', this.onMove)
    this.distance.finalPosition = this.distance.movedTo
  }

  onMove(event) {
    event.preventDefault()
    const finalPosition = this.updatePosition(event.clientX)
    this.moveSlide(finalPosition)
  }

  addSlideEvents() {
    this.wrapper.addEventListener('mousedown', this.onStart)
    this.wrapper.addEventListener('mouseup', this.onExit)
  }

  bindEvents() {
    this.onStart = this.onStart.bind(this)
    this.onMove = this.onMove.bind(this)
    this.onExit = this.onExit.bind(this)
  }

  init() {
    if (this.slide && this.wrapper) {
      this.bindEvents()
      this.addSlideEvents()
    }
    return this
  }
}
