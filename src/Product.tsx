import * as React from 'react';
import { FC } from 'react';
import { IProduct } from './types';

export const Product: FC<{ onProductView?: (product: IProduct) => void, product: IProduct }> = ({ product, onProductView }) => {
  return (
    <div className="shadow rounded-2xl p-6 bg-white opacity-90 flex flex-col">
      <h1 className="text-xl font-bold">{product.title}</h1>
      <img
        src={product.product_metadata.images[0]}
        className="flex-1 h-48 m-auto cursor-pointer"
        onClick={onProductView ? () => onProductView(product) : undefined}
      />
      <div className="flex justify-between items-end">
        <p className="text-xl font-bold font-mono text-right">
          {/* {formatPrice(product.price)} */}
          {product.product_metadata.exact_price.display_price}
        </p>
      </div>
    </div>
  );
};