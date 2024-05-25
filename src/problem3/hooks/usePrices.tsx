import { useEffect, useState } from "react";

const usePrices = () => {
  const [prices, setPrices] = useState<{ [key: string]: number }>({});
  useEffect(() => {
    getBalance();
  }, []);

  const getBalance = () => {
    // should be a Promise function to fetch balance from BE service
    const res = {
      USDT: 1,
      ETH: 3003,
      BTC: 63000,
    };

    setPrices(res);
  };

  return prices;
};

export default usePrices;
