import { SingleValue } from "react-select";
export interface ICurrency {
  currency: string;
  date: string;
  price: number;
}

export interface ICurrecySelectProps {
  options: ICurrency[];
  name: string;
  currency: ICurrency;
  handleChange: (arg0: SingleValue<ICurrency>) => void;
}

export interface ICurrencyImageProps {
  currency: string;
}

export interface IBalance {
  balance: number;
  currency: string;
}

export interface IBridgeFee {
  className?: string;
  bridgeFee: number;
  loading: boolean;
  currency: string;
}

export interface IFeeConfirmation {
  className?: string;
  bridgeFee: number;
  confirmCode: number;
  currency: string;
  receiveAddress: string;
}

export interface IModal {
  modalIsOpen: boolean;
  onClose: () => void;
  children: React.ReactElement;
  className?: string;
}

export interface IButton {
  onClickHandler: () => void;
  disabled?: boolean;
  label: string;
  loading?: boolean;
}
