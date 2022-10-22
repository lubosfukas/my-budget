import { Account, Category, Transaction } from "../types";

export const accounts: Array<Account> = [
  { id: 1, label: "Visa", name: "visa" },
  { id: 2, label: "Cash", name: "cash" },
];

const visaAccount = accounts[0];

export const categories: Array<Category> = [
  { id: 1, label: "Food", type: "EXPENSES" },
  { id: 2, label: "Healthcare", type: "EXPENSES" },
  { id: 3, label: "Insurance", type: "EXPENSES" },
  { id: 4, label: "Investments", type: "EXPENSES" },
  { id: 5, label: "Housing", type: "EXPENSES" },
  { id: 6, label: "Personal spendings", type: "EXPENSES" },
  { id: 7, label: "Recreation & Entertainment", type: "EXPENSES" },
  { id: 8, label: "Savings", type: "EXPENSES" },
  { id: 9, label: "Transportation", type: "EXPENSES" },
  { id: 10, label: "Utilities", type: "EXPENSES" },
  { id: 11, label: "Salary", type: "INCOMES" },
  { id: 12, label: "Gift", type: "INCOMES" },
  { id: 13, label: "Refunds", type: "INCOMES" },
];

const foodCategory = categories[0];
const entertainmentCategory = categories[6];

export const transactions: Array<Transaction> = [
  {
    id: 1001,
    account: visaAccount,
    balance: 11.99,
    category: entertainmentCategory,
    date: "2022-04-17T00:00:00Z",
    note: "Spotify",
  },
  {
    id: 1002,
    account: visaAccount,
    balance: 4.66,
    category: entertainmentCategory,
    note: "HBO Max",
    date: "2022-04-17T00:00:00Z",
  },
  {
    id: 1003,
    account: visaAccount,
    balance: 23.05,
    category: foodCategory,
    date: "2022-04-21T00:00:00Z",
  },
  {
    id: 1004,
    account: visaAccount,
    balance: 14.45,
    category: entertainmentCategory,
    date: "2022-04-25T00:00:00Z",
  },
];
