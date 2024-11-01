/* eslint-disable react/jsx-key */
import React, { useContext } from "react";
import Layout from "../../Components/Layout/Layout";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import ProductCard from "../../Components/Products/ProductCard";
import CurrencyFormat from "../../Components/CurrencyFormat/CurrencyFormat";
import { Link } from "react-router-dom";
import css from "./Cart.module.css";
import { type } from "../../Utility/action.type";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
const Cart = () => {
  const [{ basket, user }, dispatch] = useContext(DataContext);
  const total = basket?.reduce((amount, item) => {
    return item?.price * item.amount + amount;
  }, 0);

  const increment = (item) => {
    dispatch({
      type: type.ADD_TO_BASKET,
      item,
    });
  };
  const decrement = (id) => {
    dispatch({
      type: type.REMOVE_FROM_BASKET,
      id, // Ensure id is correctly passed
    });
  };

  return (
    <Layout>
      <section className={css.container}>
        <div className={css.cart__container}>
          <h1>Shopping Cart</h1>
          <hr />
          {basket?.length == 0 ? (
            <p> Your Amazon Cart is empty </p>
          ) : (
            basket.map((item) => {
              return (
                <section className={css.cart__product}>
                  <ProductCard
                    product={item}
                    renderDesc={true}
                    flex={true}
                    key={item.id}
                    renderAdd={false}
                  />
                  <div className={css.button__container}>
                    <button className={css.btn} onClick={() => increment(item)}>
                      <IoIosArrowUp size={20} />
                    </button>
                    <span>{item.amount}</span>
                    <button
                      className={css.btn}
                      onClick={() => decrement(item.id)}
                    >
                      <IoIosArrowDown size={20} />
                    </button>
                  </div>
                </section>
              );
            })
          )}
        </div>
        {basket.length !== 0 && (
          <div className={css.subtotal}>
            <div>
              <p>Subtotal ({basket.length} items): </p>
              <CurrencyFormat amount={total} />
            </div>
            <span>
              <input type="checkbox" />
              <small>This Order Contains a Gift</small>
            </span>
            <Link to="/payments">Continue to Checkout</Link>
          </div>
        )}
      </section>
    </Layout>
  );
};

export default Cart;
