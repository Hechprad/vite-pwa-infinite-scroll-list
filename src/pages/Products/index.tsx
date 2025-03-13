import { useInView } from 'react-intersection-observer';
import { FiChevronUp } from 'react-icons/fi';

import { Button } from '@/components/ui/button';
import useGetProducts from '@/hooks/products/useGetProducts';

import Filters from './Filters';
import List from './List';

export default function Products() {
  const { ref: filtersRef, inView: filtersInView } = useInView();

  const { handlePriceRange, handleSearch, hasNoMoreResults, products, ref } =
    useGetProducts();

  return (
    <div className='p-[24px]'>
      <h1 className='text-3xl font-bold text-dark dark:text-light text-center sm:text-start'>
        Products
      </h1>

      <Filters
        filtersRef={filtersRef}
        handlePriceRange={handlePriceRange}
        handleSearch={handleSearch}
      />

      <List
        hasNoMoreResults={hasNoMoreResults}
        lastItemRef={ref}
        products={products}
      />

      {!filtersInView ? (
        <Button
          className='fixed bottom-[20px] right-[20px] rounded-full w-[48px] h-[48px] z-50'
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          onTouchStart={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <FiChevronUp className='w-[24px] h-[24px]' />
        </Button>
      ) : null}

      {hasNoMoreResults ? (
        <p className='text-center mt-4'>No more products to load.</p>
      ) : null}
    </div>
  );
}
