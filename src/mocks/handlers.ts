import { rest } from "msw";

import { fetchAccountsUrl, fetchCategoriesUrl } from "../hooks";
import { accounts, categories } from "../utils/mockedData";

export const handlers = [
  rest.get(fetchAccountsUrl, (_, res, ctx) => res(ctx.status(200), ctx.json(accounts))),
  rest.get(fetchCategoriesUrl, (_, res, ctx) => res(ctx.status(200), ctx.json(categories))),
];
