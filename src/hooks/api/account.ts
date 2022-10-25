import axios, { AxiosResponse } from "axios";
import { QueryKey, useMutation, useQuery, UseQueryOptions } from "react-query";

import { Account, AccountCreatePayload, AccountModifyPayload } from "../../types";
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
  useMutation((account: AccountCreatePayload) => axios.post(`${API_URL}/accounts`, account));

export const useModifyAccount = () =>
  useMutation(({ account, id }: { account: AccountModifyPayload; id: Account["id"] }) =>
    axios.patch(`${API_URL}/accounts/${id}`, account)
  );

export const useRemoveAccount = () => useMutation((id: Account["id"]) => axios.delete(`${API_URL}/accounts/${id}`));
