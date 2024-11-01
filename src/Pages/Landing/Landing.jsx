import CarouselEffect from "../../Components/Carousel/Carousel";
import Product from "../../Components/Products/Product";
import Category from "../../Components/Category/Category";
import Layout from "../../Components/Layout/Layout";

const Landing = () => {
  return (
    <Layout>
      <CarouselEffect />
      <Category />
      <Product />
    </Layout>
  );
};

export default Landing;
