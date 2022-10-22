import axios from "axios";
import { useQuery } from "react-query";

import { Category } from "../../types";
import { API_URL } from "../../utils/constants";

export const useFetchCategory = (id: Category["id"]) =>
  useQuery(["categories", id], async () => {
    const { data } = await axios.get<Category>(`${API_URL}/categories/${id}`);
    return data;
  });
