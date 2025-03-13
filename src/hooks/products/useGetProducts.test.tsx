import { act, renderHook } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';

import useGetProducts from './useGetProducts';

vi.mock('./helpers', async () => {
  const actual = await vi.importActual<typeof import('./helpers')>('./helpers');
  return {
    ...actual,
    buildUrl: vi.fn(({ offset, title, priceMin, priceMax }) => {
      let url = `https://api.example.com/products?offset=${offset}&limit=10`;
      if (title) url += `&title=${title}`;
      if (priceMin) url += `&price_min=${priceMin}`;
      if (priceMax) url += `&price_max=${priceMax}`;
      return new URL(url);
    }),
  };
});

global.fetch = vi.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve([{ id: 1, title: 'Produto Teste', price: 100 }]),
  }),
) as unknown as typeof fetch;

describe('useGetProducts', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should fetch initial products on mount', async () => {
    const { result } = renderHook(() => useGetProducts());

    await act(async () => {
      await result.current.products.reload();
    });

    expect(global.fetch).toHaveBeenCalled();
    expect(global.fetch).toHaveBeenCalledWith(
      new URL('https://api.example.com/products?offset=0&limit=10'),
      expect.any(Object),
    );

    expect(result.current.products.items).toHaveLength(1);
    expect(result.current.products.items[0].title).toBe('Produto Teste');
  });

  it('should update search query when handleSearch is called', async () => {
    const { result } = renderHook(() => useGetProducts());

    act(() => {
      result.current.handleSearch('Test');
    });

    await act(async () => {
      await result.current.products.reload();
    });

    expect(global.fetch).toHaveBeenCalledWith(
      new URL('https://api.example.com/products?offset=0&limit=10&title=Test'),
      expect.any(Object),
    );
  });

  it('should update price range when handlePriceRange is called', async () => {
    const { result } = renderHook(() => useGetProducts());

    act(() => {
      result.current.handlePriceRange(50, 150);
    });

    await act(async () => {
      await result.current.products.reload();
    });

    expect(global.fetch).toHaveBeenCalledWith(
      new URL(
        'https://api.example.com/products?offset=0&limit=10&price_min=50&price_max=150',
      ),
      expect.any(Object),
    );
  });

  it('should stop pagination when no more results', async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve([]), // Retorna um array vazio (sem mais produtos)
      }),
    ) as unknown as typeof fetch;

    const { result } = renderHook(() => useGetProducts());

    await act(async () => {
      await result.current.products.loadMore();
    });

    expect(result.current.hasNoMoreResults).toBe(true);
  });
});
