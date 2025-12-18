export const payNow = (order, callback) => {
  const options = {
    key: "rzp_test_xxxxx",
    amount: order.amount,
    currency: "INR",
    handler: callback
  };
  new window.Razorpay(options).open();
};
