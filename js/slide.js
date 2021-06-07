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
    let moveType
    if (event.type === 'mousedown') {
      event.preventDefault()
      this.distance.startX = event.clientX
      moveType = 'mousemove'
    } else {
      this.distance.startX = event.changedTouches[0].clientX
      moveType = 'touchmove'
    }
    this.wrapper.addEventListener(moveType, this.onMove)
  }

  onExit(event) {
    const moveType = event.type === 'mouseup' ? 'mousemove' : 'touchmove'
    this.wrapper.removeEventListener(moveType, this.onMove)
    this.distance.finalPosition = this.distance.movedTo
  }

  onMove(event) {
    const pointerPosition =
      event.type === 'mousemove'
        ? event.clientX
        : event.changedTouches[0].clientX
    event.preventDefault()
    const finalPosition = this.updatePosition(pointerPosition)
    this.moveSlide(finalPosition)
  }

  addSlideEvents() {
    this.wrapper.addEventListener('mousedown', this.onStart)
    this.wrapper.addEventListener('touchstart', this.onStart)
    this.wrapper.addEventListener('mouseup', this.onExit)
    this.wrapper.addEventListener('touchend', this.onExit)
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
