const { getBasket } = require("./mongo");

const isBasketActive = async (req, res, next) => {
  try {
    const basketCookie = req.cookies.basketId;
    const basket = await getBasket(basketCookie);
    if (basket.active) return next();
    throw "Basket is not found or is not active";
  } catch (err) {
    console.error('Authentication error => isBasketActive');
    res.send({ toast: 'Authentication error => isBasketActive', failed: true });
  }
};

exports.isBasketActive = isBasketActive;