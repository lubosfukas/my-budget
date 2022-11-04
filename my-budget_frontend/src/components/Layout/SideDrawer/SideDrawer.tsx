import { Drawer, Space, Spin } from "antd";

import { useFetchAccounts, useFetchCategories } from "../../../hooks";
import { AccountMenu } from "./AccountMenu";
import { CategoryMenu } from "./CategoryMenu";
import styles from "./SideDrawer.module.less";

type Props = { open: boolean; onClose: () => void };

export const SideDrawer = ({ open, onClose }: Props) => {
  const { data: accounts, isLoading: isLoadingAccounts } = useFetchAccounts();
  const { data: categories, isLoading: isLoadingCategories } = useFetchCategories();

  const isLoading = isLoadingAccounts || isLoadingCategories;

  return (
    <Drawer destroyOnClose visible={open} placement="right" onClose={onClose}>
      {isLoading && (
        <div className={styles.wrapper}>
          <Spin />
        </div>
      )}
      {!isLoading && accounts && categories && (
        <Space direction="vertical" style={{ width: "100%", padding: 0 }}>
          <CategoryMenu categories={categories} />
          <AccountMenu accounts={accounts} />
        </Space>
      )}
    </Drawer>
  );
};
