import { useState } from "react";
import { Spin, Table } from "antd";

import { useFetchCategories, useFetchTransactions } from "../../hooks";
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
  const { data, isFetching, isLoading: isLoadingTransactions } = useFetchTransactions({ page: currentPage });
  const { data: categories, isLoading: isLoadingCategories } = useFetchCategories();

  if (isLoadingTransactions || isLoadingCategories) return <Spin />;

  return (
    <div className={styles.wrapper}>
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
    </div>
  );
};
