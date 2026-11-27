import { Carousel } from 'react-bootstrap';
import sale from '../../assets/images/sale.png';

function DCarousel() {
  return (
    <Carousel id="promo" className="mb-5">
      <Carousel.Item>
        <img className="d-block w-100" src={sale} alt="First slide" />
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src={sale} alt="Second slide" />
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src={sale} alt="Third slide" />
      </Carousel.Item>
    </Carousel>
  );
}

export default DCarousel;