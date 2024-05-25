import React, { useEffect, useMemo, useState } from "react";
import { WalletRow } from "./components";
import { useWalletBalances, usePrices } from "./hooks";
import { WalletBalance, WalletProps } from "./services";

const WalletPage: React.FC<WalletProps> = (props: WalletProps) => {
  // remove children because its not used
  const { className } = props;
  const balances = useWalletBalances(); // missing import
  const prices = usePrices(); // missing import

  // refactor getPriority to be an object to reduce timing when using switch
  const priority: { [key: string]: number } = {
    Osmosis: 100,
    Ethereum: 50,
    Arbitrum: 30,
    Zilliqa: 20,
    Neo: 20,
  };

  // missing import useMemo from React
  const sortedBalances = useMemo(() => {
    return balances
      .filter((balance: WalletBalance) => {
        //replace getPriority to priority object
        const balancePriority = priority[balance.blockchain] || -99;
        // should return balance amount > 0
        return balancePriority > -99 && balance.amount > 0;
      })
      .sort((lhs: WalletBalance, rhs: WalletBalance) => {
        //replace getPriority to priority object, if blockchain is invalid or not in priority object, should return -99
        const leftPriority = priority[lhs.blockchain] || -99;
        const rightPriority = priority[rhs.blockchain] || -99;
        // missing return 0 for the case rightPriority === leftPriority. sort() must return a number
        // rightPriority - leftPriority will return a number
        return rightPriority - leftPriority;
      });

    //remove prices from dependencies because price does not affect this function
  }, [balances]);

  // Remove balance format

  const rows = useMemo(
    () =>
      sortedBalances.map(
        // balance should have type as WalletBalance
        (balance: WalletBalance, index: number) => {
          const usdValue = (prices[balance.currency] || 0) * balance.amount;
          // Missing import WalletRow
          return (
            // its better if we have id for each balance
            // should pass the id to key attribute instead of index
            // to avoid unmounting/ mount the component
            <WalletRow
              //invalid classes
              className="row"
              key={balance.id}
              amount={balance.amount}
              usdValue={usdValue}
              formattedAmount={balance.amount.toFixed()}
            />
          );
        }
      ),
    [prices]
  );

  // should not use ...rest, must indicate exact what need to use to prevent invalid attribute passing
  return <div className={className}>{rows}</div>;
};

export default WalletPage;
