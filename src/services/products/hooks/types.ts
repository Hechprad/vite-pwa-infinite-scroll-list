import { AsyncListData } from 'react-stately';

type Category = {
  id: number;
  name: Name;
  slug: Name;
  image: string;
  creationAt: Date;
  updatedAt: Date;
};

enum Name {
  Blusa = 'blusa',
  Ceramica = 'ceramica',
}

export type Product = {
  id: number;
  title: string;
  slug: string;
  price: number;
  description: string;
  category: Category;
  images: string[];
  creationAt: Date;
  updatedAt: Date;
};

export type useGetProducts = {
  products: AsyncListData<Product>;
  ref: (node?: Element | null) => void;
  hasNoMoreResults: boolean;
};
