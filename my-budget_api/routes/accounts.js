const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();

const accountSchema = new mongoose.Schema({
  initialBalance: "number",
  label: "string",
});
accountSchema.virtual("id").get(function () {
  return this._id.toHexString();
});
accountSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (_, res) {
    delete res._id;
  },
});

const Account = mongoose.model("account", accountSchema);

router.get("/", async function (_, res) {
  const accounts = await Account.find({});
  res.status(200).send(accounts);
});

router.get("/:id", async function (req, res) {
  const { id } = req.params;
  const account = await Account.findById(id);

  if (account) res.status(200).send(account);
  else res.sendStatus(404);
});

router.post("/", async function (req, res) {
  await Account.create(req.body)
    .then((account) => res.status(201).send(account))
    .catch(() => res.sendStatus(400));
});

router.patch("/:id", async function (req, res) {
  const { id } = req.params;
  const body = req.body;
  await Account.findByIdAndUpdate(id, body, { returnDocument: "after" })
    .then((account) => res.status(200).send(account))
    .catch(() => res.sendStatus(400));
});

router.delete("/:id", async function (req, res) {
  const { id } = req.params;
  await Account.findByIdAndRemove({ _id: id })
    .then(() => res.sendStatus(204))
    .catch(() => res.sendStatus(404));
});

module.exports = router;
