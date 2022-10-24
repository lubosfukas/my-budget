import { rest } from "msw";

import { Category, TransactionCreatePayload } from "../types";
import { API_URL } from "../utils/constants";
import { accounts, categories, transactions } from "../utils/mockedData";

const getRandomId = (min = 0, max = 1000) => Math.floor(Math.random() * (max - min) + min);

export const handlers = [
  rest.get(`${API_URL}/accounts`, (_, res, ctx) => res(ctx.delay(500), ctx.status(200), ctx.json(accounts))),
  rest.get(`${API_URL}/transactions`, (_, res, ctx) => res(ctx.status(200), ctx.json(transactions))),
  rest.post(`${API_URL}/transactions`, (req, res, ctx) => {
    const transaction = req.body as TransactionCreatePayload;

    return res(ctx.status(200), ctx.json({ ...transaction, id: getRandomId() }));
  }),
  rest.get(`${API_URL}/categories`, (_, res, ctx) => res(ctx.delay(1000), ctx.status(200), ctx.json(categories))),
  rest.get(`${API_URL}/categories/:id`, (req, res, ctx) => {
    const { id } = req.params;
    const category = categories.find(({ id: categoryId }) => id === categoryId.toString());

    return res(ctx.status(200), ctx.json(category));
  }),
  rest.post(`${API_URL}/categories`, (req, res, ctx) => {
    const category = req.body as Category;

    return res(ctx.status(201), ctx.json({ ...category, id: getRandomId() }));
  }),
  rest.patch(`${API_URL}/categories/:id`, (req, res, ctx) => {
    const { id } = req.params;
    const { label } = req.body as Category;
    const category = categories.find(({ id: categoryId }) => id === categoryId.toString());

    return res(ctx.delay(500), ctx.status(200), ctx.json({ ...category, label }));
  }),
  rest.delete(`${API_URL}/categories/:id`, (_, res, ctx) => res(ctx.delay(500), ctx.status(200))),
];
