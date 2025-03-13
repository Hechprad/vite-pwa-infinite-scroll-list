import { render, screen, fireEvent } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import Products from '.';
import useGetProducts from '@/hooks/products/useGetProducts';

// Mock the custom hook
vi.mock('@/hooks/products/useGetProducts');
// Mock intersection observer
vi.mock('react-intersection-observer', () => ({
  useInView: () => ({ ref: vi.fn(), inView: true }),
}));

describe('Products Page', () => {
  const mockProducts = [
    { id: 1, title: 'Product 1', price: 100, thumbnail: 'image1.jpg' },
    { id: 2, title: 'Product 2', price: 200, thumbnail: 'image2.jpg' },
  ];

  beforeEach(() => {
    // Default mock implementation
    vi.mocked(useGetProducts).mockReturnValue({
      //@ts-ignore
      products: mockProducts,
      hasNoMoreResults: false,
      handlePriceRange: vi.fn(),
      handleSearch: vi.fn(),
      ref: vi.fn(),
    });
  });

  it('renders the Products heading', () => {
    render(<Products />);
    expect(screen.getByText('Products')).toBeInTheDocument();
  });

  it('renders the product list', () => {
    render(<Products />);
    expect(screen.getByRole('list')).toBeInTheDocument();
  });

  it('shows "no more products" message when hasNoMoreResults is true', () => {
    vi.mocked(useGetProducts).mockReturnValue({
      //@ts-ignore
      products: mockProducts,
      hasNoMoreResults: true,
      handlePriceRange: vi.fn(),
      handleSearch: vi.fn(),
      ref: vi.fn(),
    });

    render(<Products />);
    expect(screen.getByText('No more products to load.')).toBeInTheDocument();
  });

  it('shows scroll to top button when filters are not in view', () => {
    vi.mock('react-intersection-observer', () => ({
      useInView: () => ({ ref: vi.fn(), inView: false }),
    }));

    render(<Products />);
    const scrollButton = screen.getByTestId('scroll-to-top');
    expect(scrollButton).toBeInTheDocument();
  });

  it('scrolls to top when button is clicked', () => {
    vi.mock('react-intersection-observer', () => ({
      useInView: () => ({ ref: vi.fn(), inView: false }),
    }));

    // Mock window.scrollTo
    const scrollToMock = vi.fn();
    window.scrollTo = scrollToMock;

    render(<Products />);
    const scrollButton = screen.getByTestId('scroll-to-top');
    fireEvent.click(scrollButton);

    expect(scrollToMock).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });
  });

  it('renders Filters component with correct props', () => {
    const mockHandlePriceRange = vi.fn();
    const mockHandleSearch = vi.fn();

    vi.mocked(useGetProducts).mockReturnValue({
      //@ts-ignore
      products: mockProducts,
      hasNoMoreResults: false,
      handlePriceRange: mockHandlePriceRange,
      handleSearch: mockHandleSearch,
      ref: vi.fn(),
    });

    render(<Products />);
    // Verify Filters component is rendered
    expect(
      screen.getByPlaceholderText('Search products...'),
    ).toBeInTheDocument();
  });
});
