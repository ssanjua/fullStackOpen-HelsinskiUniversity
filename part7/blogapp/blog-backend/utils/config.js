require("dotenv").config();

const PORT = process.env.PORT;
const MONGODB_URI =
  process.env.NODE_ENV === "test"
    ? process.env.MONGODB_URI_TEST
    : process.env.MONGODB_URI;

const SECRET = process.env.SECRET;

module.exports = {
  MONGODB_URI,
  PORT,
  SECRET,
};
