import SupportChat from '../../models/SupportChat';
import { dbConnect, getCollectionFromMongo } from '../../utils/dbMongo';

dbConnect();

const getSupportChat = async () => {
  return await getCollectionFromMongo(SupportChat);
};

const createSupportChat = async (data) => {
  return await SupportChat(data).save();
};

export default async (req, res) => {
  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        // get chats
        const chat = await getSupportChat();

        res.status(200).json(chat);
      } catch (err) {
        console.error('Support Chat => GET', err);
        res.status(200).json({ toast: 'Failed to get support chat', failed: true });
      }
      break;
    case 'POST':
      try {
        // add message to chat
        const { name, chat } = req.body;
        console.log('BLA1', name, chat)
        const aha = await createSupportChat(name, chat);

        console.log('BLA', aha)

        res.status(200).json();
      } catch (err) {
        console.error('Support Chat => POST', err);
        res.status(200).json({ toast: 'Failed to add message to support chat', failed: true });
      }
      break;
    case 'PUT':
      try {
        // Create chat

        res.status(200).json();
      } catch (err) {
        console.error('Support Chat => PUT', err);
        res.status(200).json({ toast: 'Failed to create support chat', failed: true });
      }
      break;
    default:
      console.error('Support Chat => DEFAULT', err);
      res.status(400).json({ failed: true });
  }
};
