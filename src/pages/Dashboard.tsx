import { Table } from "antd";

import { Box } from "../components";

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

const data = [
  {
    key: 1,
    category: "Entertainment",
    note: "Spotify",
    balance: 11.99,
    date: "2022-04-17T09:24:30Z",
  },
];

export const Dashboard = () => (
  <Box>
    <Table columns={columns} dataSource={data} />
  </Box>
);
