import axios from "axios";
import { useMutation } from "react-query";

import { Category } from "../../types";
import { API_URL } from "../../utils/constants";

export const useModifyCategory = () =>
  useMutation((category: Pick<Category, "label" | "id">) =>
    axios.patch(`${API_URL}/categories/${category.id}`, category)
  );
