import { ICurrency, ICurrecySelectProps } from "../types/types";
import ADA from "../assets/ADA.svg";
import Select, { components } from "react-select";
import CurrencyImage from "./CurrencyImage";

const CustomControl = ({ children, selectProps, ...props }: any) => {
  const currency = selectProps?.value?.currency ?? "";
  return (
    <components.Control {...props} className="single-select">
      <CurrencyImage currency={currency} />
      <div className="currency-title">{children}</div>
    </components.Control>
  );
};

const CustomOption = ({ innerProps, data }: any) => {
  const { currency } = data;
  return (
    <div {...innerProps} className="currency-select-item">
      <CurrencyImage currency={currency} />
      <span>{currency}</span>
    </div>
  );
};

const CustomIndicator = () => {
  return <></>;
};

const CustomMenuList = ({ children, ...props }: any) => {
  return (
    <components.MenuList {...props} className="currency-list">
      {children}
    </components.MenuList>
  );
};

const CurrencySelect = ({
  options,
  name,
  currency,
  handleChange,
}: ICurrecySelectProps) => {
  return (
    <Select
      className="form-select"
      defaultValue={options[0]}
      name={name}
      onChange={handleChange}
      options={options}
      value={currency}
      getOptionValue={(item: ICurrency) => item.currency}
      getOptionLabel={(item: ICurrency) => item.currency}
      components={{
        Option: CustomOption,
        Control: CustomControl,
        DropdownIndicator: CustomIndicator,
        IndicatorSeparator: CustomIndicator,
        MenuList: CustomMenuList,
      }}
    />
  );
};
export default CurrencySelect;
