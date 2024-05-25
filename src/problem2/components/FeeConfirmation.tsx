import { IFeeConfirmation } from "../types/types";

const FeeConfirmation = (props: IFeeConfirmation) => {
  const { bridgeFee, currency, className, receiveAddress, confirmCode } = props;
  return (
    <div className={`swap-fee ${className ? className : ""}`}>
      <div className="form-flex">
        <span>Confirm Code</span>
        <span className="fee-green">{confirmCode}</span>
      </div>
      <div className="form-flex">
        <span>Fee</span>
        <span>
          {bridgeFee} {currency}
        </span>
      </div>
      <div className="form-flex">
        <span>Receive Est.</span>
        <span>
          {bridgeFee} {currency}
        </span>
      </div>
      <div className="form-flex">
        <span>To Address</span>
        <span>{receiveAddress}</span>
      </div>
    </div>
  );
};

export default FeeConfirmation;
