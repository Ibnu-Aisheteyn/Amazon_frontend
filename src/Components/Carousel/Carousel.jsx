import { Carousel } from "react-responsive-carousel";
import { img } from "./img/data";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import css from "./Carousel.module.css";
const CarouselEffect = () => {
  return (
    <div>
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        showThumbs={false}
        showIndicators={false}
        interval={2000}
      >
        {img.map((imageItem, index) => (
          <img key={index} src={imageItem} alt={`Image ${index + 1}`} />
        ))}
      </Carousel>
      <div className={css.hero__img}></div>
    </div>
  );
};

export default CarouselEffect;
