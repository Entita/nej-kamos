import mongoose from 'mongoose';

export const dbConnect = async () => {
  if (mongoose.connections[0].readyState) return;

  await mongoose.connect(process.env.MONGOOSE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

export const findOneFromMongo = async (collection, filter) => {
  return await new Promise((resolve) => {
    collection.findOne(filter, (err, data) => {
      if (err) throw err;
      if (data) resolve(data);
      else resolve(null);
    });
  });
};

export const UpdateOneFromMongo = async (collection, filter, update) => {
  return await new Promise((resolve) => {
    collection.updateOne(filter, update, (err, data) => {
      if (err) throw err;
      if (data.modifiedCount > 0) resolve(true);
      else resolve(false);
    });
  });
};

export const findAllFromMongo = async (collection, filter) => {
  return await new Promise((resolve) => {
    collection.find(filter, (err, data) => {
      if (err) throw err;
      if (data) resolve(data);
      else resolve(null);
    });
  });
};

export const getCollectionFromMongo = async (collection) => {
  return await new Promise((resolve) => {
    collection.find({}, (err, data) => {
      if (err) throw err;
      if (data) resolve(data);
      else resolve(null);
    });
  });
};
