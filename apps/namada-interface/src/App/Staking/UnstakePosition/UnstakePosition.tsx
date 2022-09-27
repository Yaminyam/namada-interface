import { useState } from "react";
import { UnstakePositionContainer } from "./UnstakePosition.components";
import { Table, TableConfigurations, KeyValueData } from "components/Table";
import { Button, ButtonVariant } from "components/Button";
import {
  StakingPosition,
  NewStakingPositionRequest,
} from "slices/StakingAndGovernance";

const AMOUNT_TO_UNBOND_KEY = "Amount to unbond";

type UnbondingCallbacks = {
  setAmountToUnstake: React.Dispatch<React.SetStateAction<string>>;
};

const unbondingDetailsConfigurations: TableConfigurations<
  KeyValueData,
  UnbondingCallbacks
> = {
  rowRenderer: (rowData: KeyValueData, callbacks?: UnbondingCallbacks) => {
    const valueOrInput =
      rowData.key === AMOUNT_TO_UNBOND_KEY ? (
        <td>
          <input
            onChange={(event) => {
              callbacks?.setAmountToUnstake(event.target.value);
            }}
          />
        </td>
      ) : (
        <td>{rowData.value}</td>
      );

    return (
      <>
        <td style={{ display: "flex" }}>{rowData.key}</td>
        {valueOrInput}
      </>
    );
  },
  columns: [
    { uuid: "1", columnLabel: "", width: "30%" },
    { uuid: "2", columnLabel: "", width: "70%" },
  ],
};

type Props = {
  confirmUnbonding: (stakingPositionRequest: NewStakingPositionRequest) => void;
  cancelUnbonding: () => void;
  currentBondingPosition: StakingPosition;
};

// contains everything what the user needs for unbonding active bonding
// positions.
export const UnstakePosition = (props: Props): JSX.Element => {
  const { currentBondingPosition, confirmUnbonding, cancelUnbonding } = props;
  const [amountToUnstake, setAmountToUnstake] = useState("");
  const unbondingDetailsConfigurationsWithCallbacks: TableConfigurations<
    KeyValueData,
    UnbondingCallbacks
  > = {
    ...unbondingDetailsConfigurations,
    callbacks: {
      setAmountToUnstake: setAmountToUnstake,
    },
  };

  // bonding
  const bondedAmountAsNumber = Number(currentBondingPosition.stakedAmount);
  const amountToUnstakeAsNumber = Number(amountToUnstake);
  const remainsBonded = bondedAmountAsNumber - amountToUnstakeAsNumber;
  const remainsBondedToDisplayBool =
    remainsBonded < 0 ||
    remainsBonded > bondedAmountAsNumber ||
    Number.isNaN(amountToUnstakeAsNumber) ||
    amountToUnstake === "";

  const remainsBondedToDisplay = remainsBondedToDisplayBool
    ? `The unbonding amount can be between 0 and ${bondedAmountAsNumber}`
    : `${remainsBonded}`;
  const unbondingSummary = [
    {
      uuid: "1",
      key: "Bonded amount",
      value: currentBondingPosition.stakedAmount,
    },
    { uuid: "2", key: AMOUNT_TO_UNBOND_KEY, value: "validator.commission" },
    {
      uuid: "3",
      key: "Remains bonded",
      value: remainsBondedToDisplay,
    },
  ];
  return (
    <UnstakePositionContainer>
      <Table
        title="Summary"
        tableConfigurations={unbondingDetailsConfigurationsWithCallbacks}
        data={unbondingSummary}
      />
      <Button
        variant={ButtonVariant.Contained}
        onClick={() => {
          const newUnbondingRequest: NewStakingPositionRequest = {
            amount: amountToUnstake,
            stakingCurrency: "NAM",
            validatorId: "123",
          };
          confirmUnbonding(newUnbondingRequest);
        }}
        disabled={remainsBondedToDisplayBool}
      >
        Confirm
      </Button>
      <Button
        variant={ButtonVariant.Contained}
        onClick={() => {
          cancelUnbonding();
        }}
        style={{ backgroundColor: "lightgrey", color: "black" }}
      >
        Cancel
      </Button>
    </UnstakePositionContainer>
  );
};
