import { ArrowRightOutlined } from "@ant-design/icons";
import { Col, DatePicker, Input, InputNumber, Modal, Row, Select } from "antd";
import moment from "moment";
import { Controller, useForm } from "react-hook-form";

import { useCreateTransaction } from "../../../hooks";
import { Account, Category } from "../../../types";

const { Option } = Select;

type Props = {
  accounts: Array<Account>;
  categories: Array<Category>;
  visible: boolean;
  onClose: () => void;
};

type FormValues = {
  balance: number;
  date: string;
  from: Account["id"];
  to: Account["id"];
  note?: string;
};

export const AddTransferModal = ({ accounts, categories, onClose, visible }: Props) => {
  const {
    control,
    getValues,
    handleSubmit,
    formState: { isValid },
  } = useForm<FormValues>({
    defaultValues: { balance: 0, date: new Date().toISOString(), from: accounts[0].id, to: accounts[1].id },
    mode: "onChange",
  });

  const { mutateAsync, isLoading } = useCreateTransaction();

  return (
    <Modal
      centered
      destroyOnClose
      okButtonProps={{ disabled: !isValid, loading: isLoading }}
      okText="Add"
      title="Add transfer"
      visible={visible}
      width={300}
      onCancel={onClose}
      onOk={handleSubmit(async (data) => {
        const from = categories.find(({ account, type }) => account === data.from && type === "EXPENSES");
        if (from)
          await mutateAsync({
            account: data.from,
            balance: data.balance,
            category: from.id,
            date: data.date,
            note: data.note,
          });
        const to = categories.find(({ account, type }) => account === data.to && type === "INCOMES");
        if (to)
          await mutateAsync({
            account: data.to,
            balance: data.balance,
            category: to.id,
            date: data.date,
            note: data.note,
          });
        onClose();
      })}
    >
      <Row gutter={[16, 16]}>
        <Col span={24} style={{ display: "flex", justifyContent: "center" }}>
          <Controller
            control={control}
            name="date"
            render={({ field: { onBlur, onChange, value } }) => (
              <DatePicker
                allowClear={false}
                bordered={false}
                disabledDate={(current) => current >= moment().endOf("day")}
                value={moment(value)}
                onBlur={onBlur}
                onChange={(newValue) => {
                  if (newValue) onChange(newValue.toISOString());
                }}
              />
            )}
            rules={{ required: true }}
          />
        </Col>
        <Col span={24}>
          <Controller
            control={control}
            name="balance"
            render={({ field: { onBlur, onChange, value } }) => (
              <InputNumber
                addonAfter="€"
                min={0}
                value={value}
                onBlur={onBlur}
                onChange={(newValue) => onChange(newValue)}
                style={{ width: "100%" }}
              />
            )}
            rules={{ required: true, min: 0.01 }}
          />
        </Col>
        <Col span={24}>
          <Controller
            control={control}
            name="note"
            render={({ field: { onBlur, onChange, value } }) => (
              <Input
                bordered={false}
                placeholder="Note"
                value={value}
                onBlur={onBlur}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => onChange(event.target.value)}
              />
            )}
          />
        </Col>
        <Col span={24} style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Controller
            control={control}
            name="from"
            render={({ field: { onBlur, onChange, value } }) => (
              <Select bordered={false} value={value} onBlur={onBlur} onChange={(newValue) => onChange(newValue)}>
                {accounts.map(({ id, label }) => (
                  <Option key={id} value={id}>
                    {label}
                  </Option>
                ))}
              </Select>
            )}
            rules={{ required: true, validate: { notEqualTo: (value) => value !== getValues().to } }}
          />
          <ArrowRightOutlined />
          <Controller
            control={control}
            name="to"
            render={({ field: { onBlur, onChange, value } }) => (
              <Select bordered={false} value={value} onBlur={onBlur} onChange={(newValue) => onChange(newValue)}>
                {accounts.map(({ id, label }) => (
                  <Option key={id} value={id}>
                    {label}
                  </Option>
                ))}
              </Select>
            )}
            rules={{ required: true, validate: { notEqualTo: (value) => value !== getValues().from } }}
          />
        </Col>
      </Row>
    </Modal>
  );
};
