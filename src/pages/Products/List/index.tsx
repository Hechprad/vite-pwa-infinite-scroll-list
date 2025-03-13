import { Skeleton } from '@/components/ui/skeleton';

import type * as t from './types';

const imageFallback = 'https://placehold.co/300x200';

export default function List({
  hasNoMoreResults,
  lastItemRef,
  products,
}: t.ListProps) {
  return (
    <ul className='mt-[24px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[16px]'>
      {products.items?.map((product) => (
        <li
          key={product.id}
          className='border border-neutral-300 dark:border-neutral-500 rounded-lg p-[16px] shadow-sm'
        >
          <img
            src={product.images[0]}
            alt={product.title}
            className='w-full max-w-[300px] h-[200px] object-cover rounded'
            loading='lazy'
            sizes='300px'
            onError={(e) => (e.currentTarget.src = imageFallback)}
            onWaiting={(e) => (e.currentTarget.src = imageFallback)}
          />
          <h2 className='text-xl font-semibold mt-2'>{product.title}</h2>
          <p className='text-secondary-light dark:text-secondary-dark'>
            ${product.price}
          </p>
          <p className='mt-2 text-gray-500'>{product.description}</p>
        </li>
      ))}
      {/* Add a skeleton loader for the last item to trigger the infinite scroll */}
      {!products.isLoading && !hasNoMoreResults ? (
        <Skeleton ref={lastItemRef} data-testid='skeleton' />
      ) : null}

      {/* Skeleton row loader */}
      {products.isLoading ? (
        <>
          <Skeleton className='w-full min-h-[350px]' data-testid='skeleton' />
          <Skeleton className='w-full' data-testid='skeleton' />
          <Skeleton className='w-full' data-testid='skeleton' />
        </>
      ) : null}
    </ul>
  );
}
