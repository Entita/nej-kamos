const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);

const roundNumber = (num, scale) => {
  return +(Math.round(num + "e+" + scale)  + "e-" + scale);
}

const getProductPrice = (product) => {
  const discount = product.price - product.discount.amount - product.price * (product.discount.percent / 100);
  return roundNumber(discount, 2) * product.quantity * 100;
}

const makePayment = async (url, basket) => {
  return await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    mode: 'payment',
    line_items: basket.products.map(product => {
      return {
        price_data: {
          currency: 'czk',
          product_data: {
            name: product.name,
          },
          unit_amount: getProductPrice(product)
        },
        quantity: product.quantity
      }
    }),
    success_url: `${url}/payment/success`,
    cancel_url: `${url}/payment/cancel`,
  })
};

exports.makePayment = makePayment;