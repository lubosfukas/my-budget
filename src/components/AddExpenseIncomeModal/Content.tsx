import { Col, DatePicker, Input, InputNumber, Row, Select } from "antd";
import moment from "moment";

import { Category } from "../../types";

const { Option } = Select;

type Props = {
  balance: number;
  categories: Array<Category>;
  category: string;
  date: Date;
  note: string;
  setBalance: (newValue: number) => void;
  setCategory: (newValue: string) => void;
  setDate: (newValue: Date) => void;
  setNote: (newValue: string) => void;
};

export const Content = ({
  balance,
  categories,
  category,
  date,
  note,
  setBalance,
  setCategory,
  setDate,
  setNote,
}: Props) => (
  <Row gutter={[16, 16]}>
    <Col span={24} style={{ display: "flex", justifyContent: "center" }}>
      <DatePicker
        allowClear={false}
        bordered={false}
        disabledDate={(current) => current >= moment().endOf("day")}
        value={moment(date)}
        onChange={(newValue) => {
          if (newValue) setDate(newValue.toDate());
        }}
      />
    </Col>
    <Col span={24}>
      <InputNumber
        addonAfter="€"
        min={0}
        style={{ width: "100%" }}
        value={balance}
        onChange={(newValue) => setBalance(newValue)}
      />
    </Col>
    <Col span={24}>
      <Input
        bordered={false}
        placeholder="Note"
        value={note}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => setNote(event.target.value)}
      />
    </Col>
    <Col span={24}>
      <Select
        disabled={balance === 0}
        onChange={(newValue) => setCategory(newValue)}
        value={category}
        style={{ width: "100%" }}
      >
        {categories.map(({ key, label }) => (
          <Option key={key}>{label}</Option>
        ))}
      </Select>
    </Col>
  </Row>
);
