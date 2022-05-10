import { rest } from "msw";

import { accounts, categories } from "../utils/mockedData";
import { fetchAccountsUrl, fetchCategoriesUrl } from "../hooks";

export const handlers = [
  rest.get(fetchAccountsUrl, (_, res, ctx) => res(ctx.status(200), ctx.json(accounts))),
  rest.get(fetchCategoriesUrl, (_, res, ctx) => res(ctx.status(200), ctx.json(categories))),
];
