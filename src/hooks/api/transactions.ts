import axios from "axios";
import { useMutation, useQuery } from "react-query";

import { Transaction } from "../../types";
import { API_URL } from "../../utils/constants";

export const useFetchTransactions = () =>
  useQuery(["transactions", "all"], async () => {
    const { data } = await axios.get<Array<Transaction>>(`${API_URL}/transactions`);
    return data;
  });

export const useCreateTransaction = () =>
  useMutation((transaction: Omit<Transaction, "id">) => axios.post(`${API_URL}/transactions`, transaction));
