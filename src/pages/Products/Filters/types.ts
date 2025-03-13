export type FilterButtonsNames = 'below-50' | '50-100' | 'above-100';

export type FiltersProps = {
  filtersRef: (node?: Element | null) => void;
  handlePriceRange: (min?: number, max?: number) => void;
  handleSearch: (title: string | null) => void;
};

export type HandleButtonReturn = {
  onClick: () => void;
  variant: 'default' | 'secondary';
};
