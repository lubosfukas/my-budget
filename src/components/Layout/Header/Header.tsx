import { Button, Layout, PageHeader } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import { useState } from "react";

import { useSearchParams } from "react-router-dom";

import { ACCOUNT_KEY } from "../../../utils/constants";
import { AddExpenseIncomeModal } from "../../AddExpenseIncomeModal";

import styles from "./Header.module.less";

const { Header: HeaderAntd } = Layout;

export const Header = ({ onClick }: { onClick: () => void }) => {
  const [expenseIncomeModalOpen, setExpenseIncomeModalOpen] = useState(false);

  const [searchParams] = useSearchParams();
  const account = searchParams.get(ACCOUNT_KEY) ?? undefined;

  return (
    <>
      <HeaderAntd className={styles.header} style={{ height: "65px", backgroundColor: "white" }}>
        <PageHeader
          extra={[
            <Button key="3" type="primary" onClick={() => setExpenseIncomeModalOpen(true)}>
              Add expense/income
            </Button>,
            <Button key="2">Add transfer</Button>,
            <Button key="1" shape="circle" icon={<MoreOutlined />} onClick={onClick} />,
          ]}
          subTitle={account?.toLocaleUpperCase()}
          title="Dashboard"
          style={{ width: "100%", padding: "12px 0" }}
        />
      </HeaderAntd>

      <AddExpenseIncomeModal visible={expenseIncomeModalOpen} onClose={() => setExpenseIncomeModalOpen(false)} />
    </>
  );
};
