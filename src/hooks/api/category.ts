import axios from "axios";
import { useMutation, useQuery } from "react-query";

import { Category, CategoryCreatePayload, CategoryModifyPayload } from "../../types";
import { API_URL } from "../../utils/constants";

export const useFetchCategories = () =>
  useQuery(["categories", "all"], async () => {
    const { data } = await axios.get<Array<Category>>(`${API_URL}/categories`);
    return data;
  });

export const useFetchCategory = (id: Category["id"]) =>
  useQuery(["categories", id], async () => {
    const { data } = await axios.get<Category>(`${API_URL}/categories/${id}`);
    return data;
  });

export const useCreateCategory = () =>
  useMutation((category: CategoryCreatePayload) => axios.post(`${API_URL}/categories`, category));

export const useModifyCategory = () =>
  useMutation(({ category, id }: { category: CategoryModifyPayload; id: Category["id"] }) =>
    axios.patch(`${API_URL}/categories/${id}`, category)
  );

export const useRemoveCategory = () => useMutation((id: Category["id"]) => axios.delete(`${API_URL}/categories/${id}`));
