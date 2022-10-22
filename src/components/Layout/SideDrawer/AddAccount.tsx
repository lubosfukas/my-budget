import { useCreateAccount } from "../../../hooks";
import { AccountModal } from "./AccountModal";

type Props = {
  onClose: () => void;
  visible: boolean;
};

export const AddAccount = ({ onClose, visible }: Props) => {
  const { mutateAsync, isLoading } = useCreateAccount();

  return (
    <AccountModal
      isSubmitting={isLoading}
      visible={visible}
      onClose={onClose}
      onSubmit={async (category) => {
        await mutateAsync(category);
        onClose();
      }}
    />
  );
};
