import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  SetStateAction,
} from "react";
import { SingleValue } from "react-select";
import Widget from "./components/Widget";
import Arrow from "./assets/arrow.svg";
import BridgeFee from "./components/BridgeFee";
import { ICurrency, IBalance } from "./types/types";
import { getNumberOfDecimal } from "./components/utils";
import data from "./assets/data.json";
import FormModal from "./components/Modal";
import FeeConfirmation from "./components/FeeConfirmation";

const CURRENCY_BASE_URL = "https://interview.switcheo.com/prices.json";
const ADDRESS = "0xdZ2Ac92F948cBE464d19Jn49085f2691cD3Dd92A";
const FormFancy = () => {
  const [balances, setBalances] = useState<IBalance[]>([]);
  const [currencies, setCurrencies] = useState<ICurrency[]>([]);
  const [fromCurrency, setFromCurrency] = useState<ICurrency>({
    currency: "ADA",
    date: "2024-05-23",
    price: 1,
  });
  const [toCurrency, setToCurrency] = useState<ICurrency>({
    currency: "ADA",
    date: "2024-05-23",
    price: 1,
  });
  const [amount, setAmount] = useState<string>("");
  const [estPrice, setEstPrice] = useState<string>("");
  const [fee, setFee] = useState<number>(0);
  const [loadingFee, setLoadingFee] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);

  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const loadingRef = useRef<ReturnType<typeof setTimeout>>();
  const [confirmCode, setConfirmCode] = useState<number>(0);

  useEffect(() => {
    setEstPrice(calculateTokenPrice(amount));
  }, [amount, fromCurrency, toCurrency]);

  const getBalance = useCallback(
    (currency: ICurrency) => {
      const balance = balances.find(
        (balance) => balance.currency === currency.currency,
      );
      return balance?.balance;
    },
    [fromCurrency, toCurrency, balances],
  );

  useEffect(() => {
    fetchCurrencies();
    fetchBalance();
  }, []);

  const fetchCurrencies = async () => {
    try {
      const res = await fetch(CURRENCY_BASE_URL);
      const result = await res.json();
      const setResult = result.filter(
        (value: ICurrency, index: number, self: ICurrency[]) =>
          index === self.findIndex((t) => t.currency === value.currency),
      );
      setCurrencies(setResult);
      const fromCurrency = result.find(
        (item: ICurrency) => item.currency === "USDC",
      );
      const toCurrency = result.find(
        (item: ICurrency) => item.currency === "ETH",
      );
      setFromCurrency(fromCurrency);
      setToCurrency(toCurrency);
    } catch (error) {}
  };

  const fetchBalance = () => {
    setTimeout(() => {
      const promise: Promise<IBalance[]> = new Promise((resolve, reject) => {
        resolve(data);
      });
      promise.then((res) => {
        setBalances(res);
      });
    }, 1000);
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    if (value.length < 16) {
      value = value.replace(/[^0-9.]/g, "");
      setAmount(value);
      debounceLoading();
    }
  };

  const debounceLoading = () => {
    if (loadingRef.current) {
      clearTimeout(loadingRef.current);
    }
    setLoadingFee(true);
    loadingRef.current = setTimeout(() => {
      setFee(0.0003);
      setLoadingFee(false);
    }, 1500);
  };

  const handleCurrencyChange = (
    curr: SingleValue<ICurrency>,
    isTo: boolean,
  ) => {
    if (!isTo) {
      setFromCurrency(curr as SetStateAction<ICurrency>);
    } else {
      setToCurrency(curr as SetStateAction<ICurrency>);
    }
  };

  const calculateTokenPrice = (value: string) => {
    const rawAmount = parseFloat(value);
    if (!rawAmount) return "0";
    const price = rawAmount * fromCurrency.price;
    return getNumberOfDecimal(price / toCurrency.price).toString();
  };

  const onSwapToken = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    setAmount(estPrice);
    debounceLoading();
  };

  const onOpenConfirmation = () => {
    setModalIsOpen(true);
    setConfirmCode(Math.floor(Math.random() * 9000) + 1000);
  };

  const onSubmit = () => {
    setSubmitting(true);
    setTimeout(() => {
      const promise = new Promise((resolve, reject) => {
        resolve(null);
      });
      promise.then(() => {
        setSubmitting(false);
        setModalIsOpen(false);
        setIsSubmitted(true);
      });
    }, 3000);
  };

  const onModalClose = () => {
    setModalIsOpen(false);
  };

  const onCloseTransactionModal = () => {
    setAmount("");
    setEstPrice("");
    setIsSubmitted(false);
  };

  return (
    <div className="form-wrapper">
      <div className="form-container">
        <Widget
          currency={fromCurrency}
          currencies={currencies}
          amount={amount}
          setAmount={setAmount}
          balance={getBalance(fromCurrency) || 0}
          handleAmountChange={handleAmountChange}
          handleCurrencyChange={handleCurrencyChange}
        />
        <div className="swap-icon">
          <img src={Arrow} alt="arrow" onClick={onSwapToken} />
        </div>
        <Widget
          to
          currency={toCurrency}
          currencies={currencies}
          price={estPrice}
          handleCurrencyChange={handleCurrencyChange}
        />
        <p className="note center">
          1 {fromCurrency.currency} ~{" "}
          {getNumberOfDecimal(fromCurrency.price / toCurrency.price)}{" "}
          {toCurrency.currency}
        </p>
        <BridgeFee
          bridgeFee={fee}
          loading={loadingFee}
          currency={fromCurrency.currency}
        />
        <div className="form-submit">
          <button
            type="button"
            disabled={
              !amount ||
              parseFloat(amount) === 0 ||
              (getBalance(fromCurrency) || 0) < parseFloat(amount)
            }
            onClick={onOpenConfirmation}
          >
            Send
          </button>
        </div>
      </div>
      <FormModal
        modalIsOpen={modalIsOpen}
        onClose={onModalClose}
        className="form-modal"
      >
        <>
          <FeeConfirmation
            className="fee-confirmation"
            bridgeFee={fee}
            confirmCode={confirmCode}
            currency={fromCurrency.currency}
            receiveAddress={ADDRESS}
          />

          <div className="form-submit">
            <button type="button" disabled={submitting} onClick={onSubmit}>
              Confirm
              {submitting && <div className="loading-icon"></div>}
            </button>
          </div>
        </>
      </FormModal>
      <FormModal
        modalIsOpen={isSubmitted}
        onClose={onCloseTransactionModal}
        className="form-modal"
      >
        <div className="tracsaction-status">
          <h2>Transaction was successful!</h2>
          <p>
            Your {amount} {fromCurrency.currency} has been exchanged to{" "}
            {estPrice.substr(0, 16)} {toCurrency.currency} and sent to your
            wallet{" "}
          </p>

          <div className="form-submit">
            <button type="button" onClick={onCloseTransactionModal}>
              Close
            </button>
          </div>
        </div>
      </FormModal>
    </div>
  );
};

export default FormFancy;
