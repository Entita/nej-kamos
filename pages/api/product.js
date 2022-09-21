const path = require('path');
const util = require('util');
import Product from '../../models/Product';
import { dbConnect, getCollectionFromMongo } from '../../utils/dbMongo';

dbConnect();

const getExistingImage = async (url, name) => {
  const images = await findAllFromMongo(Image, { url: url });
  for (let i = 0; i < images.length; i++) {
    if (images[i].name === name) return images[i];
  }
  return null;
};

const createImage = async (data) => {
  return await Image(data).save();
};

const createProduct = async (data) => {
  return await Product(data).save();
};

export default async (req, res) => {
  const {
    method,
  } = req;

  switch (method) {
    case 'GET':
      try {
        // Get products
        const dbProducts = await getCollectionFromMongo(Product);
        const filteredProducts = dbProducts.map(
          ({ _id, name, price, discount, imageUrl, brand, description, category, subcategory, stock }) => {
            return { _id, name, price, discount, imageUrl, brand, description, category, subcategory, stock };
          },
        );

        res.status(200).json(filteredProducts);
      } catch (err) {
        console.error('Product => GET', err);
        res.status(200).json({ toast: 'Failed to get product', failed: true });
      }
      break;
    case 'POST':
      try {
        // Create product
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

        res.status(200).json({ toast: 'Successfully created a new product!' });
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
            console.error('Product => POST', err);
            res.send({ toast: 'Failed to create a new product!', failed: true });
            break;
        }
      }
      break;
    case 'PUT':
      try {
        res.status(200).json({});
      } catch (err) {
        console.error('Product => PUT', err);
        res.status(200).json({ toast: 'Failed to PUT product', failed: true });
      }
      break;
    case 'DELETE':
      try {
        // Delete product
        res.status(200).json({});
      } catch (err) {
        console.error('Product => DELETE', err);
        res.status(200).json({ toast: 'Failed to DELETE product', failed: true });
      }
      break;
    default:
      console.error('Product => DEFAULT', err);
      res.status(400).json({ failed: true });
  }
};
