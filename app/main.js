'use strict';

import Stripe from "./components/stripe/main.js";

const stripe = new Stripe('#triangle');

window.setInterval(() => {
  stripe.rotate(1);
  stripe.render();
}, 20);
