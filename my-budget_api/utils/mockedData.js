const accounts = [
  { id: 1, initialBalance: 1200, label: "Visa" },
  { id: 2, initialBalance: 56, label: "Cash" },
];

const visaAccount = accounts[0];
const cashAccount = accounts[1];

const categories = [
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

module.exports = {
  accounts,
  categories,
};
