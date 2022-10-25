import { rest } from "msw";

import {
  AccountCreatePayload,
  AccountModifyPayload,
  CategoryCreatePayload,
  CategoryModifyPayload,
  TransactionCreatePayload,
} from "../types";
import { API_URL } from "../utils/constants";
import { accounts, categories, transactions } from "../utils/mockedData";

const getRandomId = (min = 0, max = 1000) => Math.floor(Math.random() * (max - min) + min);

const accountHandlers = [
  rest.get(`${API_URL}/accounts`, (_, res, ctx) => res(ctx.delay(500), ctx.status(200), ctx.json(accounts))),
  rest.get(`${API_URL}/accounts/:id`, (req, res, ctx) => {
    const { id } = req.params;
    const account = accounts.find(({ id: accountId }) => id === accountId.toString());
    return res(ctx.delay(500), ctx.status(200), ctx.json(account));
  }),
  rest.post(`${API_URL}/accounts`, (req, res, ctx) => {
    const account = req.body as AccountCreatePayload;
    return res(ctx.delay(500), ctx.status(201), ctx.json({ ...account, id: getRandomId() }));
  }),
  rest.patch(`${API_URL}/accounts/:id`, (req, res, ctx) => {
    const { id } = req.params;
    const { label } = req.body as AccountModifyPayload;
    const account = accounts.find(({ id: accountId }) => id === accountId.toString());
    return res(ctx.delay(500), ctx.status(200), ctx.json({ ...account, label }));
  }),
  rest.delete(`${API_URL}/accounts/:id`, (_, res, ctx) => res(ctx.delay(500), ctx.status(200))),
];

const categoryHandlers = [
  rest.get(`${API_URL}/categories`, (_, res, ctx) => res(ctx.delay(500), ctx.status(200), ctx.json(categories))),
  rest.get(`${API_URL}/categories/:id`, (req, res, ctx) => {
    const { id } = req.params;
    const category = categories.find(({ id: categoryId }) => id === categoryId.toString());
    return res(ctx.delay(500), ctx.status(200), ctx.json(category));
  }),
  rest.post(`${API_URL}/categories`, (req, res, ctx) => {
    const category = req.body as CategoryCreatePayload;
    return res(ctx.delay(500), ctx.status(201), ctx.json({ ...category, id: getRandomId() }));
  }),
  rest.patch(`${API_URL}/categories/:id`, (req, res, ctx) => {
    const { id } = req.params;
    const { label } = req.body as CategoryModifyPayload;
    const category = categories.find(({ id: categoryId }) => id === categoryId.toString());
    return res(ctx.delay(500), ctx.status(200), ctx.json({ ...category, label }));
  }),
  rest.delete(`${API_URL}/categories/:id`, (_, res, ctx) => res(ctx.delay(500), ctx.status(200))),
];

export const handlers = [
  ...accountHandlers,
  ...categoryHandlers,

  rest.get(`${API_URL}/transactions`, (_, res, ctx) => res(ctx.status(200), ctx.json(transactions))),
  rest.post(`${API_URL}/transactions`, (req, res, ctx) => {
    const transaction = req.body as TransactionCreatePayload;
    return res(ctx.status(200), ctx.json({ ...transaction, id: getRandomId() }));
  }),
];
