import axios, { AxiosResponse } from "axios";
import { QueryKey, useMutation, useQuery, UseQueryOptions } from "react-query";

import { Account } from "../../types";
import { API_URL } from "../../utils/constants";

export const useFetchAccounts = (config?: UseQueryOptions<Array<Account>, AxiosResponse, Array<Account>>) =>
  useQuery(
    ["account", "all"] as QueryKey,
    async () => {
      const { data } = await axios.get<Array<Account>>(`${API_URL}/accounts`);
      return data;
    },
    config
  );

export const useFetchAccount = (id: Account["id"]) =>
  useQuery(["account", id], async () => {
    const { data } = await axios.get<Account>(`${API_URL}/accounts/${id}`);
    return data;
  });

export const useCreateAccount = () =>
  useMutation((account: Pick<Account, "label">) => axios.post(`${API_URL}/accounts`, account));

export const useModifyAccount = () =>
  useMutation((account: Pick<Account, "id" | "label">) => axios.patch(`${API_URL}/accounts/${account.id}`, account));

export const useRemoveAccount = () => useMutation((id: Account["id"]) => axios.delete(`${API_URL}/accounts/${id}`));
