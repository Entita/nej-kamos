const Account = require('../models/Account');
const Basket = require('../models/Basket');
const Category = require('../models/Category');
const Subcategory = require('../models/Subcategory');
const Product = require('../models/Product');
const Image = require('../models/Image');
const Transaction = require('../models/Transaction');
const ResetPassword = require('../models/ResetPassword');
const Coupon = require('../models/Coupon');

const findOneFromMongo = async (collection, filter) => {
  return await new Promise((resolve) => {
    collection.findOne(filter, (err, data) => {
      if (err) resolve(null);
      if (data) resolve(data);
      else resolve(null);
    });
  });
};

const UpdateOneFromMongo = async (collection, filter, update) => {
  return await new Promise((resolve) => {
    collection.updateOne(filter, update, (err, data) => {
      if (err) throw err;
      if (data.modifiedCount > 0) resolve(true);
      else resolve(false);
    });
  });
};

const findAllFromMongo = async (collection, filter) => {
  return await new Promise((resolve) => {
    collection.find(filter, (err, data) => {
      if (err) throw err;
      if (data) resolve(data);
      else resolve(null);
    });
  });
};

const getCollectionFromMongo = async (collection) => {
  return await new Promise((resolve) => {
    collection.find({}, (err, data) => {
      if (err) throw err;
      if (data) resolve(data);
      else resolve(null);
    });
  });
};

const getCategories = async () => {
  const dbCategories = await getCollectionFromMongo(Category);
  const filteredCategories = dbCategories.map(({ name }) => name);

  return filteredCategories;
};

const getSubCategories = async () => {
  const dbSubCategories = await getCollectionFromMongo(Subcategory);
  const filteredSubCategories = dbSubCategories.map(({ name, category }) => { return { name, category }});

  return filteredSubCategories;
};

const getExistingImage = async (url, name) => {
  const images = await findAllFromMongo(Image, { url: url });
  for (let i = 0; i < images.length; i++) {
    if (images[i].name === name) return images[i];
  }
  return null;
};

const getProducts = async () => {
  const dbProducts = await getCollectionFromMongo(Product);
  const filteredProducts = dbProducts.map(
    ({
      _id,
      name,
      price,
      discount,
      imageUrl,
      brand,
      description,
      category,
      subcategory,
      stock,
    }) => {
      return {
        _id,
        name,
        price,
        discount,
        imageUrl,
        brand,
        description,
        category,
        subcategory,
        stock,
      };
    },
  );

  return filteredProducts;
};

const getAccount = async (filter) => {
  return await findOneFromMongo(Account, filter);
};

const tryLogin = async (username, password) => {
  return await findOneFromMongo(Account, { username, password });
};

const isInUse = async (data) => {
  return await findOneFromMongo(Account, data);
};

const setBasketToAccount = async (accountId, basketId) => {
  return await UpdateOneFromMongo(Account, { _id: accountId }, { basketId });
};

const getBasket = async (id) => {
  const dbBasket = await findOneFromMongo(Basket, { _id: id });
  return await formatBasketData(dbBasket);
};

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
}

const setCouponToBasket = async (basketId, couponId) => {
  return await UpdateOneFromMongo( Basket, { _id: basketId }, { couponId: couponId });
}

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
}

const isBasketEmpty = async (basketId) => {
  const basket = await findOneFromMongo(Basket, { _id: basketId });
  return basket?.products.length === 0 || false;
};

const checkCoupon = async (couponCode) => {
  const couponDb = await findOneFromMongo(Coupon, { code: couponCode });
  return couponDb || false;
};

const updateAccountEmailSentAt = async (accountId) => {
  return await UpdateOneFromMongo(Account, { _id: accountId }, { emailSentAt: new Date() });
};

const deactivateBasket = async (basketId) => {
  return await UpdateOneFromMongo(Basket, { _id: basketId }, { active: false });
};

const updateAccount = async (accountId, data) => {
  return await UpdateOneFromMongo(Account, { _id: accountId }, data);
};

const addTransactionToAccount = async (accountId, transactionId) => {
  return await UpdateOneFromMongo(Account, { _id: accountId }, { $push: { transactionIds: transactionId } });
};

const getResetPassword = async (resetId) => {
  return await findOneFromMongo(ResetPassword, { _id: resetId });
};

const changeResetPassword = async (resetId) => {
  return await UpdateOneFromMongo(ResetPassword, { _id: resetId }, {changed: true });
};

const createAccount = async (data) => {
  return await Account(data).save();
};

const createResetPassword = async (data) => {
  return await ResetPassword(data).save();
};

const accountChangePassword = async (email, password) => {
  return await UpdateOneFromMongo(Account, { email }, { password });
};

const verifyAccount = async (accountId) => {
  return await UpdateOneFromMongo(Account, { _id: accountId }, { verified: true });
};

const getTransaction = async (orderId) => {
  const dbTransaction = await findOneFromMongo(Transaction, { _id: orderId });
  return await formatOrderData(dbTransaction);
};

const createBasket = async (data) => {
  return await Basket(data).save();
};

const createCategory = async (data) => {
  return await Category(data).save();
};

const createSubCategory = async (data) => {
  return await Subcategory(data).save();
};

const createProduct = async (data) => {
  return await Product(data).save();
};

const createImage = async (data) => {
  return await Image(data).save();
};

const createCoupon = async (data) => {
  return await Coupon(data).save();
};

const createTransaction = async (data) => {
  return await Transaction(data).save();
};

const formatAccountData = (dbAccount) => {
  if (!dbAccount) return;

  return {
    firstname: dbAccount.firstname,
    surname: dbAccount.surname,
    username: dbAccount.username,
    password: dbAccount.password,
    email: dbAccount.email,
    phone: dbAccount.phone,
    verified: dbAccount.verified,
    roles: dbAccount.roles,
    emailSentAt: dbAccount.emailSentAt,
    transactionIds: dbAccount.transactionIds,
    address: dbAccount.address,
    notifications: dbAccount.notifications,
  };
};

const formatBasketData = async (dbBasket) => {
  if (!dbBasket) return;
  
  const products = [];
  for (product of dbBasket.products) {
    const dbProduct = await findOneFromMongo(Product, { _id: product.productId });
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

const formatOrderData = async (dbOrder) => {
  if (!dbOrder) return;

  return {
    basket: await getBasket(dbOrder.basketId),
    _id: dbOrder._id,
    status: dbOrder.status,
    type: dbOrder.type,
  };
};

exports.createAccount = createAccount;
exports.createBasket = createBasket;
exports.createSubCategory = createSubCategory;
exports.createCategory = createCategory;
exports.getCategories = getCategories;
exports.getSubCategories = getSubCategories;
exports.createProduct = createProduct;
exports.createImage = createImage;
exports.getExistingImage = getExistingImage;
exports.getProducts = getProducts;
exports.createTransaction = createTransaction;
exports.getAccount = getAccount;
exports.getBasket = getBasket;
exports.setItemToBasket = setItemToBasket;
exports.addItemToBasket = addItemToBasket;
exports.deleteItemFromBasket = deleteItemFromBasket;
exports.setBasketToAccount = setBasketToAccount;
exports.tryLogin = tryLogin;
exports.isBasketEmpty = isBasketEmpty;
exports.formatAccountData = formatAccountData;
exports.isInUse = isInUse;
exports.verifyAccount = verifyAccount;
exports.createResetPassword = createResetPassword;
exports.accountChangePassword = accountChangePassword;
exports.getResetPassword = getResetPassword;
exports.changeResetPassword = changeResetPassword;
exports.updateAccountEmailSentAt = updateAccountEmailSentAt;
exports.updateAccount = updateAccount;
exports.checkCoupon = checkCoupon;
exports.createCoupon = createCoupon;
exports.setCouponToBasket = setCouponToBasket;
exports.getTransaction = getTransaction;
exports.addTransactionToAccount = addTransactionToAccount;
exports.deactivateBasket = deactivateBasket;
