import { useState } from "react";
import { Spin, Table } from "antd";
import classNames from "classnames";
import { useSearchParams } from "react-router-dom";

import { useFetchCategories, useFetchTransactions } from "../../hooks";
import { ACCOUNT_KEY } from "../../utils/constants";
import styles from "./Dashboard.module.less";

const columns = [
  {
    title: "Category",
    dataIndex: "category",
    key: "category",
  },
  {
    title: "Note",
    dataIndex: "note",
    key: "note",
  },
  {
    title: "Balance",
    dataIndex: "balance",
    key: "balance",
  },
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
    render: (date: string) =>
      new Date(date).toLocaleDateString("en-EN", {
        day: "2-digit",
        month: "long",
        timeZone: "Europe/Berlin",
      }),
  },
];

export const Dashboard = () => {
  const [currentPage, setCurrentPage] = useState(0);

  const [searchParams] = useSearchParams();
  const accountId = searchParams.get(ACCOUNT_KEY);

  const {
    data,
    isFetching,
    isLoading: isLoadingTransactions,
  } = useFetchTransactions({
    limit: 10,
    page: currentPage,
    accountId: accountId ? parseInt(accountId, 10) : undefined,
  });
  const { data: categories, isLoading: isLoadingCategories } = useFetchCategories();

  const isLoading = isLoadingTransactions || isLoadingCategories;

  return (
    <div className={classNames(styles.wrapper, { [styles.loading]: isLoading })}>
      {isLoading && <Spin />}
      {!isLoading && (
        <Table
          loading={isFetching}
          columns={columns}
          dataSource={data?.transactions.map(({ category, id, ...rest }) => ({
            ...rest,
            key: id,
            category: categories?.find(({ id: categoryId }) => categoryId === category)?.label ?? "",
          }))}
          pagination={{
            total: data?.total,
            onChange: (page) => {
              const newPage = page - 1;
              if (newPage > currentPage) setCurrentPage((prev) => prev + 1);
              else setCurrentPage((prev) => Math.max(prev - 1, 0));
            },
          }}
        />
      )}
    </div>
  );
};
