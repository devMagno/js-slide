export default class Slide {
  constructor(slide, wrapper) {
    this.slide = document.querySelector(slide)
    this.wrapper = document.querySelector(wrapper) 

  }
  
  onStart(event) {
    event.preventDefault()
    this.wrapper.addEventListener('mousemove', this.onMove)
  }
  
  onExit() {
    this.wrapper.removeEventListener('mousemove', this.onMove)
  }
  
  onMove(event) {
    event.preventDefault()
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