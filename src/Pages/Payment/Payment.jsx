import React, { useContext, useState } from "react";
import Layout from "../../Components/Layout/Layout";
import css from "./Payment.module.css";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import ProductCard from "../../Components/Products/ProductCard.jsx";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import CurrencyFormat from "../../Components/CurrencyFormat/CurrencyFormat.jsx";
import { axiosInstance } from "../../Api/axios";
import { ClipLoader } from "react-spinners";
import { db } from "../../Utility/firebase.jsx";
import { useNavigate } from "react-router-dom";
import { type } from "../../Utility/action.type.jsx";

const Payment = () => {
  const [{ basket, user }, dispatch] = useContext(DataContext);
  const totalItem = basket?.reduce((amount, item) => {
    return item.amount + amount;
  }, 0);

  const total = basket?.reduce((amount, item) => {
    return item.price * item.amount + amount;
  }, 0);

  const stripe = useStripe();
  const elements = useElements();
  const [cardError, setCardError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    console.log(e);
    e?.error?.message ? setCardError(e?.error?.message) : setCardError("");
  };
  const handlePayment = async (e) => {
    e.preventDefault();
    try {
      setProcessing(true);
      const response = await axiosInstance({
        method: "POST", // Fixed "method"
        url: `/payments/create?total=${total * 100}`,
        // Correctly use template literal
      });

      console.log(response.data);
      const clientSecret = response.data?.clientSecret;
      const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      await db
        .collection("users")
        .doc(user.uid)
        .collection("orders")
        .doc(paymentIntent.id)
        .set({
          basket: basket,
          amount: paymentIntent.amount,
          created: paymentIntent.created,
        });

      dispatch({
        type: type.EMPTY_BASKET,
      });

      navigate("/orders", { state: { msg: "You have placed new order " } });
      setProcessing(false);
    } catch (error) {
      console.error(error);
      setProcessing(false);
    }
  };

  return (
    <Layout>
      {/* Header  */}
      <div className={css.payment__header}>Checkout ({totalItem}) items</div>
      {/* payment method  */}
      <section className={css.Payment}>
        {/* address  */}
        <div className={css.flex}>
          <h3>Delivery Address </h3>
          <div>
            <div>{user?.email}</div>
            <div>123, React, Lane</div>
            <div>Chicago</div>
          </div>
        </div>
        <hr />
        {/* products  */}
        <div className={css.flex}>
          <h3>Review items and delivery </h3>
          <div>
            {basket?.map((item) => (
              <ProductCard product={item} key={item.id} flex={true} />
            ))}
          </div>
        </div>
        <hr />
        {/* card form  */}
        <div className={css.flex}>
          <h3>Payment Methods</h3>
          <div className={css.payment__card__container}>
            <div className={css.payment__details}>
              <form onSubmit={handlePayment}>
                {/* error  */}
                {cardError && (
                  <small style={{ color: "red" }}>{cardError}</small>
                )}
                {/* card element  */}
                <CardElement onChange={handleChange} />
                {/* price  */}
                <div className={css.payment__price}>
                  <div>
                    <span style={{ display: "flex", gap: "10px" }}>
                      <p> Total Order |</p> <CurrencyFormat amount={total} />
                    </span>
                  </div>
                  <button type="submit">
                    {processing ? (
                      <div className={css.loading}>
                        <ClipLoader color="gray" size={12} /> <p>Please Wait</p>
                      </div>
                    ) : (
                      "Pay Now"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Payment;
