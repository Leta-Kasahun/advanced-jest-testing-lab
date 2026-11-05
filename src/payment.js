function round2(n) {
  return Math.round(n * 100) / 100;
}

export function processPayment(amount, method, isInternational) {
  if (typeof amount !== "number" || !isFinite(amount) || amount <= 0) {
    throw new TypeError("Amount must be a positive finite number");
  }
  if (typeof isInternational !== "boolean") {
    throw new TypeError("isInternational must be a boolean");
  }

  let fee = 0;

  if (method === "card") {
    fee = amount * 0.025;
  } else if (method === "bank") {
    fee = 10;
  } else {
    throw new Error("Unsupported payment method");
  }

  if (isInternational) fee += amount * 0.015;

  return round2(amount + fee);
}

