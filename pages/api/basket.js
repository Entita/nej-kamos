import Account from '../../models/Account';
import Basket from '../../models/Basket';
import Coupon from '../../models/Coupon';
import {
  dbConnect,
  UpdateOneFromMongo,
  findOneFromMongo,
} from '../../utils/dbMongo';

dbConnect();

const setItemToBasket = async (basketId, product) => {
  return await UpdateOneFromMongo(
    Basket,
    {
      _id: basketId,
      'products.productId': product.productId,
    },
    {
      'products.$.quantity': product.quantity,
    },
  );
};

export const getBasket = async (id) => {
  const dbBasket = await findOneFromMongo(Basket, { _id: id });
  return await formatBasketData(dbBasket);
};

const formatBasketData = async (dbBasket) => {
  if (!dbBasket) return;

  const products = [];
  for (product of dbBasket.products) {
    const dbProduct = await findOneFromMongo(Product, {
      _id: product.productId,
    });
    const filteredProduct = {
      _id: dbProduct._id,
      name: dbProduct.name,
      price: dbProduct.price,
      discount: dbProduct.discount,
      imageUrl: dbProduct.imageUrl,
      brand: dbProduct.brand,
      description: dbProduct.description,
      category: dbProduct.category,
      subcategory: dbProduct.subcategory,
      stock: dbProduct.stock,
      quantity: product.quantity,
    };

    products.push(filteredProduct);
  }

  const couponDb = await findOneFromMongo(Coupon, { _id: dbBasket.couponId });

  return {
    _id: dbBasket._id,
    active: dbBasket.active,
    discount: couponDb?.discount || null,
    coupon: couponDb?.code || null,
    products,
  };
};

const deleteItemFromBasket = async (basketId, product) => {
  return await UpdateOneFromMongo(
    Basket,
    { _id: basketId },
    {
      $pull: {
        products: {
          productId: product.productId,
        },
      },
    },
  );
};

const addItemToBasket = async (basketId, product) => {
  return await UpdateOneFromMongo(
    Basket,
    { _id: basketId },
    {
      $push: {
        products: {
          productId: product.productId,
          quantity: parseInt(product.quantity),
        },
      },
    },
  );
};

const getAccount = async (filter) => {
  return await findOneFromMongo(Account, filter);
};

const createBasket = async (data) => {
  return await Basket(data).save();
};

const setBasketToAccount = async (accountId, basketId) => {
  return await UpdateOneFromMongo(Account, { _id: accountId }, { basketId });
};

export const isBasketEmpty = async (basketId) => {
  const basket = await findOneFromMongo(Basket, { _id: basketId });
  return basket?.products.length === 0 || false;
};

export default async (req, res) => {
  const {
    query,
    method,
  } = req;
  let { cookies } = req;
  if (Object.keys(cookies).length === 0 && req.headers.precookie) cookies = JSON.parse(req.headers.precookie)

  switch (method) {
    case 'GET':
      // get basket
      try {
        const accountCookie = cookies.accountId;
        let basketCookie = cookies.basketId;
        if (accountCookie) {
          // with account
          if (basketCookie) {
            // with basket
            const account = await getAccount({ _id: accountCookie });
            const basket = await getBasket(account.basketId);

            if (basket) {
              basketCookie = account.basketId;
            } else {
              const basket = await createBasket();
              await setBasketToAccount(accountCookie, basket._id);
              basketCookie = basket._id;
            }
          } else {
            // without basket
            const basket = await createBasket();
            basketCookie = basket._id;
          }
        } else {
          // without account
          if (basketCookie) {
            // with basket
            const basket = await getBasket(basketCookie);

            if (basket) {
              basketCookie = basket._id;
            } else {
              const basket = await createBasket();
              basketCookie = basket._id;
            }
          } else {
            // without basket
            const basket = await createBasket();
            basketCookie = basket._id;
          }
        }

        const basket = await getBasket(basketCookie);

        res
          .status(200)
          .json({ data: basket, cookies: { basketId: basketCookie }});
      } catch (err) {
        console.error('Basket => GET', err);
        res.status(200).json({ toast: 'Failed to get basket!', failed: true });
      }
      break;
    case 'POST':
      // add item to basket
      try {
        const basketCookie = req.cookies.basketId;
        await addItemToBasket(basketCookie, query);
        const basket = await getBasket(basketCookie);

        res.status(200).json(basket);
      } catch (err) {
        console.error('Basket => POST', err);
        res
          .status(200)
          .json({ toast: 'Failed to add item to basket!', failed: true });
      }
      break;
    case 'PUT':
      // set basket product quantity
      try {
        const basketCookie = req.cookies.basketId;
        await setItemToBasket(basketCookie, query);
        const basket = await getBasket(basketCookie);

        res.status(200).json(basket);
      } catch (err) {
        console.error('Basket => PUT', err);
        res
          .status(200)
          .json({ toast: 'Failed to set item to basket!', failed: true });
      }
      break;
    case 'DELETE':
      // remove item from basket
      try {
        const basketCookie = req.cookies.basketId;
        await deleteItemFromBasket(basketCookie, query);
        const basket = await getBasket(basketCookie);

        res.status(200).json(basket);
      } catch (err) {
        console.error('Basket => DELETE', err);
        res
          .status(200)
          .json({ toast: 'Failed to delete item from basket!', failed: true });
      }
      break;
    default:
      console.error('Basket => DEFAULT', err);
      res.status(400).json({ failed: true });
  }
};
