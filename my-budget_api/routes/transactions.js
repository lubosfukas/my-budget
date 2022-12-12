const express = require("express");
const moment = require("moment");
const mongoose = require("mongoose");

const { getCustomErrorMessage } = require("../utils/helpers");

const router = express.Router();
const { model, Schema, Types } = mongoose;

const transactionSchema = new Schema(
  {
    account: {
      type: Types.ObjectId,
      required: [true, "Account is required."],
    },
    balance: {
      type: "number",
      required: [true, "Balance is required."],
    },
    category: {
      type: Types.ObjectId,
      required: [true, "Category is required."],
      date: "dat",
    },
    note: "string",
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);
transactionSchema.virtual("id").get(function () {
  return this._id.toHexString();
});
transactionSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (_, res) {
    delete res._id;
  },
});

const Transaction = model("transaction", transactionSchema);

router.get("/", function (req, res) {
  const limitParam = req.query.limit;
  const pageParam = req.query.page;
  const dateParam = req.query.date;
  const periodParam = req.query.period;

  let start = new Date();
  let end = new Date();

  switch (periodParam) {
    case "week":
      start = moment(dateParam).startOf("week").toDate();
      end = moment(dateParam).endOf("week").toDate();
      break;
    case "month":
      start = moment(dateParam).startOf("month").toDate();
      end = moment(dateParam).endOf("month").toDate();
      break;
    case "year":
      start = moment(dateParam).startOf("year").toDate();
      end = moment(dateParam).endOf("year").toDate();
      break;
    default:
      start = moment(dateParam).startOf("day").toDate();
      end = moment(dateParam).endOf("day").toDate();
      break;
  }

  Transaction.find({
    createdAt: {
      $gte: start,
      $lte: end,
    },
  })
    .where("account")
    .equals(req.query.account)
    .limit(limitParam)
    .skip(limitParam * pageParam)
    .sort("createdAt")
    .exec((err, transactions) =>
      err
        ? res.status(400).send(getCustomErrorMessage(err.message))
        : res.status(200).send({
            transactions,
            selectionSettings: { limit: limitParam, page: pageParam, total: transactions.length },
          })
    );
});

router.get("/:id", async function (req, res) {
  await Transaction.findById(req.params.id).then((transaction) =>
    transaction ? res.status(200).send(transaction) : res.sendStatus(404)
  );
});

router.post("/", async function (req, res) {
  await Transaction.create(req.body)
    .then((transaction) => res.status(201).send(transaction))
    .catch(({ message }) => res.status(400).send(getCustomErrorMessage(message)));
});

router.patch("/:id", async function (req, res) {
  await Transaction.findByIdAndUpdate(req.params.id, req.body, { returnDocument: "after" })
    .then((transaction) => (transaction ? res.status(200).send(transaction) : res.sendStatus(404)))
    .catch(({ message }) => res.status(400).send(getCustomErrorMessage(message)));
});

router.delete("/:id", async function (_, res) {
  await Transaction.findByIdAndRemove(req.params.id).then((transaction) =>
    transaction ? res.sendStatus(204) : res.sendStatus(404)
  );
});

module.exports = router;
