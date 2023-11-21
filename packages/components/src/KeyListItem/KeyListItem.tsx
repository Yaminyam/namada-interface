import { Checkbox, DropdownMenu } from "@namada/components";
import {
  Alias,
  CheckboxContainer,
  DropdownContainer,
  ItemContainer,
} from "./KeyListItem.components";
import { AccountType } from "@namada/types";

type KeyListItemProps = {
  as?: keyof JSX.IntrinsicElements;
  alias: string;
  type: AccountType;
  isMainKey: boolean;
  onRename: () => void;
  onDelete: () => void;
  onViewAccount: () => void;
  onSelectAccount: () => void;
  onViewRecoveryPhrase: () => void;
};

export const KeyListItem = ({
  as = "div",
  alias,
  isMainKey,
  type,
  onDelete,
  onRename,
  onViewAccount,
  onSelectAccount,
  onViewRecoveryPhrase,
}: KeyListItemProps): JSX.Element => {
  return (
    <ItemContainer as={as} selected={isMainKey}>
      <CheckboxContainer>
        <Checkbox onChange={() => onSelectAccount()} checked={isMainKey} />
      </CheckboxContainer>
      <Alias>{alias}</Alias>
      <DropdownContainer>
        <DropdownMenu
          id={alias}
          align="right"
          items={[
            {
              label: "Set default account",
              onClick: !isMainKey ? onSelectAccount : undefined,
            },
            {
              label: "View Keys",
              onClick: onViewAccount,
            },
            {
              label: "Rename",
              onClick: onRename,
            },
            {
              label: "Delete",
              onClick: onDelete,
            },
            {
              label: "View Recovery Phrase",
              onClick:
                type === AccountType.Mnemonic
                  ? onViewRecoveryPhrase
                  : undefined,
            },
          ]}
        />
      </DropdownContainer>
    </ItemContainer>
  );
};
