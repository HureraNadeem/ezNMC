import Carousel from "react-bootstrap/Carousel";
import nmc1 from "../../Assets/nmc.jpg";
import nmc2 from "../../Assets/nmc2.jpg";
import nmc3 from "../../Assets/nmc3.jpg";
import styles from "./carousel.module.css";

function Carousels() {
  return (
    <Carousel interval={2000}>
      <Carousel.Item>
        <img
          className={`d-block w-100 ${styles.imagetest}`}
          src={nmc1}
          alt="First slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className={`d-block w-100 ${styles.imagetest}`}
          src={nmc2}
          alt="Second slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className={`d-block w-100 ${styles.imagetest}`}
          src={nmc3}
          alt="Third slide"
        />
      </Carousel.Item>
    </Carousel>
  );
}

export default Carousels;
