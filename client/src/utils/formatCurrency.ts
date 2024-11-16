export const formatCurrency = (
  value: number,
  currency: string = "USD",
  locale: string = "id-ID"
): string => {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 20,
  }).format(value);
};
