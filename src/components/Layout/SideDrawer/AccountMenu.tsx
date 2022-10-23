import { useState } from "react";
import { CreditCardOutlined } from "@ant-design/icons";
import { Menu } from "antd";

import { Account } from "../../../types";
import { toCamelCase } from "../utils";
import { AddAccount } from "./AddAccount";
import { EditAccount } from "./EditAccount";

type Props = {
  accounts: Array<Account>;
};

export const AccountMenu = ({ accounts }: Props) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState<Account | undefined>();

  return (
    <>
      <Menu
        selectable={false}
        items={[
          {
            key: "accounts",
            label: "Accounts",
            icon: <CreditCardOutlined />,
            children: [...accounts, { id: NaN, label: "+ Add account" }].map(({ label, id }) => ({
              label,
              key: `${id}-${toCamelCase(label)}`,
            })),
          },
        ]}
        mode="inline"
        onClick={({ key }) => {
          const [id, label] = key.split("-");
          const account = accounts.find(
            ({ id: accountId, label: accountLabel }) =>
              id === accountId.toString() && label === toCamelCase(accountLabel)
          );

          if (account) setSelectedAccount(account);
          else setSelectedAccount(undefined);
          setModalOpen(true);
        }}
      />
      {!selectedAccount && <AddAccount visible={modalOpen} onClose={() => setModalOpen(false)} />}
      {selectedAccount && (
        <EditAccount visible={modalOpen} account={selectedAccount} onClose={() => setModalOpen(false)} />
      )}
    </>
  );
};
