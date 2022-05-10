import { useTypedQueries } from "../useTypedQueries";
import { fetchAccounts, QUERY_KEY as fetchAccountsQueryKey } from "./useFetchAccounts";
import { fetchCategories, QUERY_KEY as fetchCategoriesQueryKey } from "./useFetchCategories";

export const useFetchAccountsAndCategories = () =>
  useTypedQueries([
    {
      queryKey: fetchAccountsQueryKey,
      queryFn: () => fetchAccounts(),
    },
    {
      queryKey: fetchCategoriesQueryKey,
      queryFn: () => fetchCategories(),
    },
  ]);
