const getNumberOfDecimal = (number: number) => {
  if (!number) return 0;
  const num = parseFloat(number.toFixed(8));
  return num;
};

export { getNumberOfDecimal };
