import { fetchAccounts, QUERY_KEY as fetchAccountsQueryKey } from "./useFetchAccounts";
import { fetchCategories, QUERY_KEY as fetchCategoriesQueryKey } from "./useFetchCategories";
import { useTypedQueries } from "../useTypedQueries";

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
