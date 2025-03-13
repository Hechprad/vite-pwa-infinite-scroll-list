import { useEffect, useMemo, useState } from 'react';
import { debounce } from 'lodash';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import type * as t from './types';

export default function Filters({
  filtersRef,
  handlePriceRange,
  handleSearch,
}: t.FiltersProps) {
  const [inputValue, setInputValue] = useState<string>('');
  const [activeFilter, setActiveFilter] = useState<t.FilterButtonsNames | null>(
    null,
  );

  const handleButtonProps = (
    buttonName: t.FilterButtonsNames,
  ): t.HandleButtonReturn => {
    const handlePrice: Record<t.FilterButtonsNames, () => void> = {
      'below-50': () => handlePriceRange(0.01, 50),
      '50-100': () => handlePriceRange(50, 100),
      'above-100': () => handlePriceRange(100, 999999999),
    };

    return {
      onClick: () => {
        if (activeFilter === buttonName) {
          handlePriceRange();
          setActiveFilter(null);
        } else {
          handlePrice[buttonName]();
          setActiveFilter(buttonName);
        }
      },
      variant: activeFilter === buttonName ? 'secondary' : 'default',
    };
  };

  // useMemo to avoid re-render and trigger debounce
  const debouncedSearch = useMemo(
    () =>
      debounce((searchTerm: string | null) => {
        if (!searchTerm || searchTerm.length >= 3) {
          handleSearch(searchTerm);
        }
      }, 300),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  return (
    <div ref={filtersRef} className='flex justify-start'>
      <div className='my-[16px] space-y-[16px] w-full sm:w-fit'>
        <Input
          type='text'
          placeholder='Search products...'
          onChange={(e) => {
            setInputValue(e.target.value);
            debouncedSearch(e.target.value || null);
          }}
          value={inputValue}
          className='max-w'
        />
        <div className='flex flex-col sm:flex-row gap-4'>
          <Button {...handleButtonProps('below-50')}>Below $50</Button>
          <Button {...handleButtonProps('50-100')}>$50 - $100</Button>
          <Button {...handleButtonProps('above-100')}>Above $100</Button>
          <Button
            onClick={() => {
              setInputValue('');
              handleSearch('');
              handlePriceRange();
              setActiveFilter(null);
            }}
            variant='destructive'
          >
            Clear Filters
          </Button>
        </div>
      </div>
    </div>
  );
}
