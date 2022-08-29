import Account from '../../models/Account';
import { dbConnect, findOneFromMongo } from '../../utils/dbMongo';
import { getBasket, isBasketEmpty } from './basket';

dbConnect();

const getAccount = async (filter) => {
  return await findOneFromMongo(Account, filter);
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

const setBasketToAccount = async (accountId, basketId) => {
  return await UpdateOneFromMongo(Account, { _id: accountId }, { basketId });
};

const tryLogin = async (username, password) => {
  return await findOneFromMongo(Account, { username, password });
};

export default async (req, res) => {
  const {
    method,
  } = req;

  switch (method) {
    case 'GET':
      // Get account data
      try {
        const accountCookie = req.cookies.accountId;
        const accountDb = await getAccount({ _id: accountCookie });
        const account = formatAccountData(accountDb);
        
        res.status(200).json(account);
      } catch (err) {
        console.error('Account => GET', err);
        res.status(200).json({ toast: 'Failed to get account!', failed: true });
      }
      break;
    case 'POST':
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

        res.status(200).json({ toast: 'Failed to logged in! (Wrong credentials)', failed: true });
      } catch (err) {
        console.error('Account => POST', err);
        res.status(200).json({ toast: 'Failed to create a new account!', failed: true });
      }
      break;
    case 'PUT':
      try {
        res.status(200).json({});
      } catch (err) {
        console.error('Account => PUT', err);
        res.status(200).json({ toast: 'Failed to PUT account', failed: true });
      }
      break;
    case 'DELETE':
      // logout
      try {
        res.status(200).send({ toast: 'Successfully logged out!', cookie: { accountId: '', basketId: '' } });
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
