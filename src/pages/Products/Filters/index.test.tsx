import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import Filters from '.';

describe('Filters Component', () => {
  const mockHandlePriceRange = vi.fn();
  const mockHandleSearch = vi.fn();
  const mockFiltersRef = { current: null };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders all filter buttons and search input', () => {
    render(
      <Filters
        // @ts-ignore
        filtersRef={mockFiltersRef}
        handlePriceRange={mockHandlePriceRange}
        handleSearch={mockHandleSearch}
      />,
    );

    expect(
      screen.getByPlaceholderText('Search products...'),
    ).toBeInTheDocument();
    expect(screen.getByText('Below $50')).toBeInTheDocument();
    expect(screen.getByText('$50 - $100')).toBeInTheDocument();
    expect(screen.getByText('Above $100')).toBeInTheDocument();
    expect(screen.getByText('Clear Filters')).toBeInTheDocument();
  });

  it('handles search input with debounce', async () => {
    render(
      <Filters
        // @ts-ignore
        filtersRef={mockFiltersRef}
        handlePriceRange={mockHandlePriceRange}
        handleSearch={mockHandleSearch}
      />,
    );

    const searchInput = screen.getByPlaceholderText('Search products...');
    fireEvent.change(searchInput, { target: { value: 'test' } });

    await waitFor(
      () => {
        expect(mockHandleSearch).toHaveBeenCalledWith('test');
      },
      { timeout: 400 },
    );
  });

  it('handles price range filters', () => {
    render(
      <Filters
        // @ts-ignore
        filtersRef={mockFiltersRef}
        handlePriceRange={mockHandlePriceRange}
        handleSearch={mockHandleSearch}
      />,
    );

    fireEvent.click(screen.getByText('Below $50'));
    expect(mockHandlePriceRange).toHaveBeenCalledWith(0.01, 50);

    fireEvent.click(screen.getByText('$50 - $100'));
    expect(mockHandlePriceRange).toHaveBeenCalledWith(50, 100);

    fireEvent.click(screen.getByText('Above $100'));
    expect(mockHandlePriceRange).toHaveBeenCalledWith(100, 999999999);
  });

  it('toggles active filter state when clicking the same button twice', () => {
    render(
      <Filters
        // @ts-ignore
        filtersRef={mockFiltersRef}
        handlePriceRange={mockHandlePriceRange}
        handleSearch={mockHandleSearch}
      />,
    );

    const belowFiftyButton = screen.getByText('Below $50');

    // First click
    fireEvent.click(belowFiftyButton);
    expect(mockHandlePriceRange).toHaveBeenCalledWith(0.01, 50);

    // Second click on same button
    fireEvent.click(belowFiftyButton);
    expect(mockHandlePriceRange).toHaveBeenCalledWith();
  });

  it('clears all filters when clicking Clear Filters button', () => {
    render(
      <Filters
        // @ts-ignore
        filtersRef={mockFiltersRef}
        handlePriceRange={mockHandlePriceRange}
        handleSearch={mockHandleSearch}
      />,
    );

    const searchInput = screen.getByPlaceholderText('Search products...');
    fireEvent.change(searchInput, { target: { value: 'test' } });

    const clearButton = screen.getByText('Clear Filters');
    fireEvent.click(clearButton);

    expect(searchInput).toHaveValue('');
    expect(mockHandleSearch).toHaveBeenCalledWith('');
    expect(mockHandlePriceRange).toHaveBeenCalledWith();
  });
});
