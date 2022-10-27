import Account from '../../../models/Account';
import { dbConnect, UpdateOneFromMongo } from '../../../utils/dbMongo';
import { getAccount, formatAccountData } from '../account';

dbConnect();

const addProductToAccountFavorites = async (accountId, productId) => {
  return await UpdateOneFromMongo(Account, { _id: accountId }, { $push: { favorites: productId } });
};

const removeProductFromAccountFavorites = async (accountId, productId) => {
  return await UpdateOneFromMongo(Account, { _id: accountId }, { $pull: { favorites: productId } });
};

export default async (req, res) => {
  const { method, body } = req;
  let { cookies } = req;
  if (Object.keys(cookies).length === 0 && req.headers.precookie) cookies = JSON.parse(req.headers.precookie);

  const accountCookie = cookies.accountId;
  const { productId } = body;
  
  switch (method) {
    case 'POST':
      try {
        // Add product to favorites
        if (!accountCookie || !productId) return res.status(200).json({ failed: true });
        
        await addProductToAccountFavorites(accountCookie, productId);
        const accountDb = await getAccount({ _id: accountCookie });
        const account = await formatAccountData(accountDb);
        res.status(200).json({ data: account });
      } catch (err) {
        console.error('Account Favorite => POST', err);
        res.status(200).json({ toast: 'Failed to add product to favorites', failed: true });
      }
      break;
    case 'PUT':
      try {
        // Remove product from favorites
        if (!accountCookie) return res.status(200).json({ failed: true });

        await removeProductFromAccountFavorites(accountCookie, productId);
        const accountDb = await getAccount({ _id: accountCookie });
        const account = await formatAccountData(accountDb);
        res.status(200).json({ data: account });
      } catch (err) {
        console.error('Account Favorite => DELETE', err);
        res.status(200).json({ toast: 'Failed to remove product from favorites', failed: true });
      }
      break;
    default:
      console.error('Account Favorite => DEFAULT', err);
      res.status(400).json({ failed: true });
  }
};
