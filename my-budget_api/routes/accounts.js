const express = require("express");
const router = express.Router();

const getRandomId = (min = 0, max = 1000) => Math.floor(Math.random() * (max - min) + min);

const accounts = [
  { id: 1, initialBalance: 1200, label: "Visa" },
  { id: 2, initialBalance: 56, label: "Cash" },
];

router.get("/", function (_, res) {
  res.status(200).send(accounts);
});

router.get("/:id", function (req, res) {
  const { id } = req.params;
  const account = accounts.find(({ id: accountId }) => id === accountId.toString());

  if (account) res.status(200).send(account);
  else res.sendStatus(404);
});

router.post("/", function (req, res) {
  res.status(201).send({ ...req.body, id: getRandomId() });
});

router.patch("/:id", function (req, res) {
  const { id } = req.params;
  const body = req.body;
  const account = accounts.find(({ id: accountId }) => id === accountId.toString());

  if (account) res.status(200).send({ ...account, ...body });
  else res.sendStatus(404);
});

router.delete("/:id", function (_, res) {
  res.sendStatus(204);
});

module.exports = router;
