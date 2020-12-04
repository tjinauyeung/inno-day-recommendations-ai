import * as React from "react";
import { FC } from "react";
import products from "../products.json";

interface IProduct {
  category: string[];
  color: string;
  id: number;
  image: string;
  name: string;
  price: string;
  sku: number;
}

const App = () => (
  <div className="p-24 min-h-screen bg-gray-900">
    {/* <section className="my-12">
      <Heading>Just for you</Heading>
      <Grid>
        {products.map((product) => (
          <Product key={product.sku} product={product} />
        ))}
      </Grid>
    </section> */}

    <section className="my-12">
      <Heading>Products</Heading>
      <Grid>
        {products.map((product) => (
          <Product key={product.sku} product={product} />
        ))}
      </Grid>
    </section>
  </div>
);

const Heading = ({ children }) => (
  <h1 className="text-4xl mb-4 font-bold text-white capitalize">{children}</h1>
);
const Grid = ({ children }) => (
  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
    {children}
  </div>
);

const Product: FC<{ product: IProduct }> = ({ product }) => (
  <div className="shadow rounded-lg p-6 bg-white">
    <h1 className="text-3xl font-bold">{product.name}</h1>
    <img src={product.image} />
    <div className="flex justify-between items-end mt-12">
      <div>
        <Button
          onClick={() =>
            window.dataLayer.push({
              event: "like-product",
            })
          }
        >
          👍
        </Button>
        <Button
          onClick={() =>
            window.dataLayer.push({
              event: "dislike-product",
            })
          }
        >
          👎
        </Button>
      </div>
      <p className="text-2xl font-bold text-green-700 font-mono text-right">
        {/* {formatPrice(product.price)} */}
        {product.price}
      </p>
    </div>
  </div>
);

const Button = ({ children, onClick }) => (
  <button
    className="rounded-full w-10 h-10 shadow mr-2 focus:ring focus:outline-none"
    onClick={onClick}
  >
    {children}
  </button>
);

const formatPrice = (price) => {
  const formatter = new Intl.NumberFormat("en", {
    style: "currency",
    currency: "EUR",
  });
  return formatter.format(price);
};

export default App;
