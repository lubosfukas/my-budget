import { useEffect } from "react";
import { Button, Input, Modal } from "antd";
import { Controller, useForm } from "react-hook-form";

import { useRemoveAccount } from "../../../hooks";
import { Account } from "../../../types";

type FormValues = Pick<Account, "label">;

type Props = {
  visible: boolean;
  onClose: () => void;
  onSubmit: (values: FormValues) => void;
  account?: Account;
  isSubmitting?: boolean;
};

export const AccountModal = ({ account, isSubmitting, onClose, onSubmit, visible }: Props) => {
  const {
    control,
    handleSubmit,
    resetField,
    formState: { isDirty, isValid },
  } = useForm<FormValues>({ defaultValues: { label: account?.label } });

  useEffect(() => resetField("label", { defaultValue: account?.label }), [account]);

  const { mutateAsync: remove, isLoading: isRemoving } = useRemoveAccount();

  const buttons = [
    <Button key="back" onClick={onClose}>
      Cancel
    </Button>,
    <Button
      disabled={!isDirty || !isValid}
      loading={isSubmitting}
      key="submit"
      type="primary"
      onClick={handleSubmit((data) => onSubmit(data))}
    >
      Save
    </Button>,
  ];

  if (account)
    buttons.unshift(
      <Button
        danger
        loading={isRemoving}
        key="remove"
        type="primary"
        onClick={async () => {
          await remove(account.id);
          onClose();
        }}
      >
        Remove
      </Button>
    );

  return (
    <Modal
      centered
      destroyOnClose
      visible={visible}
      footer={buttons}
      title={account ? "Edit account" : "Add account"}
      width={300}
      onCancel={onClose}
    >
      <Controller
        control={control}
        name="label"
        render={({ field: { value, onChange } }) => (
          <Input bordered={false} placeholder="Name" value={value} onChange={onChange} />
        )}
        rules={{ required: true }}
      />
    </Modal>
  );
};
