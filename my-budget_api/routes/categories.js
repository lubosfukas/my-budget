const express = require("express");
const mongoose = require("mongoose");

const { getCustomErrorMessage } = require("../utils/helpers");

const router = express.Router();
const { Schema, Types } = mongoose;

const categorySchema = new Schema({
  account: Types.ObjectId,
  label: {
    type: "string",
    required: [true, "Label is required."],
  },
  type: {
    type: "string",
    enum: ["Expenses", "Incomes"],
    required: [true, "Type is required."],
  },
});
categorySchema.virtual("id").get(function () {
  return this._id.toHexString();
});
categorySchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (_, res) {
    delete res._id;
  },
});

const Category = mongoose.model("category", categorySchema);

router.get("/", async function (_, res) {
  await Category.find({})
    .where("account")
    .equals(undefined)
    .then((categories) => res.status(200).send(categories));
});

router.get("/:id", async function (req, res) {
  await Category.findById(req.params.id).then((category) =>
    category ? res.status(200).send(category) : res.sendStatus(404)
  );
});

router.post("/", async function (req, res) {
  await Category.create(req.body)
    .then((category) => res.status(201).send(category))
    .catch(({ message }) => res.status(400).send(getCustomErrorMessage(message)));
});

router.patch("/:id", async function (req, res) {
  const { id } = req.params;
  await Category.findByIdAndUpdate(id, req.body, { returnDocument: "after" })
    .then((category) => (category ? res.status(200).send(category) : res.sendStatus(404)))
    .catch(({ message }) => res.status(400).send(getCustomErrorMessage(message)));
});

router.delete("/:id", async function (req, res) {
  await Category.findByIdAndRemove(req.params.id).then((category) =>
    category ? res.sendStatus(204) : res.sendStatus(404)
  );
});

module.exports = router;
