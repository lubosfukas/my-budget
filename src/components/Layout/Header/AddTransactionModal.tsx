import { useState } from "react";
import { Col, DatePicker, Input, InputNumber, Modal, Row, Select, Tabs } from "antd";
import moment from "moment";
import { Controller, useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";

import { useCreateTransaction } from "../../../hooks";
import { Category } from "../../../types";
import { ACCOUNT_KEY } from "../../../utils/constants";

type CategoryType = Category["type"];

type FormValues = {
  balance: number;
  category: number;
  date: string;
  note?: string;
};

type Props = {
  categories: Array<Category>;
  onClose: () => void;
  visible: boolean;
};

const { TabPane } = Tabs;
const { Option } = Select;

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

export const AddTransactionModal = ({ categories, onClose, visible }: Props) => {
  const [selectedTab, setSelectedTab] = useState(tabs[0].key);

  const [searchParams] = useSearchParams();
  const accountId = searchParams.get(ACCOUNT_KEY) ?? undefined;

  const { mutateAsync, isLoading } = useCreateTransaction();

  const {
    handleSubmit,
    control,
    getValues,
    resetField,
    formState: { isValid },
  } = useForm<FormValues>({ defaultValues: { date: new Date().toISOString() }, mode: "onChange" });

  return (
    <Modal
      centered
      destroyOnClose
      okButtonProps={{ disabled: !isValid, loading: isLoading }}
      okText="Add"
      visible={visible}
      width={300}
      onCancel={onClose}
      onOk={handleSubmit((data) => {
        if (accountId) mutateAsync({ ...data, account: parseInt(accountId, 10) });
        onClose();
      })}
    >
      <Tabs
        activeKey={selectedTab}
        type="card"
        onChange={(activeKey) => {
          resetField("category");
          setSelectedTab(activeKey as CategoryType);
        }}
      >
        {tabs.map(({ key, label }) => (
          <TabPane key={key} tab={label}>
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
                      style={{ width: "100%" }}
                      value={value}
                      onBlur={onBlur}
                      onChange={(newValue) => onChange(newValue)}
                    />
                  )}
                  rules={{ required: true }}
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
              <Col span={24}>
                <Controller
                  control={control}
                  name="category"
                  render={({ field: { onBlur, onChange, value } }) => (
                    <Select
                      disabled={getValues().balance === 0}
                      style={{ width: "100%" }}
                      value={value}
                      onBlur={onBlur}
                      onChange={(newValue) => onChange(newValue)}
                    >
                      {categories
                        .filter(({ type }) => type === selectedTab)
                        .map(({ id, label: categoryLabel }) => (
                          <Option key={id} value={id}>
                            {categoryLabel}
                          </Option>
                        ))}
                    </Select>
                  )}
                  rules={{ required: true }}
                />
              </Col>
            </Row>
          </TabPane>
        ))}
      </Tabs>
    </Modal>
  );
};
