import { Account, Category } from "../types";

export const accounts: Array<Account> = [
  { id: 1, label: "Visa", name: "visa" },
  { id: 2, label: "Cash", name: "cash" },
];

export const categories: Array<Category> = [
  { id: 1, label: "Food", name: "food", type: "EXPENSES" },
  { id: 2, label: "Healthcare", name: "healtcare", type: "EXPENSES" },
  { id: 3, label: "Insurance", name: "insurance", type: "EXPENSES" },
  { id: 4, label: "Investments", name: "investments", type: "EXPENSES" },
  { id: 5, label: "Housing", name: "housing", type: "EXPENSES" },
  { id: 6, label: "Personal spendings", name: "personalSpendings", type: "EXPENSES" },
  { id: 7, label: "Recreation & Entertainment", name: "recreationEntertainment", type: "EXPENSES" },
  { id: 8, label: "Savings", name: "savings", type: "EXPENSES" },
  { id: 9, label: "Transportation", name: "transportation", type: "EXPENSES" },
  { id: 10, label: "Utilities", name: "utilities", type: "EXPENSES" },
  { id: 11, label: "Salary", name: "salary", type: "INCOMES" },
  { id: 12, label: "Gift", name: "gift", type: "INCOMES" },
  { id: 13, label: "Refunds", name: "refunds", type: "INCOMES" },
];
