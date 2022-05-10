export type Account = {
  id: number;
  label: string;
  name: string;
};

export type CategoryType = "EXPENSES" | "INCOMES";

export type Category = {
  id: number;
  label: string;
  name: string;
  type: CategoryType;
};
