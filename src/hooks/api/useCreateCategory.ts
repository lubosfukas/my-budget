import axios from "axios";
import { useMutation } from "react-query";

import { Category } from "../../types";
import { API_URL } from "../../utils/constants";

export const useCreateCategory = () =>
  useMutation((category: Pick<Category, "label" | "type">) => axios.post(`${API_URL}/categories`, category));
