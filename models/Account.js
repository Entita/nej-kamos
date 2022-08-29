const mongoose = require('mongoose');
const Basket = require('./Basket');
const Schema = mongoose.Schema;

const accountSchema = new Schema(
  {
    firstname: {
      type: String || null,
      default: null,
    },
    surname: {
      type: String || null,
      default: null,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: Number || null,
      default: null,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    roles: {
      type: [String],
      default: ['user'],
    },
    basketId: {
      type: String,
      default: () => {
        const basket = Basket();
        basket.save();
        return basket._id;
      },
    },
    emailSentAt: {
      type: Date,
      default: new Date(),
    },
    transactionIds: {
      type: [String],
      default: [],
    },
    address: {
      type:
        {
          _id: false,
          city: {
            type: String,
            required: true,
          },
          street: {
            type: String,
            required: true,
          },
          streetNumber: {
            type: Number,
            required: true,
          },
          zip: {
            type: Number,
            required: true,
          },
        } || null,
      default: null,
    },
    notifications: {
      type: {
        _id: false,
        news: {
          type: Boolean,
          required: true,
        },
        marketing: {
          type: Boolean,
          required: true,
        },
      },
      required: true,
    },
  },
  { timestamps: true },
);

const declareModel = () => {
  try {
    const model = mongoose.model('accounts');
    // model already declared
    return model;
  } catch {
    // declare model
    return mongoose.model('accounts', accountSchema);
  }
};

module.exports = declareModel();
