import { DatePicker, DatePickerProps, Layout, Menu, Select, Space, Spin } from "antd";
import moment from "moment";
import { useSearchParams } from "react-router-dom";

import { useFetchAccounts } from "../../../hooks";
import { ACCOUNT_KEY, PERIOD_KEY, TIME_KEY } from "../../../utils/constants";
import styles from "./Sider.module.less";

const { Sider: SiderAntd } = Layout;
const { Option } = Select;

type Period = DatePickerProps["picker"];

const timePeriods: Array<{ label: string; id: Period }> = [
  { label: "Day", id: "date" },
  { label: "Week", id: "week" },
  { label: "Month", id: "month" },
  { label: "Year", id: "year" },
];

export const Sider = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const { data: accounts, isLoading } = useFetchAccounts({
    onSuccess: (data) => {
      const newParams = new URLSearchParams(searchParams);
      newParams.set(ACCOUNT_KEY, data[0].id.toString());
      const period = timePeriods[0].id;
      if (period) newParams.set(PERIOD_KEY, period);
      const date = new Date().toISOString();
      if (date) newParams.set(TIME_KEY, date);
      setSearchParams(newParams);
    },
  });

  const [accountId, setAccountId] = [
    searchParams.get(ACCOUNT_KEY) ?? undefined,
    (newAccountId: number) => {
      const newParams = new URLSearchParams(searchParams);
      newParams.set(ACCOUNT_KEY, newAccountId.toString());
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
      {isLoading && (
        <div className={styles.wrapper}>
          <Spin />
        </div>
      )}
      {!isLoading && accounts && accounts.length > 0 && (
        <Space direction="vertical" size="middle" style={{ width: "100%", padding: "24px" }}>
          <Select
            value={accounts.find(({ id }) => id.toString() === accountId)?.id}
            onChange={(newValue) => setAccountId(newValue)}
            style={{ width: "100%" }}
          >
            {accounts.map(({ id, label }) => (
              <Option key={id} value={id}>
                {label}
              </Option>
            ))}
          </Select>
          <Menu
            items={timePeriods.map(({ label, id }) => ({ label, key: id as string }))}
            selectedKeys={period ? [period] : undefined}
            onSelect={({ key }) => setPeriod(key)}
          />
          <DatePicker
            picker={period as Period}
            value={time ? moment(time) : undefined}
            onChange={(date) => {
              if (date) setTime(date.toISOString());
            }}
            style={{ width: "100%" }}
          />
        </Space>
      )}
    </SiderAntd>
  );
};
