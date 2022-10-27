import Account from '../../models/Account';
import Transaction from '../../models/Transaction';
import { dbConnect, findOneFromMongo, UpdateOneFromMongo, findAllFromMongo } from '../../utils/dbMongo';
import { getBasket, isBasketEmpty } from './basket';

dbConnect();

export const getAccount = async (filter) => {
  return await findOneFromMongo(Account, filter);
};

export const getTransactions = async (filter) => {
  const transactions = await findAllFromMongo(Transaction, filter);

  return await Promise.all(transactions.map(async (transaction) => ({
      _id: transaction._id,
      basket: await getBasket(transaction.basketId),
      type: transaction.type,
      status: transaction.status,
      createdAt: transaction.createdAt,
  })));
};

export const formatAccountData = async (dbAccount) => {
  if (!dbAccount) return;

  const transactions = await getTransactions({ _id: { $in: dbAccount.transactionIds }});

  return {
    _id: dbAccount._id,
    firstname: dbAccount.firstname,
    surname: dbAccount.surname,
    username: dbAccount.username,
    password: dbAccount.password,
    email: dbAccount.email,
    phone: dbAccount.phone,
    verified: dbAccount.verified,
    roles: dbAccount.roles,
    emailSentAt: dbAccount.emailSentAt,
    transactions: transactions.map((transaction) => { return {
      _id: transaction._id,
      basket: transaction.basket,
      type: transaction.type,
      status: transaction.status,
      createdAt: transaction.createdAt,
    }}),
    address: dbAccount.address,
    notifications: dbAccount.notifications,
    favorites: dbAccount.favorites,
  };
};

export const setBasketToAccount = async (accountId, basketId) => {
  return await UpdateOneFromMongo(Account, { _id: accountId }, { basketId });
};

const tryLogin = async (username, password) => {
  return await findOneFromMongo(Account, { username, password });
};

const createAccount = async (data) => {
  return await Account(data).save();
};

export default async (req, res) => {
  const {
    method,
    body,
  } = req;
  let { cookies } = req;
  if (Object.keys(cookies).length === 0 && req.headers.precookie) cookies = JSON.parse(req.headers.precookie);

  switch (method) {
    case 'GET':
      // Get account data
      try {
        const accountCookie = cookies.accountId;
        if (!accountCookie) return res.status(200).json();
        const accountDb = await getAccount({ _id: accountCookie });
        const account = await formatAccountData(accountDb);
        
        res.status(200).json({ data: account });
      } catch (err) {
        console.error('Account => GET', err);
        res.status(200).json({ toast: 'Failed to get account!', failed: true });
      }
      break;
    case 'POST':
      // login
      try {
        const { username, password } = body;
        let accountDb = await tryLogin(username, password);
        
        if (accountDb) {
          const basketCookie = cookies.basketId;
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

          const account = await formatAccountData(accountDb);
          return res.send({ data: account, toast: 'Successfully logged in!', custom_cookies: { accountId: accountDb._id, basketId: accountDb.basketId } });
        }

        res.status(200).json({ toast: 'Failed to logged in! (Wrong credentials)', failed: true });
      } catch (err) {
        console.error('Account => POST', err);
        res.status(200).json({ toast: 'Failed to create a new account!', failed: true });
      }
      break;
    case 'PUT':
      // register
      try {
        const { username, password, email, notifications } = body;
        const basketCookie = cookies.basketId;
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
        const account = await formatAccountData(accountDb);
        // const emailSent = await sendEmailVerification(accountDb._id, accountDb.email, req.header('Referer'));
        // if (!emailSent) throw 'Error when sending email';
    
        res.status(200).send({ data: account, toast: 'Successfully created an account!', cookie: { accountId: newAccountCookie, basketId: newBasketCookie } })
      } catch (err) {
        console.error('Account => PUT', err);
        res.status(200).json({ toast: 'Failed to create an account', failed: true });
      }
      break;
    case 'DELETE':
      // logout
      try {
        res.status(200).send({ toast: 'Successfully logged out!', custom_cookies: { accountId: '', basketId: '' } });
      } catch (err) {
        console.error('Account => DELETE', err);
        res.status(200).json({ toast: 'Failed to logout', failed: true });
      }
      break;
    default:
      console.error('Account => DEFAULT', err);
      res.status(400).json({ failed: true });
  }
};
