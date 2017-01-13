import './index.scss';

export default class Stripe {
  constructor(selector) {
    this.angle = 0;
    this.el = document.querySelector(selector);
  }

  rotate(amount) {
    this.angle = (this.angle + amount) % 360;
  }

  render() {
    this.el.style.transform = `rotate(${this.angle}deg)`;
  }
}
