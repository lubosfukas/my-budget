import { Col, DatePicker, Input, InputNumber, Modal, Row, Select } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
import moment from "moment";
import { useState } from "react";

import { Account } from "../../types";

const { Option } = Select;

type Props = {
  accounts: Array<Account>;
  visible: boolean;
  onClose: () => void;
};

export const AddTransferModal = ({ accounts, visible, onClose }: Props) => {
  const [date, setDate] = useState(new Date());
  const [balance, setBalance] = useState(0);
  const [note, setNote] = useState("");
  const [from, setFrom] = useState(accounts[0].name);
  const [to, setTo] = useState(accounts[1].name);

  return (
    <Modal
      centered
      destroyOnClose
      okButtonProps={{ disabled: balance === 0 || from === to }}
      okText="Add"
      title="Add transfer"
      visible={visible}
      width={300}
      onCancel={onClose}
      onOk={onClose}
    >
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
            value={balance}
            onChange={(newValue) => setBalance(newValue)}
            style={{ width: "100%" }}
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
        <Col span={24} style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Select bordered={false} value={from} onChange={(newValue) => setFrom(newValue)}>
            {accounts.map(({ id, label, name }) => (
              <Option key={id} value={name}>
                {label}
              </Option>
            ))}
          </Select>
          <ArrowRightOutlined />
          <Select bordered={false} value={to} onChange={(newValue) => setTo(newValue)}>
            {accounts.map(({ id, label, name }) => (
              <Option key={id} value={name}>
                {label}
              </Option>
            ))}
          </Select>
        </Col>
      </Row>
    </Modal>
  );
};
