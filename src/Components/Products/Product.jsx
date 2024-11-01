import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import css from "./Product.module.css";
import Loader from "../Loader/Loader";

const Product = () => {
  let [products, setProducts] = useState();
  let [isLoading, setIsLoading] = useState(true); // Start loading as true

  useEffect(() => {
    setIsLoading(true);
    axios
      .get("https://fakestoreapi.com/products")
      .then((res) => {
        setProducts(res.data);
        setIsLoading(false); // Set loading to false after data is fetched
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false); // Also set loading to false in case of an error
      });
  }, []);

  return isLoading ? (
    <Loader />
  ) : (
    <section className={css.products__container}>
      {products?.map((singleProduct) => {
        return (
          <ProductCard
            product={singleProduct}
            key={singleProduct.id}
            renderAdd={true}
          />
        );
      })}
    </section>
  );
};

export default Product;
