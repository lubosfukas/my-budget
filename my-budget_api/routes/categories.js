const { getRandomId } = require("../utils/helpers");
const { categories } = require("../utils/mockedData");

const express = require("express");
const router = express.Router();

router.get("/", function (_, res) {
  res.status(200).send(categories.filter(({ account }) => account === undefined));
});

router.get("/:id", function (req, res) {
  const { id } = req.params;
  const category = categories.find(({ id: categoryId }) => id === categoryId.toString());

  if (category) res.status(200).send(category);
  else res.sendStatus(404);
});

router.post("/", function (req, res) {
  res.status(201).send({ ...req.body, id: getRandomId() });
});

router.patch("/:id", function (req, res) {
  const { id } = req.params;
  const body = req.body;
  const category = categories.find(({ id: categoryId }) => id === categoryId.toString());

  if (category) res.status(200).send({ ...category, ...body });
  else res.sendStatus(404);
});

router.delete("/:id", function (_, res) {
  res.sendStatus(204);
});

module.exports = router;
