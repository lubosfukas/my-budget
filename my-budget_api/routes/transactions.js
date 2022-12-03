const { getRandomId } = require("../utils/helpers");
const { transactions } = require("../utils/mockedData");

const express = require("express");
const moment = require("moment");
const router = express.Router();

router.get("/", function (req, res) {
  const limitParam = req.query.limit;
  const pageParam = req.query.page;
  const accountParam = req.query.account;
  const dateParam = req.query.date;
  const periodParam = req.query.period;

  let accountTransactions = [...transactions];
  const accountId = accountParam ? parseInt(accountParam, 10) : null;
  if (accountId) accountTransactions = accountTransactions.filter(({ account }) => account === accountId);

  let filteredTransactions = [...accountTransactions];
  if (periodParam) {
    const dateMoment = moment(dateParam);
    switch (periodParam) {
      case "date":
        filteredTransactions = filteredTransactions.filter(({ date }) => moment(date).day() === dateMoment.day());
        break;
      case "week":
        filteredTransactions = filteredTransactions.filter(({ date }) => moment(date).week() === dateMoment.week());
        break;
      case "month":
        filteredTransactions = filteredTransactions.filter(({ date }) => moment(date).month() === dateMoment.month());
        break;
      case "year":
        filteredTransactions = filteredTransactions.filter(({ date }) => moment(date).year() === dateMoment.year());
        break;
      default:
        filteredTransactions = [...accountTransactions];
    }
  }

  const limit = limitParam ? parseInt(limitParam, 10) : 10;
  const page = pageParam ? parseInt(pageParam, 10) : 0;
  const offset = page * limit;
  const selectedTransactions = filteredTransactions.slice(offset, offset + limit);

  res.status(200).send({
    selectionSettings: { limit, page, account: accountId },
    total: filteredTransactions.length,
    transactions: selectedTransactions,
  });
});

router.get("/:id", function (req, res) {
  const { id } = req.params;
  const transaction = transactions.find(({ id: transactionId }) => id === transactionId.toString());

  if (transaction) res.status(200).send(transaction);
  else res.sendStatus(404);
});

router.post("/", function (req, res) {
  res.status(201).send({ ...req.body, id: getRandomId() });
});

router.patch("/:id", function (req, res) {
  const { id } = req.params;
  const body = req.body;
  const transaction = transactions.find(({ id: transactionId }) => id === transactionId.toString());

  if (transaction) res.status(200).send({ ...transaction, ...body });
  else res.sendStatus(404);
});

router.delete("/:id", function (_, res) {
  res.sendStatus(204);
});

module.exports = router;
