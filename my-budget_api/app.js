const createError = require("http-errors");
const cors = require("cors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

mongoose.set("strictQuery", false);
dotenv.config();

const indexRouter = require("./routes/index");
const accountsRouter = require("./routes/accounts");
const categoriesRouter = require("./routes/categories");
const transactionsRouter = require("./routes/transactions");

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

app.use("/", indexRouter);
app.use("/accounts", accountsRouter);
app.use("/categories", categoriesRouter);
app.use("/transactions", transactionsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

// mongodb connection
async function main() {
  await mongoose.connect(
    `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}.t7czoja.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
  );
}

main().catch((err) => console.log(err));

module.exports = app;
