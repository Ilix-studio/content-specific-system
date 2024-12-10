// export default calculatePaymentAmount;
const getAmountForTimePeriod = (timePeriod) => {
  switch (timePeriod) {
    case 4:
      return 299;
    case 8:
      return 599;
    case 12:
      return 999;
    default:
      throw new Error("Invalid time period");
  }
};

const calculateTotalAmount = (timePeriod, nanoIdCount) => {
  const amountPerPeriod = getAmountForTimePeriod(timePeriod);
  return amountPerPeriod * nanoIdCount;
};

export default calculateTotalAmount;
