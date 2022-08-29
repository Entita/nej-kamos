import Subcategory from '../../models/Subcategory';
import { dbConnect, getCollectionFromMongo } from '../../utils/dbMongo';

dbConnect();

const getSubCategories = async () => {
  const dbSubCategories = await getCollectionFromMongo(Subcategory);
  const filteredSubCategories = dbSubCategories.map(({ name, category }) => { return { name, category }});

  return filteredSubCategories;
};

const createSubCategory = async (data) => {
  return await Subcategory(data).save();
};

export default async (req, res) => {
  const {
    method,
  } = req;

  switch (method) {
    case 'GET':
      try {
        const categories = await getSubCategories();

        res.status(200).json(categories);
      } catch (err) {
        console.error('Subcategory => GET', err);
        res.status(200).json({ toast: 'Failed to get subcategory', failed: true });
      }
      break;
    case 'POST':
      try {
        const { name, category } = req.body;
        await createSubCategory({ name, category });

        res.status(200).json({ toast: 'Successfully created a new subcategory!' });
      } catch (err) {
        switch (err.code) {
          case 11000:
            console.error("Can't create a new subcategory because of duplicates!");
            res.status(200).json({ toast: 'Duplicate subcategory name!', failed: true });
            break;
          default:
            console.error('Subcategory => POST', err);
            res.status(200).json({ toast: 'Failed to create a new subcategory!', failed: true });
            break;
        }
      }
      break;
    case 'PUT':
      try {
        res.status(200).json({});
      } catch (err) {
        console.error('Subcategory => PUT', err);
        res.status(200).json({ toast: 'Failed to PUT subcategory', failed: true });
      }
      break;
    case 'DELETE':
      try {
        res.status(200).json({});
      } catch (err) {
        console.error('Subcategory => DELETE', err);
        res.status(200).json({ toast: 'Failed to DELETE subcategory', failed: true });
      }
      break;
    default:
      console.error('Subcategory => DEFAULT', err);
      res.status(400).json({ failed: true });
  }
};
