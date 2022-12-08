const express = require("express");
const mongoose = require("mongoose");

const { getCustomErrorMessage } = require("../utils/helpers");

const router = express.Router();
const { Schema } = mongoose;

const accountSchema = new Schema({
  initialBalance: {
    type: "number",
    required: [true, "Initial balance is required."],
    min: [0, "Initial balance has to higher than 0."],
  },
  label: {
    type: "string",
    required: [true, "Label is required."],
  },
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
  await Account.findById(req.params.id).then((account) =>
    account ? res.status(200).send(account) : res.sendStatus(404)
  );
});

router.post("/", async function (req, res) {
  await Account.create(req.body)
    .then((account) => res.status(201).send(account))
    .catch(({ message }) => res.status(400).send(getCustomErrorMessage(message)));
});

router.patch("/:id", async function (req, res) {
  await Account.findByIdAndUpdate(req.params.id, req.body, { returnDocument: "after" })
    .then((account) => (account ? res.status(200).send(account) : res.sendStatus(404)))
    .catch(({ message }) => res.status(400).send(getCustomErrorMessage(message)));
});

router.delete("/:id", async function (req, res) {
  await Account.findByIdAndRemove(req.params.id).then((account) =>
    account ? res.sendStatus(204) : res.sendStatus(404)
  );
});

module.exports = router;
