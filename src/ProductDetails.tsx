import * as React from 'react';
import { Modal } from './Modal';
import { IProduct } from './types';

const ProductDetailsContent: React.FC<{ product: IProduct }> = ({ product }) => {

  React.useEffect(() => {
    console.log('Push "detail-page-view"')
    window.dataLayer.push({
      event: "detail-page-view",
      automl: {
        eventType: "detail-page-view",
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
  }, []);

  return <img
    src={product.product_metadata.images[0]}
    className="flex-1 h-48 m-auto cursor-pointer"
  />;
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