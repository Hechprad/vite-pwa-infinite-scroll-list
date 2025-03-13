import { BuildUrlParams } from './types';

export const buildUrl = ({
  offset,
  limit,
  title,
  priceMin,
  priceMax,
}: BuildUrlParams) => {
  const baseUrl = import.meta.env.VITE_BASE_URL ?? '';

  const params = new URLSearchParams({
    ...(title ? { title: title } : {}),
    ...(priceMin !== undefined ? { price_min: priceMin.toString() } : {}),
    ...(priceMax !== undefined ? { price_max: priceMax.toString() } : {}),
    limit: limit?.toString() || '10',
    offset: offset?.toString() || '0',
  });

  const url = new URL(baseUrl + '/products/');
  url.search = params.toString();

  return url;
};
