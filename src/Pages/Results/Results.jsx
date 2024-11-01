/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Layout from "../../Components/Layout/Layout";
import { useParams } from "react-router-dom";
import axios from "axios";
import { productUrl } from "../../Api/EndPoints";
import ProductCard from "../../Components/Products/ProductCard";
import Product from "../../Components/Products/Product";
import css from "./Results.module.css";
import Loader from "../../Components/Loader/Loader";
const Results = () => {
  let [isLoading, setIsLoading] = useState();
  let [results, setResults] = useState([]);
  let { categoryName } = useParams();
  console.log(categoryName);
  useEffect(() => {
    setIsLoading(true);
    const lowercaseCategory = categoryName.toLowerCase();
    axios
      .get(`${productUrl}/products/category/${lowercaseCategory}`)
      .then((res) => {
        setResults(res.data);
        console.log(res);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, [categoryName]);
  return (
    <Layout>
      {isLoading ? (
        <Loader />
      ) : (
        <section>
          <h1 style={{ padding: "30px" }}>Results</h1>
          <p style={{ padding: "30px" }}>Category/ {categoryName}</p>
          <hr />
          <div className={css.products__container}>
            {results?.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                renderAdd={true}
              />
            ))}
          </div>
        </section>
      )}
    </Layout>
  );
};

export default Results;
