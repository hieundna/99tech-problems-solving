interface WalletBalance {
  id: string;
  currency: string;
  amount: number;
  // Added blockchain type
  blockchain: string;
}

// Add props type
interface WalletProps {
  children?: React.ReactElement;
  className?: string;
}

// Adđe WaletRow props type
interface WalletRowType {
  className: string;
  key: string;
  amount: number;
  usdValue: number;
  formattedAmount: string;
}

export { WalletBalance, WalletProps, WalletRowType };
