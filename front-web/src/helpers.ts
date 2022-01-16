import { SalesByPaymentMethod, SalesByStore } from './types';

export const buildSalesByStoreChart = (sales: SalesByStore[]) => {
  const labels = sales.map(({ storeName }) => storeName);
  const series = sales.map(({ sum }) => sum);

  return {
    labels,
    series
  };
};

export const buildSalesByPaymentChart = (sales: SalesByPaymentMethod[]) => {
  const labels = sales.map(({ description }) => description);
  const series = sales.map(({ sum }) => sum);

  return {
    labels,
    series
  };
};
