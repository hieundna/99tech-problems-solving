import { SingleValue } from "react-select";
import { ICurrency } from "../types/types";
import CurrencySelect from "./CurrencySelect";
import { getNumberOfDecimal } from "./utils";

interface WidgetProps {
  to?: boolean;
  currency: ICurrency;
  currencies: ICurrency[];
  amount?: string;
  price?: string;
  setAmount?: (arg0: string) => void;
  balance?: number;
  handleAmountChange?: (arg0: React.ChangeEvent<HTMLInputElement>) => void;
  handleCurrencyChange: (arg0: SingleValue<ICurrency>, arg1: boolean) => void;
}
const Widget = (props: WidgetProps) => {
  const {
    to,
    currency,
    currencies,
    amount,
    setAmount,
    price,
    balance,
    handleAmountChange,
    handleCurrencyChange,
  } = props;

  const onCurrencyChange = (curr: SingleValue<ICurrency>) => {
    handleCurrencyChange(curr, !!to);
  };

  return (
    <div className="form-widget">
      <div className="form-row">
        <span>{to ? "To" : "From"}</span>
        <span className="note">
          {!to && `Available balance: ${balance} ${currency?.currency}`}
        </span>
      </div>
      <div className="form-row">
        <div className="currency-wrapper">
          <CurrencySelect
            currency={currency}
            handleChange={onCurrencyChange}
            options={currencies}
            name="fromCurrency"
          />
        </div>
        <div className="form-currency-amount">
          <input
            type="text"
            value={to ? price || 0 : amount}
            onChange={handleAmountChange}
            placeholder="0.0001 ~ 0.003"
            disabled={to}
          />
          {!to && (
            <button
              type="button"
              onClick={() => setAmount?.(balance?.toString() || "")}
            >
              MAX
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Widget;
