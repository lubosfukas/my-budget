import { useModifyCategory } from "../../../hooks";
import { Category } from "../../../types";
import { CategoryModal } from "./CategoryModal";

type Props = {
  category: Category;
  onClose: () => void;
  visible: boolean;
};

export const EditCategory = ({ onClose, visible, category }: Props) => {
  const { mutateAsync, isLoading } = useModifyCategory();

  return (
    <CategoryModal
      isSubmitting={isLoading}
      visible={visible}
      category={category}
      title="Edit category"
      onClose={onClose}
      onSubmit={async (data) => {
        await mutateAsync({ ...data, id: category.id });
        onClose();
      }}
    />
  );
};
