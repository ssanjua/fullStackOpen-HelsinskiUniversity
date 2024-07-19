const express = require("express");
const mongoose = require("mongoose");
const { MONGODB_URI } = require("./utils/config");
const blogsRouter = require("./controllers/blogs");
const logger = require("./utils/logger");
const errorHandler = require("./middleware/handleError");
const usersRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");
const middleware = require("./middleware/handleToken");
const testingRouter = require("./controllers/testRouter");

const app = express();

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    logger.info("database connected");
  })
  .catch((error) => {
    logger.error("error connecting to database:", error.message);
  });

app.use(express.json());
app.use(middleware.tokenExtractor);
app.use("/api/blogs", middleware.tokenExtractor, blogsRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);

if (process.env.NODE_ENV === "test") {
  const testingRouter = require("./controllers/testRouter");
  app.use("/api/testing", testingRouter);
}

app.use(errorHandler);

module.exports = app;
