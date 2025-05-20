
// Price calculation functions

export const calculatePrice = (
  basePrice: number,
  glazingModifier: number,
  colorModifier: number,
  width: number,
  height: number
) => {
  // Calculate area in square meters
  const area = (width / 1000) * (height / 1000);
  // Base calculation
  let price = basePrice + glazingModifier + colorModifier;
  // Multiply by area (minimum 1 sqm)
  price = price * Math.max(1, area);
  // Round to nearest whole number
  return Math.round(price);
};
