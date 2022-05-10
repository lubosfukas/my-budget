import { useQuery } from "react-query";

import { API_URL } from "../../utils/constants";
import { Category } from "../../types";

export const fetchCategoriesUrl = `${API_URL}/categories`;
export const QUERY_KEY = "fetchCategories";

export const fetchCategories = async () => {
  const response = await fetch(fetchCategoriesUrl);

  const categories: Array<Category> = await response.json();
  return categories;
};

export const useFetchCategories = () => useQuery(QUERY_KEY, fetchCategories);
