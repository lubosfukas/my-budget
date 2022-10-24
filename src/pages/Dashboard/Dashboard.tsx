import { Table } from "antd";

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
  const { data: transactions, isLoading: isLoadingTransactions } = useFetchTransactions();
  const { data: categories, isLoading: isLoadingCategories } = useFetchCategories();

  const isLoading = isLoadingTransactions || isLoadingCategories;

  return (
    <div className={styles.wrapper}>
      <Table
        loading={isLoading}
        columns={columns}
        dataSource={transactions?.map(({ category, id, ...rest }) => ({
          ...rest,
          key: id,
          category: categories?.find(({ id: categoryId }) => categoryId === category)?.label ?? "",
        }))}
      />
    </div>
  );
};
