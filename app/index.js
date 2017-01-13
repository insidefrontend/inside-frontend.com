'use strict';

import './index.scss';

import Stripe from './components/stripe/';

const stripe = new Stripe('.if-c-stripe');

window.setInterval(() => {
  stripe.rotate(1);
  stripe.render();
}, 20);
