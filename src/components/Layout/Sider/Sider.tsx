import { DatePicker, DatePickerProps, Layout, Menu, Select, Space } from "antd";
import moment from "moment";
import { useSearchParams } from "react-router-dom";

import { useFetchAccounts } from "../../../hooks";
import { ACCOUNT_KEY, PERIOD_KEY, TIME_KEY } from "../../../utils/constants";
import styles from "./Sider.module.less";

const { Sider: SiderAntd } = Layout;
const { Option } = Select;

type Period = DatePickerProps["picker"];

const timePeriods: Array<{ label: string; name: Period }> = [
  { label: "Day", name: "date" },
  { label: "Week", name: "week" },
  { label: "Month", name: "month" },
  { label: "Year", name: "year" },
];

export const Sider = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const { data = [] } = useFetchAccounts();

  const [account, setAccount] = [
    searchParams.get(ACCOUNT_KEY) ?? undefined,
    (newAccount: string) => {
      const newParams = new URLSearchParams(searchParams);
      newParams.set(ACCOUNT_KEY, newAccount);
      setSearchParams(newParams);
    },
  ];

  const [period, setPeriod] = [
    searchParams.get(PERIOD_KEY) ?? undefined,
    (newPeriod: string) => {
      const newParams = new URLSearchParams(searchParams);
      newParams.set(PERIOD_KEY, newPeriod);
      setSearchParams(newParams);
    },
  ];

  const [time, setTime] = [
    searchParams.get(TIME_KEY) ?? undefined,
    (newTime: string) => {
      const newParams = new URLSearchParams(searchParams);
      if (newTime) {
        newParams.set(TIME_KEY, newTime);
      } else newParams.delete(TIME_KEY);
      setSearchParams(newParams);
    },
  ];

  return (
    <SiderAntd className={styles.sider} style={{ backgroundColor: "white" }}>
      <Space direction="vertical" size="middle" style={{ width: "100%", padding: "24px" }}>
        <Select value={account} onChange={(newValue: string) => setAccount(newValue)} style={{ width: "100%" }}>
          {data.map(({ id, label, name }) => (
            <Option key={id} value={name}>
              {label}
            </Option>
          ))}
        </Select>
        <Menu
          items={timePeriods.map(({ label, name }) => ({ label, key: name as string }))}
          selectedKeys={period ? [period] : undefined}
          onSelect={({ key }) => setPeriod(key)}
        />
        <DatePicker
          picker={period as Period}
          value={time ? moment(time) : undefined}
          onChange={(_, dateString) => setTime(dateString)}
          style={{ width: "100%" }}
        />
      </Space>
    </SiderAntd>
  );
};
