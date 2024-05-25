import { IButton } from "../types/types";

const Button = (props: IButton) => {
  const { onClickHandler, label, disabled, loading } = props;
  return (
    <div className="form-submit">
      <button type="button" disabled={disabled} onClick={onClickHandler}>
        {label}
        {loading && <div className="loading-icon"></div>}
      </button>
    </div>
  );
};

export default Button;
