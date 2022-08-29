import Coupon from '../../models/Coupon';
import Basket from '../../models/Basket';
import { dbConnect, UpdateOneFromMongo, findOneFromMongo } from '../../utils/dbMongo';
import { getBasket } from './basket';

dbConnect();

const checkCoupon = async (couponCode) => {
  const couponDb = await findOneFromMongo(Coupon, { code: couponCode });
  return couponDb || false;
};

const setCouponToBasket = async (basketId, couponId) => {
  return await UpdateOneFromMongo( Basket, { _id: basketId }, { couponId: couponId });
}

const createCoupon = async (data) => {
  return await Coupon(data).save();
};

export default async (req, res) => {
  const {
    query: { code },
    method,
    body,
  } = req;

  switch (method) {
    case 'POST':
      // apply coupon
      try {
        const couponDb = await checkCoupon(code);
        if (couponDb) {
          const basketCookie = req.cookies.basketId;
          const setCoupon = await setCouponToBasket(basketCookie, couponDb._id);
          if (setCoupon) {
            const basket = await getBasket(basketCookie);
            return res.status(200).send({ data: basket })
          }
        }

        res.status(200).json({ data: false });
      } catch (err) {
        console.error('Coupon => POST', err);
        res.status(200).json({ toast: 'Failed to apply coupon!', failed: true });
      }
      break;
    case 'PUT':
      // add coupon
      try {
        const { code, discount } = body;
        await createCoupon({ code, discount });
        
        res.status(200).send({ toast: 'Successfully created a new coupon!' });
      } catch (err) {
        switch (err.code) {
          case 11000:
            console.error("Coupon => PUT => Duplicates");
            res.status(200).send({ toast: 'Duplicate coupon name/code!', failed: true });
            break;
          default:
            console.error('Coupon => PUT', err);
            res.status(200).send({ toast: 'Failed to create a new coupon!', failed: true });
            break;
        }
      }
      break;
    case 'DELETE':
      // unapply coupon
      try {
        const basketCookie = req.cookies.basketId;
        const setCoupon = await setCouponToBasket(basketCookie, null);
        if (setCoupon) {
          const basket = await getBasket(basketCookie);
          return res.status(200).send({ data: basket })
        }
    
        res.status(200).send({ data: false })
      } catch (err) {
        console.error('Coupon => DELETE', err);
        res.status(200).json({ toast: 'Failed to unapply coupon!', failed: true });
      }
      break;
    default:
      console.error('Coupon => DEFAULT', err);
      res.status(400).json({ failed: true });
  }
};
