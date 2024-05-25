import { useState, useEffect } from "react";
import { WalletBalance } from "../services";

const useWalletBalances = () => {
  const [listBalances, setListBalances] = useState<Array<WalletBalance>>([]);
  useEffect(() => {
    getBalance();
  }, []);

  const getBalance = () => {
    // should be a Promise function to fetch balance from BE service
    const res = [
      {
        id: "1",
        currency: "USDT",
        amount: 123,
        blockchain: "Arbitrum",
      },
      {
        id: "2",
        currency: "ETH",
        amount: 12.13251,
        blockchain: "Ethereum",
      },
    ];

    setListBalances(res);
  };

  return listBalances;
};

export default useWalletBalances;
