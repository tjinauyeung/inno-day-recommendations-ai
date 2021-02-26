export interface IProduct {
  id: string;
  title: string;
  category_hierarchies: {
    categories: string[];
  };
  product_metadata: {
    exact_price: {
      display_price: number;
    };
    images: string[];
  };
}