import { DatePickerProps } from "antd";

export type Account = {
  id: number;
  initialBalance: number;
  label: string;
};

export type AccountCreatePayload = Omit<Account, "id">;
export type AccountModifyPayload = AccountCreatePayload;

export type Category = {
  id: number;
  label: string;
  type: "EXPENSES" | "INCOMES";
  account?: Account["id"];
};

export type CategoryCreatePayload = Omit<Category, "id">;
export type CategoryModifyPayload = Pick<Category, "label">;

export type Transaction = {
  account: Account["id"];
  balance: number;
  category: Category["id"];
  date: string;
  id: number;
  note?: string;
};

export type TransactionRequestConfig = {
  page: number;
  accountId?: Account["id"];
  date?: string;
  limit?: number;
  period?: DatePickerProps["picker"];
};

export type TransactionListResponse = {
  transactions: Array<Transaction>;
  selectionSettings: {
    limit: number;
    page: number | null;
    accountId: Account["id"] | null;
    date: string | null;
    period: DatePickerProps["picker"] | null;
  };
  total: number;
};

export type TransactionCreatePayload = Omit<Transaction, "id">;
export type TransactionModifyPayload = TransactionCreatePayload;
