const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const supportChatSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    chat: {
      type: [
        {
          _id: false,
          __v: false,
          name: String,
          text: String,
          createdAt: {
            type: Date,
            default: new Date(),
          },
        }
      ],
      default: [],
    },
  },
);

const declareModel = () => {
  try {
    const model = mongoose.model('supportchats');
    // model already declared
    return model;
  } catch {
    // declare model
    return mongoose.model('supportchats', supportChatSchema);
  }
};

module.exports = declareModel();
