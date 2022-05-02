import { DatePicker, Layout, Menu, Select, Space } from "antd";

import styles from "./Sider.module.less";

const { Sider: SiderAntd } = Layout;
const { Option } = Select;

const accounts = [
  { label: "Visa", name: "visa" },
  { label: "Cash", name: "cash" },
];

export const Sider = () => (
  <SiderAntd className={styles.sider} style={{ backgroundColor: "white" }}>
    <Space direction="vertical" size="middle" style={{ width: "100%", padding: "24px" }}>
      <Select defaultValue={accounts[0].name} onChange={() => {}} style={{ width: "100%" }}>
        {accounts.map(({ label, name }) => (
          <Option key={name} value={name}>
            {label}
          </Option>
        ))}
      </Select>
      <Menu
        defaultSelectedKeys={["day"]}
        items={[
          { label: "Day", key: "day" },
          { label: "Week", key: "week" },
          { label: "Month", key: "month" },
          { label: "Year", key: "year" },
        ]}
      />
      <DatePicker onChange={() => {}} style={{ width: "100%" }} />
    </Space>
  </SiderAntd>
);
