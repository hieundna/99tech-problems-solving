import { ICurrencyImageProps } from "../types/types";
import { CURRENCY_IMAGES } from "../constants/currency";

const CurrencyImage = ({ currency }: ICurrencyImageProps) => {
  return (
    <img
      width="24"
      height="24"
      src={`https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/${CURRENCY_IMAGES[currency] || currency}.svg`}
    />
  );
};

export default CurrencyImage;
