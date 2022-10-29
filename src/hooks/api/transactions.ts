import axios, { AxiosError, AxiosResponse } from "axios";
import { useMutation, useQuery } from "react-query";

import { Transaction, TransactionListResponse, TransactionRequestConfig } from "../../types";
import { API_URL } from "../../utils/constants";

export const useFetchTransactions = (options?: TransactionRequestConfig) => {
  const limit = options?.limit ?? 10;
  const page = options?.page ?? 0;
  let url = `${API_URL}/transactions?limit=${limit}&page=${page}`;
  if (options?.accountId) url = url.concat(`&account=${options.accountId}`);

  return useQuery<TransactionListResponse, AxiosResponse<TransactionListResponse, AxiosError>, TransactionListResponse>(
    ["transactions", limit, page, options?.accountId],
    async () => {
      const { data: response } = await axios.get<TransactionListResponse>(url);

      return response;
    },
    {
      keepPreviousData: true,
      staleTime: 5000,
    }
  );
};

export const useCreateTransaction = () =>
  useMutation((transaction: Omit<Transaction, "id">) => axios.post(`${API_URL}/transactions`, transaction));
