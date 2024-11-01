/* eslint-disable react/prop-types */
import { useContext } from "react";
import { Rating } from "@mui/material";
import css from "./Product.module.css";
import CurrencyFormat from "../CurrencyFormat/CurrencyFormat";
import { Link } from "react-router-dom";
import { DataContext } from "../DataProvider/DataProvider";
import { type } from "../../Utility/action.type";
const ProductCard = ({ product, flex, renderDesc, renderAdd }) => {
  let { image, title, id, rating, price, description } = product;

  const [state, dispatch] = useContext(DataContext);
  console.log(state);
  const addtoCart = () => {
    dispatch({
      type: type.ADD_TO_BASKET,
      item: {
        image,
        title,
        id,
        rating,
        price,
        description,
      },
    });
  };
  console.log(product);
  console.log(renderDesc, description);
  return (
    <div
      className={`${css.card__container} ${flex ? css.product__flexed : ""}`}
    >
      <Link to={`/products/${id}`}>
        <img src={image} alt="" />
      </Link>
      <div>
        <h3>{title}</h3>
        {renderDesc && <div className={css.renderDesc}>{description}</div>}
        <div className={css.rating}>
          {/* Rating  */}
          <Rating value={rating?.rate} precision={0.1} />
          {/* Rating Counter  */}
          <small>{rating?.count}</small>
        </div>
        <div>
          {/* price  */}
          <CurrencyFormat amount={price} />
        </div>
        {renderAdd && (
          <button className={css.button} onClick={addtoCart}>
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
