import { useCreateCategory } from "../../../hooks";
import { Category } from "../../../types";
import { CategoryModal } from "./CategoryModal";

type Props = {
  onClose: () => void;
  type: Category["type"];
  visible: boolean;
};

export const AddCategory = ({ onClose, visible, type }: Props) => {
  const { mutateAsync, isLoading } = useCreateCategory();

  return (
    <CategoryModal
      isSubmitting={isLoading}
      visible={visible}
      title={type === "EXPENSES" ? "Add expense category" : "Add income category"}
      onClose={onClose}
      onSubmit={async (category) => {
        await mutateAsync({ ...category, type });
        onClose();
      }}
    />
  );
};
