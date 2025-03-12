import { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useAsyncList } from 'react-stately';

import { Product } from '@/services/products/hooks/types';

const useGetProducts = () => {
  const { ref, inView } = useInView({
    rootMargin: '300px',
  });

  const [offset, setOffset] = useState<number>(0);
  const [hasNoMoreResults, setHasNoMoreResults] = useState<boolean>(false);

  const baseUrl = import.meta.env.VITE_BASE_URL ?? '';

  const url = ({ offset, limit }: { offset?: number; limit?: number }) =>
    `${baseUrl}/products?offset=${offset || 0}&limit=${limit || 10}`;

  const list = useAsyncList<Product>({
    async load({ signal, cursor }) {
      const response = await fetch(
        cursor || `${baseUrl}/products?offset=0&limit=10`,
        {
          signal,
        },
      );
      const json = (await response.json()) as Product[];
      setOffset(offset + 10);
      setHasNoMoreResults(json.length === 0);

      return {
        items: json,
        cursor: url({ offset: offset + 10 }),
      };
    },
  });

  const listRef = useRef(list);

  // Add infinite scroll
  useEffect(() => {
    if (
      inView &&
      listRef.current.items.length &&
      !listRef.current.isLoading &&
      !hasNoMoreResults
    ) {
      list.loadMore();
    }
  }, [hasNoMoreResults, inView, list]);

  // Add list ref to prevent re-render
  useEffect(() => {
    listRef.current = list;
  }, [list]);

  return {
    products: list,
    ref,
    hasNoMoreResults,
  };
};

export default useGetProducts;
