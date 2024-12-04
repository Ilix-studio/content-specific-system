// Helper function to calculate the price
// const calculatePaymentAmount = (timePeriod, batchSize) => {
//   // Define price for each time period
//   const timePeriodPrices = {
//     3: 299, // 3 months
//     7: 599, // 7 months
//     12: 999, // 12 months
//   };

//   // Check if the timePeriod is valid
//   if (!timePeriodPrices[timePeriod]) {
//     throw new Error("Invalid time period selected");
//   }

//   // Calculate total payment for the batch
//   const pricePerUnit = timePeriodPrices[timePeriod];
//   return pricePerUnit * batchSize;
// };

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
