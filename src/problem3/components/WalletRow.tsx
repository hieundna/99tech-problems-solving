import { WalletRowType } from "../services";

const WalletRow = (props: WalletRowType) => {
  const { className, key, amount, usdValue, formattedAmount } = props;

  return (
    <div key={key} className={className}>
      <p>
        <span>Amount: </span>
        <span>{amount}</span>
      </p>
      <p>
        <span>Formatted amount: </span>
        <span>{formattedAmount}</span>
      </p>
      <p>
        <span>Exact Price: </span>
        <span>{usdValue}</span>
      </p>
    </div>
  );
};

export default WalletRow;
