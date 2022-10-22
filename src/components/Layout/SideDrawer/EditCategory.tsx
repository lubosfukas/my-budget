import { useModifyCategory } from "../../../hooks/api/useModifyCategory";
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
      category={category}
      isSubmitting={isLoading}
      visible={visible}
      onClose={onClose}
      onSubmit={async (data) => {
        await mutateAsync({ ...data, id: category.id });
        onClose();
      }}
    />
  );
};
