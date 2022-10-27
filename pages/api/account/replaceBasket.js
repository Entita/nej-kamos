import { dbConnect } from '../../../utils/dbMongo';
import { getAccount, formatAccountData, setBasketToAccount } from '../account';

dbConnect();

export default async (req, res) => {
  const { method, body } = req;
  let { cookies } = req;
  if (Object.keys(cookies).length === 0 && req.headers.precookie) cookies = JSON.parse(req.headers.precookie);

  const { basketId, accountId } = body;
  
  switch (method) {
    case 'POST':
      try {
        // Replace basket
        const accountDb = await getAccount({ _id: accountId })
        if (!accountDb && !basketId) throw '';

        await setBasketToAccount(accountId, basketId);
        const account = await formatAccountData(accountDb);
        res.status(200).send({ data: account, toast: 'Successfully logged in!', custom_cookies: { accountId, basketId } });
      } catch (err) {
        console.error('Account Replace Basket => POST', err);
        res.status(200).json({ toast: 'Failed to replace basket', failed: true });
      }
      break;
    default:
      console.error('Account Replace Basket => DEFAULT', err);
      res.status(400).json({ failed: true });
  }
};
