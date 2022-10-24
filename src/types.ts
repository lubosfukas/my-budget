export type Account = {
  id: number;
  label: string;
};

export type Category = {
  id: number;
  label: string;
  type: "EXPENSES" | "INCOMES";
};

export type Transaction = {
  id: number;
  balance: number;
  date: string;
  account: Account["id"];
  category: Category["id"];
  note?: string;
};

export type TransactionCreatePayload = Pick<Transaction, "account" | "balance" | "category" | "date" | "note">;
