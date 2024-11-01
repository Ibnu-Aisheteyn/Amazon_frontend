import css from "./Category.module.css";
import { Link } from "react-router-dom";
const CategoryCard = ({ data }) => {
  // Destructure data from props
  console.log(data);
  return (
    <div className={css.category}>
      <Link to={`/category/${data.title}`}>
        <span>
          <h2>{data.title}</h2> {/* Use curly braces to render the variable */}
        </span>
        <img src={data.imgLink} alt={data.name} />

        <p>Shop now</p>
      </Link>
    </div>
  );
};

export default CategoryCard;
