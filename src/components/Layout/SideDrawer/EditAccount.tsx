import { useModifyAccount } from "../../../hooks";
import { Account } from "../../../types";
import { AccountModal } from "./AccountModal";

type Props = {
  account: Account;
  onClose: () => void;
  visible: boolean;
};

export const EditAccount = ({ account, onClose, visible }: Props) => {
  const { mutateAsync, isLoading } = useModifyAccount();

  return (
    <AccountModal
      account={account}
      isSubmitting={isLoading}
      visible={visible}
      onClose={onClose}
      onSubmit={async (data) => {
        await mutateAsync({ ...data, id: account.id });
        onClose();
      }}
    />
  );
};
