import { useQuery } from "react-query";

import { Transaction } from "../../types";
import { API_URL } from "../../utils/constants";

export const fetchTransactionsUrl = `${API_URL}/transactions`;
export const QUERY_KEY = "fetchTransactions";

export const fetchTransactions = async () => {
  const response = await fetch(fetchTransactionsUrl);

  const transactions: Array<Transaction> = await response.json();
  return transactions;
};

export const useFetchTransactions = () => useQuery(QUERY_KEY, fetchTransactions);
