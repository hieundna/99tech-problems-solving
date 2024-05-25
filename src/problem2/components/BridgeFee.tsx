import { IBridgeFee } from "../types/types";

const BridgeFee = (props: IBridgeFee) => {
  const { bridgeFee, loading, currency, className } = props;
  return (
    <div className={`swap-fee ${className ? className : ""}`}>
      <div className="form-flex">
        <span>Fee</span>
        <span className={`fee-green ${loading ? "loading" : ""}`}>
          {bridgeFee} {currency}
        </span>
      </div>
    </div>
  );
};

export default BridgeFee;
