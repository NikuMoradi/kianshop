export function calcDiscount(price, salePrice) {
  const regular = parseFloat(price);
  const sale = parseFloat(salePrice);

  if (!sale || sale >= regular) return null;

  const discount = Math.round(((regular - sale) / regular) * 100);

  return {
    discount,
  };
}
