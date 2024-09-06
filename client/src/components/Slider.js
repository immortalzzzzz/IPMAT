import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Slider.css';

const Slider = ({ data }) => {
  return (
    <Carousel fade className="custom-carousel">
      {data.map((item, index) => (
        <Carousel.Item key={index}>
          <img 
            className="d-block w-100 carousel-image" 
            src={item} 
            alt={`Slide ${index}`}
          />
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default Slider;
