import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import List from './index';

const mockProducts = {
  items: [
    {
      id: 1,
      title: 'Test Product',
      price: 99.99,
      description: 'Test description',
      images: ['test-image.jpg'],
    },
    {
      id: 2,
      title: 'Another Product',
      price: 149.99,
      description: 'Another description',
      images: ['another-image.jpg'],
    },
  ],
  isLoading: false,
};

describe('List Component', () => {
  it('renders products correctly', () => {
    render(
      <List
        // @ts-ignore
        products={mockProducts}
        hasNoMoreResults={false}
        lastItemRef={vi.fn()}
      />,
    );

    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('$99.99')).toBeInTheDocument();
    expect(screen.getByText('Test description')).toBeInTheDocument();

    expect(screen.getByText('Another Product')).toBeInTheDocument();
    expect(screen.getByText('$149.99')).toBeInTheDocument();
    expect(screen.getByText('Another description')).toBeInTheDocument();
  });

  it('shows loading skeletons when isLoading is true', () => {
    render(
      <List
        // @ts-ignore
        products={{ ...mockProducts, isLoading: true }}
        hasNoMoreResults={false}
        lastItemRef={vi.fn()}
      />,
    );

    const skeletons = screen.getAllByTestId('skeleton');
    expect(skeletons).toHaveLength(3);
  });

  it('shows last item skeleton when more results are available', () => {
    render(
      <List
        // @ts-ignore
        products={mockProducts}
        hasNoMoreResults={false}
        lastItemRef={vi.fn()}
      />,
    );

    const lastSkeleton = screen.getByTestId('skeleton');
    expect(lastSkeleton).toBeInTheDocument();
  });

  it('does not show last item skeleton when no more results', () => {
    render(
      <List
        // @ts-ignore
        products={mockProducts}
        hasNoMoreResults={true}
        lastItemRef={vi.fn()}
      />,
    );

    const skeleton = screen.queryByTestId('skeleton');
    expect(skeleton).not.toBeInTheDocument();
  });

  it('handles image error correctly', () => {
    render(
      <List
        // @ts-ignore
        products={mockProducts}
        hasNoMoreResults={false}
        lastItemRef={vi.fn()}
      />,
    );

    const images = screen.getAllByRole('img');
    images.forEach((img) => {
      img.dispatchEvent(new Event('error'));

      // @ts-ignore
      expect(img.src).toBe('https://placehold.co/300x200');
    });
  });
});
