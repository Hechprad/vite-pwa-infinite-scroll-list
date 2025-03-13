import { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useAsyncList } from 'react-stately';

import * as h from './helpers';
import type * as t from './types';

const useGetProducts = () => {
  const defaultOffset = 10;
  const { ref, inView } = useInView({
    rootMargin: '300px',
  });

  const [offset, setOffset] = useState<number>(0);
  const [hasNoMoreResults, setHasNoMoreResults] = useState<boolean>(false);
  const [searchTitle, setSearchTitle] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState<{
    min?: number;
    max?: number;
  } | null>(null);

  const list = useAsyncList<t.Product>({
    async load({ signal, cursor }) {
      const response = await fetch(
        cursor ||
          h.buildUrl({
            offset,
            title: searchTitle ?? undefined,
            priceMin: priceRange?.min,
            priceMax: priceRange?.max,
          }),
        { signal },
      );
      const json = (await response.json()) as t.Product[];
      setOffset(offset + defaultOffset);
      setHasNoMoreResults(json.length < defaultOffset || json.length === 0);

      return {
        items: json,
        cursor: h
          .buildUrl({
            offset: offset + defaultOffset,
            title: searchTitle ?? undefined,
            priceMin: priceRange?.min,
            priceMax: priceRange?.max,
          })
          .toString(),
      };
    },
  });

  const handleSearch = (title: string | null) => {
    setSearchTitle(title);
    setOffset(0);
    setHasNoMoreResults(false);
  };

  const handlePriceRange = (min?: number, max?: number) => {
    setPriceRange({ min, max });
    setOffset(0);
    setHasNoMoreResults(false);
  };

  const listRef = useRef(list);

  // Reload list just when search or price range changes
  useEffect(() => {
    if (searchTitle !== null || priceRange !== null) {
      list.reload();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [priceRange, searchTitle]);

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
    handlePriceRange,
    handleSearch,
    hasNoMoreResults,
    products: list,
    ref,
  };
};

export default useGetProducts;
