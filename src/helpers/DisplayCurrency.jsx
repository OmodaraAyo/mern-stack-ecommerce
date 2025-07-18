//old
const displayUSDCurrency = (num) => {
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
    })

    return formatter.format(num);
}
export default displayUSDCurrency;

//new
// const DisplayUSDCurrency = (amount) => {
//   if (typeof amount !== "number") return "";
//   return amount.toLocaleString("en-US", {
//     style: "currency",
//     currency: "USD",
//   });
// };

// export default DisplayUSDCurrency
