import Category from '../../models/Category';
import { dbConnect, getCollectionFromMongo } from '../../utils/dbMongo';

dbConnect();

const getCategories = async () => {
  const dbCategories = await getCollectionFromMongo(Category);
  const filteredCategories = dbCategories.map(({ name }) => name);

  return filteredCategories;
};

const createCategory = async (data) => {
  return await Category(data).save();
};

export default async (req, res) => {
  const {
    method,
  } = req;

  switch (method) {
    case 'GET':
      try {
        const categories = await getCategories();

        res.status(200).json(categories);
      } catch (err) {
        console.error('Category => GET', err);
        res.status(200).json({ toast: 'Failed to get category', failed: true });
      }
      break;
    case 'POST':
      try {
        const { name } = req.body;
        await createCategory({ name });

        res.status(200).json({ toast: 'Successfully created a new category!' });
      } catch (err) {
        switch (err.code) {
          case 11000:
            console.error("Can't create a new category because of duplicates!");
            res.status(200).json({ toast: 'Duplicate category name!', failed: true });
            break;
          default:
            console.error('Category => POST', err);
            res.status(200).json({ toast: 'Failed to create a new category!', failed: true });
            break;
        }
      }
      break;
    case 'PUT':
      try {
        res.status(200).json({});
      } catch (err) {
        console.error('Category => PUT', err);
        res.status(200).json({ toast: 'Failed to PUT category', failed: true });
      }
      break;
    case 'DELETE':
      try {
        res.status(200).json({});
      } catch (err) {
        console.error('Category => DELETE', err);
        res.status(200).json({ toast: 'Failed to DELETE category', failed: true });
      }
      break;
    default:
      console.error('Category => DEFAULT', err);
      res.status(400).json({ failed: true });
  }
};
