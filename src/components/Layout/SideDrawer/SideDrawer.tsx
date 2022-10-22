import { useState } from "react";
import { CreditCardOutlined, UnorderedListOutlined } from "@ant-design/icons";
import { Drawer, Menu, Space, Spin } from "antd";

import { useFetchAccounts, useFetchCategories } from "../../../hooks";
import { Category } from "../../../types";
import { groupBy, toCamelCase } from "../utils";
import { EditCategory } from "./EditCategory";
import styles from "./SideDrawer.module.less";

type Props = { open: boolean; onClose: () => void };

export const SideDrawer = ({ open, onClose }: Props) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | undefined>();
  const { data: accounts, isLoading: isLoadingAccounts } = useFetchAccounts();
  const { data: categories, isLoading: isLoadingCategories } = useFetchCategories();

  const isLoading = isLoadingAccounts || isLoadingCategories;
  const groupedCategories = categories && categories.length > 0 ? groupBy(categories, ({ type }) => type) : {};

  return (
    <>
      <Drawer destroyOnClose visible={open} placement="right" onClose={onClose}>
        {isLoading && (
          <div className={styles.wrapper}>
            <Spin />
          </div>
        )}
        {!isLoading && (
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
                    children: groupedCategories[key].map(({ label, id }) => ({
                      label,
                      key: `${id}-${toCamelCase(label)}`,
                    })),
                  })),
                },
                {
                  key: "accounts",
                  label: "Accounts",
                  icon: <CreditCardOutlined />,
                  children: accounts?.map(({ label, id }) => ({ label, key: `${id}-${toCamelCase(label)}` })),
                },
              ]}
              mode="inline"
              onClick={({ key }) => {
                const [id, label] = key.split("-");
                const category = categories?.find(
                  ({ id: categoryId, label: categoryLabel }) =>
                    id === categoryId.toString() && label === toCamelCase(categoryLabel)
                );
                setSelectedCategory(category);
                setModalOpen(true);
              }}
            />
          </Space>
        )}
      </Drawer>
      {selectedCategory && (
        <EditCategory category={selectedCategory} visible={modalOpen} onClose={() => setModalOpen(false)} />
      )}
    </>
  );
};
