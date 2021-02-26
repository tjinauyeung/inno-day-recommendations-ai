import * as React from "react";
import { FC } from "react";
import products from "../products.json";
import { ProductDetails } from "./ProductDetails";
import { IProduct } from "./types";
import { Recommendations } from './Recommendations';
import { Product } from './Product';

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
              <Recommendations payload={{ userEvent: { eventType: "home-page-view" } }} dryRun/>
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


export default App;
