import { CreditCardOutlined, UnorderedListOutlined } from "@ant-design/icons";
import { Drawer, Menu, Space } from "antd";

type Props = { open: boolean; onClose: () => void };

const items = [
  {
    key: "categories",
    label: "Categories",
    icon: <UnorderedListOutlined />,
    children: [
      {
        key: "entertainment",
        label: "Entertainment",
      },
      {
        key: "housing",
        label: "Housing",
      },
      {
        key: "transportation",
        label: "Transportation",
      },
    ],
  },
  {
    key: "accounts",
    label: "Accounts",
    icon: <CreditCardOutlined />,
    children: [
      {
        key: "visa",
        label: "Visa",
      },
      {
        key: "cash",
        label: "Cash",
      },
    ],
  },
];

export const SideDrawer = ({ open, onClose }: Props) => (
  <Drawer onClose={onClose} placement="right" visible={open}>
    <Space direction="vertical" style={{ width: "100%", padding: 0 }}>
      <Menu mode="inline" selectable={false} items={items} />
    </Space>
  </Drawer>
);
