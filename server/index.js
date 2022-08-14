const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
require('dotenv').config({ path: '.env' });

const router = require('./handlers/routes');

// Mongo database
mongoose.connect(process.env.MONGOOSE, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

// Express
const app = express();

app.use(helmet({ crossOriginResourcePolicy: false }));
app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(fileUpload());
app.use(express.static('./public', { maxAge: 604800000, immutable: true }));

if (app.get('env') === 'development') {
  // Adding delay to development env
  app.use((req, res, next) => {
    setTimeout(() => {
      next();
    }, process.env.RES_DELAY);
  });
}

app.use('/', router);

// Server
const server = require('http').createServer(app);

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
