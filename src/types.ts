export type Account = {
  id: number;
  label: string;
  name: string;
};

export type CategoryType = "EXPENSES" | "INCOMES";

export type Category = {
  id: number;
  label: string;
  type: CategoryType;
};

export type Transaction = {
  id: number;
  balance: number;
  date: string;
  account: Account;
  category: Category;
  note?: string;
};
