import { Modal, Tabs } from "antd";
import { useState } from "react";

import { CategoryName, Content } from "./Content";
import { CategoryType } from "../../types";
import { useFetchCategories } from "../../hooks";

const { TabPane } = Tabs;

type Props = {
  visible: boolean;
  onClose: () => void;
};

const tabs: Array<{ key: CategoryType; label: string }> = [
  {
    key: "EXPENSES",
    label: "Add expense",
  },
  {
    key: "INCOMES",
    label: "Add income",
  },
];

export const AddExpenseIncomeModal = ({ visible, onClose }: Props) => {
  const [selectedTab, setSelectedTab] = useState(tabs[0].key);
  const [balance, setBalance] = useState(0);
  const [category, setCategory] = useState<CategoryName>();
  const [date, setDate] = useState(new Date());
  const [note, setNote] = useState("");

  const { data = [] } = useFetchCategories();

  const reset = () => setCategory(undefined);

  return (
    <Modal
      centered
      destroyOnClose
      okButtonProps={{ disabled: balance === 0 || category === undefined }}
      okText="Add"
      visible={visible}
      width={300}
      onCancel={onClose}
      onOk={onClose}
    >
      <Tabs
        activeKey={selectedTab}
        type="card"
        onChange={(activeKey) => {
          setSelectedTab(activeKey as CategoryType);
          reset();
        }}
      >
        {tabs.map(({ key, label }) => (
          <TabPane key={key} tab={label}>
            <Content
              balance={balance}
              categories={data.filter(({ type }) => type === key)}
              category={category}
              date={date}
              note={note}
              setBalance={setBalance}
              setCategory={setCategory}
              setDate={setDate}
              setNote={setNote}
            />
          </TabPane>
        ))}
      </Tabs>
    </Modal>
  );
};
