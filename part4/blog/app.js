const express = require('express');
const mongoose = require('mongoose');
const { MONGODB_URI } = require('./utils/config');
const blogsRouter = require('./controllers/blogs');
const logger = require('./utils/logger');

const app = express();

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  logger.info('database connected');
}).catch((error) => {
  logger.error('error connecting to database:', error.message);
});

app.use(express.json());
app.use('/api/blogs', blogsRouter);

module.exports = app;