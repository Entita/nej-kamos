import Account from '../../../models/Account';
import { dbConnect, UpdateOneFromMongo } from '../../../utils/dbMongo';
import { getAccount, formatAccountData } from '../account';

dbConnect();

const addProductToAccountFavorites = async (accountId, productId) => {
  return await UpdateOneFromMongo(Account, { _id: accountId }, { $push: { favorites: productId } });
};

export default async (req, res) => {
  const { method, body } = req;
  const { email } = body;
  
  switch (method) {
    case 'POST':
      try {
        // Reset forgotten password
        
        
        res.status(200).json();
      } catch (err) {
        console.error('Account Forgotten Password => POST', err);
        res.status(200).json({ toast: 'Failed to reset forgotten password', failed: true });
      }
      break;
    default:
      console.error('Account Forgotten Password => DEFAULT', err);
      res.status(400).json({ failed: true });
  }
};
