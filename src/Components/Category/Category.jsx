import { categoryInfos } from "./CategoryInfo";
import CategoryCard from "./CategoryCard";
import css from "./Category.module.css";
const Category = () => {
  return (
    <div className={css.category__container}>
      {categoryInfos.map((info) => {
        return <CategoryCard key={info.title} data={info} />; // Return the CategoryCard
      })}
    </div>
  );
};

export default Category;
