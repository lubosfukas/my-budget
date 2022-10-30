import { Account, Category, Transaction } from "../types";

export const accounts: Array<Account> = [
  { id: 1, initialBalance: 1200, label: "Visa" },
  { id: 2, initialBalance: 56, label: "Cash" },
];

const visaAccount = accounts[0];
const cashAccount = accounts[1];

export const categories: Array<Category> = [
  { id: 1, label: "From Visa", type: "INCOMES", account: cashAccount.id },
  { id: 2, label: "To Visa", type: "EXPENSES", account: cashAccount.id },
  { id: 3, label: "From Cash", type: "INCOMES", account: visaAccount.id },
  { id: 4, label: "To Cash", type: "EXPENSES", account: visaAccount.id },
  { id: 5, label: "Food", type: "EXPENSES" },
  { id: 6, label: "Healthcare", type: "EXPENSES" },
  { id: 7, label: "Insurance", type: "EXPENSES" },
  { id: 8, label: "Investments", type: "EXPENSES" },
  { id: 9, label: "Housing", type: "EXPENSES" },
  { id: 10, label: "Personal spendings", type: "EXPENSES" },
  { id: 11, label: "Recreation & Entertainment", type: "EXPENSES" },
  { id: 12, label: "Savings", type: "EXPENSES" },
  { id: 13, label: "Transportation", type: "EXPENSES" },
  { id: 14, label: "Utilities", type: "EXPENSES" },
  { id: 15, label: "Salary", type: "INCOMES" },
  { id: 16, label: "Gift", type: "INCOMES" },
  { id: 17, label: "Refunds", type: "INCOMES" },
];

const foodCategory = categories[4];
const entertainmentCategory = categories[10];

export const transactions: Array<Transaction> = [
  {
    id: 1001,
    account: visaAccount.id,
    balance: 11.99,
    category: entertainmentCategory.id,
    date: "2022-04-17T00:00:00Z",
    note: "Spotify",
  },
  {
    id: 1002,
    account: visaAccount.id,
    balance: 4.66,
    category: entertainmentCategory.id,
    note: "HBO Max",
    date: "2022-04-17T00:00:00Z",
  },
  {
    id: 1003,
    account: visaAccount.id,
    balance: 23.05,
    category: foodCategory.id,
    date: "2022-04-21T00:00:00Z",
  },
  {
    id: 1004,
    account: visaAccount.id,
    balance: 14.45,
    category: entertainmentCategory.id,
    date: "2022-04-25T00:00:00Z",
  },
  {
    id: 1005,
    account: visaAccount.id,
    balance: 19.2,
    category: entertainmentCategory.id,
    date: "2022-10-25T00:00:00Z",
  },
  {
    id: 1006,
    account: visaAccount.id,
    balance: 2.05,
    category: entertainmentCategory.id,
    date: "2022-10-25T00:00:00Z",
  },
  {
    id: 1007,
    account: visaAccount.id,
    balance: 38.12,
    category: foodCategory.id,
    date: "2022-09-25T00:00:00Z",
  },
  {
    id: 1008,
    account: visaAccount.id,
    balance: 4,
    category: entertainmentCategory.id,
    date: "2022-09-20T00:00:00Z",
  },
  {
    id: 1009,
    account: visaAccount.id,
    balance: 13.01,
    category: entertainmentCategory.id,
    date: "2022-09-25T00:00:00Z",
  },
  {
    id: 1010,
    account: visaAccount.id,
    balance: 15,
    category: entertainmentCategory.id,
    date: "2022-10-25T00:00:00Z",
  },
  {
    id: 1011,
    account: visaAccount.id,
    balance: 52.05,
    category: foodCategory.id,
    date: "2022-10-23T00:00:00Z",
  },
  {
    id: 1012,
    account: visaAccount.id,
    balance: 5,
    category: entertainmentCategory.id,
    date: "2022-10-25T00:00:00Z",
  },
];
