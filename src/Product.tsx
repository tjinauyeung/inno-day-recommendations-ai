import * as React from 'react';
import { FC } from 'react';
import { IProduct } from './types';

const Button: FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ children, onClick }) => (
  <button
    className="rounded-full w-12 h-12 shadow mr-2 text-3xl focus:outline-none focus:ring"
    onClick={onClick}
  >
    {children}
  </button>
);

export const Product: FC<{ onProductView?: (product: IProduct) => void, product: IProduct }> = ({ product, onProductView }) => {
  const like = (product: IProduct) => () => {
    console.log("[event-emitted]: 'like-product'");
    console.log(JSON.stringify(product, null, 2));
    window.dataLayer.push({
      event: "like-product",
      automl: {
        eventType: "like-product",
        userInfo: {
          // In most cases, the user and visitor ID fields can be populated
          // from a client side JavaScript variable, for example a cookie.
          // If you set the user and/or visitor ID values from the server,
          // populate the `userId` and/or `visitorId` fields here.
        },
        eventDetail: {
          recommendationToken: "recommendation-token",
          // In most cases, the experiment ID field is populated from a
          // client side JavaScript variable as defined by the experiment
          // manager.
          // If you set the experiment ID value from the server,
          // populate the `experimentIds` field here.
        },
        productEventDetail: {
          productDetails: [data],
        },
      },
    });
  };

  const dislike = (product :IProduct) => () => {
    console.log("[event-emitted]: 'dislike-product'");
    console.log(JSON.stringify(product, null, 2));
    window.dataLayer.push({
      event: "dislike-product",
      automl: {
        eventType: "dislike-product",
        userInfo: {
          // In most cases, the user and visitor ID fields can be populated
          // from a client side JavaScript variable, for example a cookie.
          // If you set the user and/or visitor ID values from the server,
          // populate the `userId` and/or `visitorId` fields here.
        },
        eventDetail: {
          recommendationToken: "recommendation-token",
          // In most cases, the experiment ID field is populated from a
          // client side JavaScript variable as defined by the experiment
          // manager.
          // If you set the experiment ID value from the server,
          // populate the `experimentIds` field here.
        },
        productEventDetail: {
          productDetails: [data],
        },
      },
    });
  };
  return (
    <div className="shadow rounded-2xl p-6 bg-white opacity-90 flex flex-col">
      <h1 className="text-xl font-bold">{product.title}</h1>
      <img
        src={product.product_metadata.images[0]}
        className="flex-1 h-48 m-auto cursor-pointer"
        onClick={onProductView ? () => onProductView(product) : undefined}
      />
      <div className="flex justify-between items-end">
        <div>
          <Button onClick={like(product)}>😍</Button>
          <Button onClick={dislike(product)}>😢</Button>
        </div>
        <p className="text-xl font-bold font-mono text-right">
          {/* {formatPrice(product.price)} */}
          {product.product_metadata.exact_price.display_price}
        </p>
      </div>
    </div>
  );
};