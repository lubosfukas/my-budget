import { DatePickerProps } from "antd";
import moment from "moment";
import { rest } from "msw";

import {
  AccountCreatePayload,
  AccountModifyPayload,
  CategoryCreatePayload,
  CategoryModifyPayload,
  TransactionCreatePayload,
  TransactionModifyPayload,
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
    const body = req.body as AccountModifyPayload;
    const account = accounts.find(({ id: accountId }) => id === accountId.toString());
    return res(ctx.delay(500), ctx.status(200), ctx.json({ ...account, ...body }));
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
    const body = req.body as CategoryModifyPayload;
    const category = categories.find(({ id: categoryId }) => id === categoryId.toString());
    return res(ctx.delay(500), ctx.status(200), ctx.json({ ...category, ...body }));
  }),
  rest.delete(`${API_URL}/categories/:id`, (_, res, ctx) => res(ctx.delay(500), ctx.status(200))),
];

const transactionHandlers = [
  rest.get(`${API_URL}/transactions?limit=:limit&page=:page`, (req, res, ctx) => {
    const limitParam = req.url.searchParams.get("limit");
    const pageParam = req.url.searchParams.get("page");
    const accountParam = req.url.searchParams.get("account");
    const dateParam = req.url.searchParams.get("date");
    const periodParam = req.url.searchParams.get("period") as DatePickerProps["picker"] | null;

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

    return res(
      ctx.delay(500),
      ctx.status(200),
      ctx.json({
        selectionSettings: { limit, page, account: accountId },
        total: filteredTransactions.length,
        transactions: selectedTransactions,
      })
    );
  }),
  rest.get(`${API_URL}/transactions/:id`, (req, res, ctx) => {
    const { id } = req.params;
    const transaction = transactions.find(({ id: transactionId }) => id === transactionId.toString());
    return res(ctx.delay(500), ctx.status(200), ctx.json(transaction));
  }),
  rest.post(`${API_URL}/transactions`, (req, res, ctx) => {
    const transaction = req.body as TransactionCreatePayload;
    return res(ctx.delay(500), ctx.status(201), ctx.json({ ...transaction, id: getRandomId() }));
  }),
  rest.patch(`${API_URL}/transactions/:id`, (req, res, ctx) => {
    const { id } = req.params;
    const body = req.body as TransactionModifyPayload;
    const transaction = transactions.find(({ id: transactionId }) => id === transactionId.toString());
    return res(ctx.delay(500), ctx.status(200), ctx.json({ ...transaction, ...body }));
  }),
  rest.delete(`${API_URL}/transactions/:id`, (_, res, ctx) => res(ctx.delay(500), ctx.status(200))),
];

export const handlers = [...accountHandlers, ...categoryHandlers, ...transactionHandlers];
