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

export type TransactionCreatePayload = Omit<Transaction, "id">;
export type TransactionModifyPayload = TransactionCreatePayload;
