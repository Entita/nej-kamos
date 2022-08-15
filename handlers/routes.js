const express = require('express');
const path = require('path');
const util = require('util');
const { sendEmailVerification, sendResetPassword } = require('./mailer');
const router = express.Router();
const {
  createAccount,
  createBasket,
  createCategory,
  createProduct,
  getCategories,
  createImage,
  getExistingImage,
  getProducts,
  getAccount,
  getBasket,
  addItemToBasket,
  deleteItemFromBasket,
  setItemToBasket,
  getSubCategories,
  createSubCategory,
  setBasketToAccount,
  tryLogin,
  formatAccountData,
  isBasketEmpty,
  isInUse,
  verifyAccount,
  createResetPassword,
  accountChangePassword,
  getResetPassword,
  changeResetPassword,
  updateAccountEmailSentAt,
  updateAccount,
  checkCoupon,
  createCoupon,
  setCouponToBasket,
} = require('./mongo');

router.get('/api/product', async (req, res) => {
  // get product
  try {
    const products = await getProducts();
    res.send(products);
  } catch (err) {
    console.error(err);
    res.send({ toast: 'Failed to get products!', failed: true });
  }
});

router.post('/api/product', async (req, res) => {
  // create product
  try {
    const { name, price, brand, category, subcategory, stock, discount, description } = req.body;
    const filePicture = req.files.picture;
    const fileName = filePicture.name;
    const fileSize = filePicture.data.length;
    const fileExtension = path.extname(fileName);
    const fileMd5 = filePicture.md5;
    const fileUrl = '/images/' + fileMd5 + fileExtension;

    const allowedExtensionss = /png|jpeg|jfif|jpg|gif/;
    if (!allowedExtensionss.test(fileExtension)) throw { code: 'unsupported' };
    if (fileSize > 5000000) throw { code: 'size_limit' };

    await util.promisify(filePicture.mv)('public' + fileUrl);
    let image = await getExistingImage(fileUrl, name);
    if (image === null) {
      image = await createImage({
        name: name,
        url: fileUrl,
      });
    }

    await createProduct({
      name,
      price: parseFloat(price).toFixed(2),
      imageUrl: fileUrl,
      brand,
      category,
      subcategory,
      stock: parseInt(stock),
      discount: JSON.parse(discount),
      description,
    });

    res.send({
      toast: 'Successfully created a new product!',
    });
  } catch (err) {
    switch (err.code) {
      case 'file_move':
        console.error('Error when moving file!');
        res.send({ toast: 'Error when moving file!', failed: true });
        break;
      case 'unsupported':
        console.error('Unsupported extension of file!');
        res.send({ toast: 'Unsupported extension of file!', failed: true });
        break;
      case 'size_limit':
        console.error('File must be less than 5MB!');
        res.send({ toast: 'File must be less than 5MB!', failed: true });
        break;
      case 11000:
        console.error("Can't create a new product because of duplicates!");
        res.send({ toast: 'Duplicate product name!', failed: true });
        break;
      default:
        console.error(err);
        res.send({ toast: 'Failed to create a new product!', failed: true });
        break;
    }
  }
});
router.put('/api/product', async (req, res) => {
  // update product
});
router.delete('/api/product', async (req, res) => {
  // delete product
});

router.get('/api/category', async (req, res) => {
  // get categories
  try {
    const categories = await getCategories();
    res.send(categories);
  } catch (err) {
    console.error(err);
    res.send({ toast: 'Failed to get categories!', failed: true });
  }
});
router.post('/api/category', async (req, res) => {
  // create category
  try {
    const name = req.body.name;
    await createCategory({ name });
    res.send({ toast: 'Successfully created a new category!' });
  } catch (err) {
    switch (err.code) {
      case 11000:
        console.error("Can't create a new category because of duplicates!");
        res.send({ toast: 'Duplicate category name!', failed: true });
        break;
      default:
        console.error(err);
        res.send({ toast: 'Failed to create a new category!', failed: true });
        break;
    }
  }
});
router.put('/api/category', async (req, res) => {
  // edit category
});
router.delete('/api/category', async (req, res) => {
  // delete category
});

router.get('/api/subcategory', async (req, res) => {
  // get subcategory
  try {
    const subCategories = await getSubCategories();
    res.send(subCategories);
  } catch (err) {
    console.error(err);
    res.send({ toast: 'Failed to get subCategories!', failed: true });
  }
});
router.post('/api/subcategory', async (req, res) => {
  // create subcategory
  try {
    const { name, category } = req.body;
    await createSubCategory({ name, category });
    res.send({ toast: 'Successfully created a new subcategory!' });
  } catch (err) {
    switch (err.code) {
      case 11000:
        console.error("Can't create a new subcategory because of duplicates!");
        res.send({ toast: 'Duplicate subcategory name!', failed: true });
        break;
      default:
        console.error(err);
        res.send({ toast: 'Failed to create a new subcategory!', failed: true });
        break;
    }
  }
});
router.put('/api/subcategory', async (req, res) => {
  // edit subcategory
});
router.delete('/api/subcategory', async (req, res) => {
  // delete subcategory
});

router.get('/api/basket', async (req, res) => {
  // get basket
  try {
    const accountCookie = req.cookies.accountId;
    let basketCookie = req.cookies.basketId;
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
          await setBasketToAccount(accountCookie ,basket._id);
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

    res.send({ data: basket, cookie: { basketId: basketCookie } });
  } catch (err) {
    console.error('Failed to get basket!', err);
    res.send({ toast: 'Failed to get basket!', failed: true });
  }
});
router.put('/api/basket?', async (req, res) => {
  // set basket product quantity
  try {
    const query = req.query;
    const basketCookie = req.cookies.basketId;
    await setItemToBasket(basketCookie, query);
    const basket = await getBasket(basketCookie);

    res.send(basket);
  } catch (err) {
    console.error('Failed to set item to basket!');
    res.send({ toast: 'Failed to set item to basket!', failed: true });
  }
});
router.post('/api/basket?', async (req, res) => {
  // add item to basket
  try {
    const query = req.query;
    const basketCookie = req.cookies.basketId;
    await addItemToBasket(basketCookie, query);
    const basket = await getBasket(basketCookie);

    res.send(basket);
  } catch (err) {
    console.error('Failed to add item to basket!');
    res.send({ toast: 'Failed to add item to basket!', failed: true });
  }
});
router.delete('/api/basket?', async (req, res) => {
  // remove item from basket
  try {
    const query = req.query;
    const basketCookie = req.cookies.basketId;
    await deleteItemFromBasket(basketCookie, query);
    const basket = await getBasket(basketCookie);

    res.send(basket);
  } catch (err) {
    console.error('Failed to delete item from basket!');
    res.send({ toast: 'Failed to delete item from basket!', failed: true });
  }
});

router.get('/api/account', async (req, res) => {
  // Get account data
  try {
    const accountCookie = req.cookies.accountId;
    const accountDb = await getAccount({ _id: accountCookie });
    const account = formatAccountData(accountDb);

    res.send(account);
  } catch (err) {
    console.error('Failed to get account!');
    res.send({ toast: 'Failed to get account!', failed: true });
  }
});
router.delete('/api/account/logout', async (req, res) => {
  // logout
  try {
    res.send({ toast: 'Successfully logged out!', cookie: { accountId: '', basketId: '' } });
  } catch (err) {
    console.error('Failed to logout!');
    res.send({ toast: 'Failed to logout!', failed: true });
  }
});
router.post('/api/account/login', async (req, res) => {
  // login
  try {
    const { username, password } = req.body;
    let accountDb = await tryLogin(username, password);
    
    if (accountDb) {
      const basketCookie = req.cookies.basketId;
      const isAccountBasketEmpty = await isBasketEmpty(accountDb.basketId);
      const isCookieBasketEmpty = await isBasketEmpty(basketCookie);

      if (!isAccountBasketEmpty && !isCookieBasketEmpty) {
        const accountBasket = await getBasket(accountDb.basketId);
        const cookieBasket = await getBasket(basketCookie);
        return res.send({
          data: {
            accountId: accountDb._id,
            accountBasket: accountBasket,
            cookieBasket: cookieBasket,
          },
          basketReplace: true,
        });
      }

      if (isAccountBasketEmpty && basketCookie) {
        await setBasketToAccount(accountDb._id, basketCookie);
        accountDb = await getAccount({ _id: accountDb._id });
      }

      const account = formatAccountData(accountDb);
      res.send({ data: account, toast: 'Successfully logged in!', cookie: { accountId: accountDb._id, basketId: accountDb.basketId } });
    }
    else res.send({ toast: 'Failed to logged in! (Wrong credentials)', failed: true });
  } catch (err) {
    console.error('Failed to login!');
    res.send({ toast: 'Failed to login!', failed: true });
  }
});
router.post('/api/account/replaceBasket', async (req, res) => {
  // replace basket
  try {
    const { basketId, accountId } = req.body;
    const accountDb = await getAccount({ _id: accountId })
    if (accountDb && basketId) {
      await setBasketToAccount(accountId, basketId);

      const account = formatAccountData(accountDb);
      res.send({ data: account, toast: 'Successfully logged in!', cookie: { accountId, basketId } });
    } else throw 'Server Error';
  } catch (err) {
    console.error('Failed to replace account basket!');
    res.send({ toast: 'Failed to replace account basket!', failed: true });
  }
});
router.post('/api/account/register', async (req, res) => {
  // register
  try {
    const { username, password, email, notifications } = req.body;
    const basketCookie = req.cookies.basketId;
    let newBasketCookie = basketCookie;
    let newAccountCookie;
    let accountDb = await createAccount({
      username,
      password,
      email,
      notifications,
    });
    newAccountCookie = accountDb._id;

    if (basketCookie) {
      await setBasketToAccount(accountDb._id, basketCookie);
      accountDb = await getAccount({ _id: accountDb._id });
    } else {
      newBasketCookie = accountDb.basketId;
    }
    const account = formatAccountData(accountDb);
    const emailSent = await sendEmailVerification(accountDb._id, accountDb.email, req.header('Referer'));
    if (!emailSent) throw 'Error when sending email';

    res.send({ data: account, toast: 'Successfully created an account!', cookie: { accountId: newAccountCookie, basketId: newBasketCookie } })
  } catch (err) {
    console.error('Failed to create new account!');
    res.send({ toast: 'Failed to create new account!', failed: true });
  }
});
router.post('/api/account/isUsernameInUse', async (req, res) => {
  // check if username is in use
  try {
    const { username } = req.body;
    const isUsernameUsed = !!(await isInUse({ username }));

    res.send({ data: isUsernameUsed });
  } catch (err) {
    console.error('Failed to check if username is in use!');
    res.send({ toast: 'Failed to check if username is in use!', failed: true });
  }
});
router.post('/api/account/isEmailInUse', async (req, res) => {
  // check if email is in use
  try {
    const { email } = req.body;
    const isEmailUsed = !!(await isInUse({ email }));

    res.send({ data: isEmailUsed });
  } catch (err) {
    console.error('Failed to check if email is in use!');
    res.send({ toast: 'Failed to check if email is in use!', failed: true });
  }
});
router.post('/api/account/resendVerification', async (req, res) => {
  // resend email verification
  try {
    const accountCookie = req.cookies.accountId;
    const accountUpdate = await updateAccountEmailSentAt(accountCookie);
    if (!accountUpdate) throw "Error updating account";
    const accountDb = await getAccount({ _id: accountCookie });
    if (!accountDb) throw 'Account not found';
    const account = formatAccountData(accountDb);
    if (accountDb.verified) {
      return res.send({ data: account, toast: 'Account is already verified!' });
    }
    const emailSent = await sendEmailVerification(accountCookie, accountDb.email, req.header('Referer'));
    if (!emailSent) throw 'Error when sending email';

    res.send({ data: account, toast: 'Successfully resent verification!' });
  } catch (err) {
    console.error('Failed to resend verification!');
    res.send({ toast: 'Failed to resend verification!', failed: true });
  }
});
router.post('/api/account/verify', async (req, res) => {
  // verify account
  try {
    const accountCookie = req.cookies.accountId;
    const verifyingAccount = await verifyAccount(accountCookie);
    if (!verifyingAccount) throw 'Error verifying account';
    const accountDb = await getAccount({ _id: accountCookie });
    const account = formatAccountData(accountDb);
    
    res.send({ data: account });
  } catch (err) {
    console.error('Failed to verify account!');
    res.send({ toast: 'Failed to verify account!', failed: true });
  }
});
router.post('/api/account/resetPassword', async (req, res) => {
  // reset password
  try {
    const { email } = req.body;
    const accountDb = await getAccount({ email });
    if (!accountDb) throw 'Wrong email!';

    const passwordReset = await createResetPassword({ accountId: accountDb._id });
    const emailSent = await sendResetPassword(passwordReset._id, email, req.header('Referer'));
    if (!emailSent) throw 'Error when sending email';
    
    res.send({ toast: 'Successfully sent password reseting email!' });
  } catch (err) {
    console.error('Failed to reset password!');
    res.send({ toast: 'Failed to reset password!', failed: true });
  }
});
router.post('/api/account/changePassword', async (req, res) => {
  // change password
  try {
    const { email, password, resetId } = req.body;
    const changedPassword = await accountChangePassword(email, password);
    const changePassword = await changeResetPassword(resetId);
    if (!changedPassword || !changePassword) throw 'Error changing password!';

    res.send({ toast: 'Successfully changed password!' });
  } catch (err) {
    console.error('Failed to change password!');
    res.send({ toast: 'Failed to change password!', failed: true });
  }
});
router.post('/api/account/resetPasswordVerify', async (req, res) => {
  // reset password verification
  try {
    const { resetId } = req.body;
    const passwordReset = await getResetPassword(resetId);

    res.send({ data: passwordReset.changed });
  } catch (err) {
    console.error('Failed reset password verification!');
    res.send({ toast: 'Failed reset password verification!', failed: true });
  }
});
router.post('/api/account/update', async (req, res) => {
  // update account
  try {
    const { username, password, phone, notifications, address } = req.body;
    const accountCookie = req.cookies.accountId;
    const updatedAccount = await updateAccount(accountCookie, { username, password, phone, notifications, address });
    if (!updatedAccount) throw 'Error updating acccount';

    const accountDb = await getAccount({ _id: accountCookie });
    const account = formatAccountData(accountDb);
    res.send({ data: account, toast: 'Successfully updated account!' })
  } catch (err) {
    console.error('Failed update account!');
    res.send({ toast: 'Failed update account!', failed: true });
  }
});
router.post('/api/coupon?', async (req, res) => {
  // apply coupon
  try {
    const { code } = req.query;
    const couponDb = await checkCoupon(code);
    if (couponDb) {
      const basketCookie = req.cookies.basketId;
      const setCoupon = await setCouponToBasket(basketCookie, couponDb._id);
      if (setCoupon) {
        const basket = await getBasket(basketCookie);
        return res.send({ data: basket })
      }
    }

    res.send({ data: false })
  } catch (err) {
    console.error('Failed to apply coupon!');
    res.send({ toast: 'Failed to apply coupon!', failed: true });
  }
});
router.delete('/api/coupon', async (req, res) => {
  // unapply coupon
  try {
      const basketCookie = req.cookies.basketId;
      const setCoupon = await setCouponToBasket(basketCookie, null);
      if (setCoupon) {
        const basket = await getBasket(basketCookie);
        return res.send({ data: basket })
      }

    res.send({ data: false })
  } catch (err) {
    console.error('Failed to unapply coupon!');
    res.send({ toast: 'Failed to unapply coupon!', failed: true });
  }
});
router.post('/api/coupon/add', async (req, res) => {
  // add coupon
  try {
    const { code, discount } = req.body;
    await createCoupon({ code, discount });
    
    res.send({ toast: 'Successfully created a new coupon!' });
  } catch (err) {
    switch (err.code) {
      case 11000:
        console.error("Can't create a new coupon because of duplicates!");
        res.send({ toast: 'Duplicate coupon name/code!', failed: true });
        break;
      default:
        console.error('Failed to create a new coupon!', err);
        res.send({ toast: 'Failed to create a new coupon!', failed: true });
        break;
    }
  }
});router.post('/api/coupon/activate?', async (req, res) => {
  // activate coupon
  try {
    const query = req.query;
    
    res.send({  })
  } catch (err) {
    console.error('Failed to activate coupon!');
    res.send({ toast: 'Failed to activate coupon!', failed: true });
  }
});router.delete('/api/coupon/deactivate?', async (req, res) => {
  // deactivate coupon
  try {
    const query = req.query;
    
    res.send({  })
  } catch (err) {
    console.error('Failed to deactivate coupon!');
    res.send({ toast: 'Failed to deactivate coupon!', failed: true });
  }
});

router.post('/api/payments', async (req, res) => {});

module.exports = router;
