import * as React from 'react';
import { Modal } from './Modal';
import { IProduct } from './types';

const addEvent = (product: IProduct, eventName: string) => {
  window.dataLayer.push({
    automl: {
      eventType: eventName,
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
        productDetails: [product],
      },
    },
  });
}

const ProductDetailsContent: React.FC<{ product: IProduct }> = ({ product }) => {
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    console.log('Push "detail-page-view"')
    addEvent(product, "detail-page-view");
  }, [product, setCount]);

  const addToCart = React.useCallback(() => {
    addEvent(product, "add-to-cart");
    setCount(c => c + 1)
  }, [product]);

  const purchaseComplete = React.useCallback(() => {
    addEvent(product, "purchase-complete");
    setCount(0)
  }, [product]);

  return (
    <div className="m-4">
      <img
        src={product.product_metadata.images[0]}
        className="flex-1 h-48 m-auto"
      />
      {<p className="text-gray-500 text-xs m-2">{count} product(s)</p>}
      <div className="flex flex-col">
        <button type="button" className="m-2 focus:outline-none text-white text-xs py-2.5 px-5 rounded-md outline-none focus:outline-none bg-blue-500 hover:bg-blue-600 hover:shadow-lg" onClick={addToCart}>
          Add to cart
          </button>
        <button type="button" className="m-2 focus:outline-none text-white text-xs py-2.5 px-5 rounded-md outline-none focus:outline-none bg-green-500 hover:bg-green-600 hover:shadow-lg" onClick={purchaseComplete}>
          Purchase
          </button>
      </div>
    </div>
  )
    ;
}



export const ProductDetails: React.FC<{ product?: IProduct, onClose: () => void }> = ({ product, onClose }) => {
  return (
    <Modal
      show={!!product}
      title={product?.title}
      onClose={onClose}
    >
      {product && <ProductDetailsContent product={product} />}
    </Modal>
  )
};