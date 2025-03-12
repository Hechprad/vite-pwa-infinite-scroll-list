import { Skeleton } from '@/components/ui/skeleton';
import useGetProducts from '@/services/products/hooks/useGetProducts';

export default function Products() {
  const { hasNoMoreResults, products, ref } = useGetProducts();

  return (
    <div className='p-[24px]'>
      <h1 className='text-3xl font-bold text-dark dark:text-light'>Products</h1>

      <ul className='mt-[24px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[16px]'>
        {products.items?.map((product) => (
          <li
            key={product.id}
            className='border border-neutral-300 dark:border-neutral-500 rounded-lg p-[16px] shadow-sm'
          >
            <img
              src={product.images[0]}
              alt={product.title}
              className='w-full h-48 object-cover rounded'
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
          <Skeleton ref={ref} />
        ) : null}

        {/* Skeleton row loader */}
        {products.isLoading && products.items.length === 0 ? (
          <>
            <Skeleton className='w-full min-h-[350px]' />
            <Skeleton className='w-full min-h-[350px]' />
            <Skeleton className='w-full min-h-[350px]' />
          </>
        ) : null}
      </ul>
    </div>
  );
}
