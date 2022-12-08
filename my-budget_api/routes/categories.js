const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();
const { Schema, Types } = mongoose;

const categorySchema = new Schema({
  account: Types.ObjectId,
  label: "string",
  type: {
    type: "string",
    enum: ["Expenses", "Incomes"],
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
  const { id } = req.params;
  await Category.findById(id).then((category) => res.status(200).send(category));
});

router.post("/", async function (req, res) {
  await Category.create(req.body).then((category) => res.status(201).send(category));
});

router.patch("/:id", async function (req, res) {
  const { id } = req.params;
  await Category.findByIdAndUpdate(id, req.body, { returnDocument: "after" }).then((category) =>
    res.status(200).send(category)
  );
});

router.delete("/:id", async function (req, res) {
  await Category.findByIdAndRemove(req.params.id).then(() => res.sendStatus(204));
});

module.exports = router;
