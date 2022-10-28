import axios, { AxiosError, AxiosResponse } from "axios";
import { useMutation, useQuery } from "react-query";

import { Transaction, TransactionListResponse } from "../../types";
import { API_URL } from "../../utils/constants";

type TransactionRequestConfig = Partial<TransactionListResponse["selectionSettings"]>;

export const useFetchTransactions = (options?: TransactionRequestConfig) => {
  const limit = options?.limit ?? 10;
  const page = options?.page ?? 0;

  return useQuery<TransactionListResponse, AxiosResponse<TransactionListResponse, AxiosError>, TransactionListResponse>(
    ["transactions", limit, page],
    async () => {
      const { data: response } = await axios.get<TransactionListResponse>(
        `${API_URL}/transactions?limit=${limit}&page=${page}`
      );

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
