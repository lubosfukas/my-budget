import axios from "axios";
import { useMutation } from "react-query";

import { Category } from "../../types";
import { API_URL } from "../../utils/constants";

export const useRemoveCategory = () => useMutation((id: Category["id"]) => axios.delete(`${API_URL}/categories/${id}`));
