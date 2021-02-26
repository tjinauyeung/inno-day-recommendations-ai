import * as React from "react";
import { FC } from "react";
import products from "../products.json";
import { ProductDetails } from "./ProductDetails";
import { IProduct } from "./types";

const CATEGORIES = [
  { label: "Shirt", value: "Shirt" },
  { label: "Pants", value: "Pant" },
  { label: "Shoes", value: "Shoe" },
];

const recommendations: IProduct[] = [];

const App = () => {
  const [category, setCategory] = React.useState("Shirt");
  const [viewProduct, setViewProduct] = React.useState<IProduct>();
  const resetViewProduct = React.useCallback(() => setViewProduct(null), [setViewProduct]);

  return (
    <div className="p-24 min-h-screen bg-gray-900">
      <div className="container mx-auto">
        <section className="my-12">
          <Heading>The Stinged</Heading>
          <section className="my-12">
            <Subheading active>Just for you</Subheading>
            <Grid emphasize>
              {recommendations.length > 0 ? (
                recommendations.map((product) => (
                  <Product key={product.id} product={product} onProductView={setViewProduct}/>
                ))
              ) : (
                  <h1 className="text-white text-lg py-2">
                    No recommendations yet
                  </h1>
                )}
            </Grid>
          </section>

          <ProductDetails product={viewProduct} onClose={resetViewProduct} />

          {CATEGORIES.map((c) => (
            <button
              key={c.value}
              className="text-white rounded mr-4 focus:outline-none"
              onClick={() => setCategory(c.value)}
            >
              <Subheading active={c.value === category}>{c.label}</Subheading>
            </button>
          ))}

          <Grid>
            {products
              .filter((p) =>
                p.category_hierarchies.categories.includes(category)
              )
              .map((p) => (
                <Product key={p.id} product={p} onProductView={setViewProduct} />
              ))}
          </Grid>
        </section>
      </div>
    </div>
  );
};

const Heading = ({ children }) => (
  <h1 className="text-6xl mb-4 text-white font-bold capitalize">{children}</h1>
);

const Subheading = ({ children, active }) => (
  <h2
    className="text-4xl mt-16 text-white mb-8 font-bold capitalize"
    style={{ opacity: active ? 1 : 0.5 }}
  >
    {children}
  </h2>
);

const Grid: FC<{ emphasize?: boolean }> = ({ children, emphasize }) => (
  <div
    className={
      emphasize
        ? `bg-gray-800 -mx-48 px-48 py-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4`
        : `grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4`
    }
  >
    {children}
  </div>
);

const Product: FC<{ onProductView: (product: IProduct) => void, product: IProduct }> = ({ product, onProductView }) => {
  const like = (data) => e => {
    console.log("[event-emitted]: 'like-product'");
    console.log(JSON.stringify(data, null, 2));
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

  const dislike = (data) => () => {
    console.log("[event-emitted]: 'dislike-product'");
    console.log(JSON.stringify(data, null, 2));
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
        onClick={() => onProductView(product)}
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

const Button = ({ children, onClick }) => (
  <button

    className="rounded-full w-12 h-12 shadow mr-2 text-3xl focus:outline-none focus:ring"
    onClick={onClick}
  >
    {children}
  </button>
);

export default App;
