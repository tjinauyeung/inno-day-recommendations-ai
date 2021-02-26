import * as React from 'react';
import { Modal } from './Modal';
import { IProduct } from './types';

const addEvent = (eventType: string, eventDetails: any) =>
  // @ts-ignore

  window.dataLayer.push({
    event: 'custom-event',
    eventType,
    userInfo: {
      // @ts-ignore - defined in GTM
      visitorId: window.getCookie('user_id') || 'user_localhost'
    },
    eventDetail: {
      recommendationToken: "12",
    },
    ...eventDetails,
  });

const ProductDetailsContent: React.FC<{ product: IProduct }> = ({ product }) => {
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    console.log('Push "detail-page-view"')
    addEvent("detail-page-view",
      {
        productEventDetail: {
          productDetails: [{ id: product.id }],
        }
      });
  }, [product, setCount]);

  const addToCart = React.useCallback(() => {
    // @ts-ignore
    addEvent('add-to-cart', {
      productEventDetail: {
        productDetails: [{
          id: product.id,
          quantity: 1,
        }],
      }
    });
    setCount(c => c + 1)
  }, [product, setCount]);

  const purchaseComplete = React.useCallback(() => {
    addEvent("purchase-complete",
      {
        productEventDetail: {
          productDetails: [{
            id: product.id,
            quantity: count,
          }],
          purchaseTransaction: {
            revenue: product.product_metadata.exact_price.display_price * count,
            currencyCode: 'EUR'
          }
        }
      })
    setCount(0)
  }, [product, setCount, count]);

  return (
    <div className="m-4">
      <img
        src={product.product_metadata.images[0]}
        className="flex-1 h-48 m-auto"
      />
      {<p className="text-gray-500 text-xs m-2">{count} product(s)</p>}
      <div className="flex flex-col">
        <button type="button"
                className="m-2 focus:outline-none text-white text-xs py-2.5 px-5 rounded-md outline-none focus:outline-none bg-blue-500 hover:bg-blue-600 hover:shadow-lg"
                onClick={addToCart}>
          Add to cart
        </button>
        <button type="button"
                className="m-2 focus:outline-none text-white text-xs py-2.5 px-5 rounded-md outline-none focus:outline-none bg-green-500 hover:bg-green-600 hover:shadow-lg"
                onClick={purchaseComplete}>
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
      {product && <ProductDetailsContent product={product}/>}
    </Modal>
  )
};