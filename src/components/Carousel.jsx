import Carousel from 'react-bootstrap/Carousel';
import Header from './Header';

function CarouselSection() {
  return (
    <>
    <Header />
    <Carousel className="mt5 carousel">
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/assets/img/carousel1.png"
          alt="First slide"
        />
        {/* <Carousel.Caption>
          <h5>First slide label</h5>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption> */}
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/assets/img/carousel1.png"
          alt="Second slide"
        />
        {/* <Carousel.Caption>
          <h5>Second slide label</h5>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption> */}
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/assets/img/carousel1.png"
          alt="Third slide"
          />
      </Carousel.Item>
    </Carousel>
    </>
  );
}

export default CarouselSection;