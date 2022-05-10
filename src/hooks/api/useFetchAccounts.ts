import { useQuery } from "react-query";

import { API_URL } from "../../utils/constants";
import { Account } from "../../types";

export const fetchAccountsUrl = `${API_URL}/accounts`;
export const QUERY_KEY = "fetchAccounts";

export const fetchAccounts = async () => {
  const response = await fetch(fetchAccountsUrl);

  const accounts: Array<Account> = await response.json();
  return accounts;
};

export const useFetchAccounts = () => useQuery(QUERY_KEY, fetchAccounts);
