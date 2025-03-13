import { AsyncListData } from 'react-stately';

import { Product } from '@/hooks/products/types';

export type ListProps = {
  hasNoMoreResults: boolean;
  lastItemRef: (node?: Element | null) => void;
  products: AsyncListData<Product>;
};
