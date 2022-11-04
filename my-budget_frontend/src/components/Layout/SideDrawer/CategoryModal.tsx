import { useEffect } from "react";
import { Button, Input, Modal } from "antd";
import { Controller, useForm } from "react-hook-form";

import { useRemoveCategory } from "../../../hooks";
import { Category } from "../../../types";

type FormValues = Pick<Category, "label">;

type Props = {
  onClose: () => void;
  onSubmit: (values: FormValues) => void;
  title: string;
  visible: boolean;
  category?: Category;
  isSubmitting?: boolean;
};

export const CategoryModal = ({ category, isSubmitting, onClose, onSubmit, title, visible }: Props) => {
  const {
    control,
    handleSubmit,
    resetField,
    formState: { isDirty, isValid },
  } = useForm<FormValues>({ defaultValues: { label: category?.label } });

  useEffect(() => resetField("label", { defaultValue: category?.label }), [category]);

  const { mutateAsync: remove, isLoading: isRemoving } = useRemoveCategory();

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

  if (category)
    buttons.unshift(
      <Button
        danger
        loading={isRemoving}
        key="remove"
        type="primary"
        onClick={async () => {
          await remove(category.id);
          onClose();
        }}
      >
        Remove
      </Button>
    );

  return (
    <Modal centered destroyOnClose visible={visible} footer={buttons} title={title} width={300} onCancel={onClose}>
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
