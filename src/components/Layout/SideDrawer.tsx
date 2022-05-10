import { CreditCardOutlined, UnorderedListOutlined } from "@ant-design/icons";
import { Drawer, Menu, Space } from "antd";

import { useFetchAccountsAndCategories } from "../../hooks";
import { groupBy, toCamelCase } from "./utils";

type Props = { open: boolean; onClose: () => void };

export const SideDrawer = ({ open, onClose }: Props) => {
  const [{ data: accounts = [] }, { data: categories = [] }] = useFetchAccountsAndCategories();

  const groupedCategories = groupBy(categories, ({ type }) => type);

  return (
    <Drawer onClose={onClose} placement="right" visible={open}>
      <Space direction="vertical" style={{ width: "100%", padding: 0 }}>
        <Menu
          selectable={false}
          items={[
            {
              key: "categories",
              label: "Categories",
              icon: <UnorderedListOutlined />,
              children: Object.keys(groupedCategories).map((key) => ({
                key: toCamelCase(key),
                label: key.toUpperCase(),
                children: groupedCategories[key].map(({ label, name }) => ({ label, key: name })),
              })),
            },
            {
              key: "accounts",
              label: "Accounts",
              icon: <CreditCardOutlined />,
              children: accounts.map(({ label, name }) => ({ label, key: name })),
            },
          ]}
          mode="inline"
        />
      </Space>
    </Drawer>
  );
};
